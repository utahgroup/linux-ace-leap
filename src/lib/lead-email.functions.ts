import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  nome: z.string().trim().min(1).max(200),
  whatsapp: z.string().trim().min(1).max(50),
  email: z.string().trim().email().max(200),
});

type SmtpConfig = {
  host: string;
  port: number;
  from: string;
  to: string;
  hasAuth: boolean;
};

function getSmtpConfig(): SmtpConfig {
  return {
    host: process.env.SMTP_HOST ?? "127.0.0.1",
    port: Number(process.env.SMTP_PORT ?? 587),
    from: process.env.SMTP_FROM ?? "contato@administradorlinux.com.br",
    to: process.env.LEAD_TO ?? "comercial@utah.com.br",
    hasAuth: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
  };
}

async function buildTransporter() {
  const nodemailer = (await import("nodemailer")).default;
  const cfg = getSmtpConfig();
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: false,
    requireTLS: false,
    ignoreTLS: true,
    tls: { rejectUnauthorized: false },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
    ...(user && pass ? { auth: { user, pass } } : {}),
  });
  return { transporter, cfg };
}

function serializeError(error: unknown) {
  if (error && typeof error === "object") {
    const e = error as Record<string, unknown>;
    return {
      message: e.message instanceof Function ? String(e.message) : String(e.message ?? error),
      code: e.code ? String(e.code) : undefined,
      command: e.command ? String(e.command) : undefined,
      response: e.response ? String(e.response) : undefined,
      responseCode: e.responseCode ? Number(e.responseCode) : undefined,
      errno: e.errno !== undefined ? String(e.errno) : undefined,
      syscall: e.syscall ? String(e.syscall) : undefined,
      address: e.address ? String(e.address) : undefined,
      port: e.port !== undefined ? Number(e.port) : undefined,
    };
  }
  return { message: String(error) };
}

export const sendLeadEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { transporter, cfg } = await buildTransporter();

    const subject = `Nova inscrição — Formação Linux (${data.nome})`;
    const text =
      `Nova lead da landing page — Formação Administrador Linux\n\n` +
      `Nome: ${data.nome}\n` +
      `WhatsApp: ${data.whatsapp}\n` +
      `E-mail: ${data.email}\n`;

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px">Nova inscrição — Formação Linux</h2>
        <p style="margin:0 0 16px">Nova lead recebida pela landing page.</p>
        <table cellpadding="6" style="border-collapse:collapse;font-size:14px">
          <tr><td><strong>Nome</strong></td><td>${escapeHtml(data.nome)}</td></tr>
          <tr><td><strong>WhatsApp</strong></td><td>${escapeHtml(data.whatsapp)}</td></tr>
          <tr><td><strong>E-mail</strong></td><td>${escapeHtml(data.email)}</td></tr>
        </table>
      </div>
    `;

    try {
      const info = await transporter.sendMail({
        from: cfg.from,
        to: cfg.to,
        replyTo: data.email,
        subject,
        text,
        html,
      });
      console.log(
        `[lead-email] OK host=${cfg.host}:${cfg.port} messageId=${info.messageId} accepted=${JSON.stringify(info.accepted)} rejected=${JSON.stringify(info.rejected)} response=${info.response}`,
      );
      return { ok: true as const, messageId: info.messageId, response: info.response };
    } catch (error) {
      const details = serializeError(error);
      console.error(
        `[lead-email] FAIL host=${cfg.host}:${cfg.port} from=${cfg.from} to=${cfg.to}`,
        details,
      );
      return { ok: false as const, error: details.message, details, config: cfg };
    }
  });

/**
 * Diagnóstico do SMTP local:
 * 1) verify() — testa conexão + handshake
 * 2) sendMail — envia mensagem de teste real
 * Retorna JSON com config, verify e resultado do envio.
 */
export const testSmtp = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const schema = z.object({ to: z.string().email().optional() }).default({});
    return schema.parse(input ?? {});
  })
  .handler(async ({ data }) => {
    const started = Date.now();
    const { transporter, cfg } = await buildTransporter();
    const target = data.to ?? cfg.to;

    console.log(
      `[smtp-test] iniciando host=${cfg.host}:${cfg.port} from=${cfg.from} to=${target} auth=${cfg.hasAuth}`,
    );

    let verifyOk = false;
    let verifyError: ReturnType<typeof serializeError> | null = null;
    try {
      await transporter.verify();
      verifyOk = true;
      console.log(`[smtp-test] verify OK`);
    } catch (error) {
      verifyError = serializeError(error);
      console.error(`[smtp-test] verify FAIL`, verifyError);
    }

    let sendOk = false;
    let sendError: ReturnType<typeof serializeError> | null = null;
    let messageId: string | undefined;
    let response: string | undefined;

    if (verifyOk) {
      try {
        const info = await transporter.sendMail({
          from: cfg.from,
          to: target,
          subject: `[TESTE SMTP] ${new Date().toISOString()}`,
          text:
            `Mensagem de teste do relay Postfix local.\n\n` +
            `Host: ${cfg.host}:${cfg.port}\nFrom: ${cfg.from}\nTo: ${target}\n`,
        });
        sendOk = true;
        messageId = info.messageId;
        response = info.response;
        console.log(
          `[smtp-test] send OK messageId=${info.messageId} accepted=${JSON.stringify(info.accepted)} response=${info.response}`,
        );
      } catch (error) {
        sendError = serializeError(error);
        console.error(`[smtp-test] send FAIL`, sendError);
      }
    }

    return {
      ok: verifyOk && sendOk,
      elapsedMs: Date.now() - started,
      config: cfg,
      verify: { ok: verifyOk, error: verifyError },
      send: { ok: sendOk, messageId, response, error: sendError, to: target },
    };
  });

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

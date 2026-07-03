import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  nome: z.string().trim().min(1).max(200),
  whatsapp: z.string().trim().min(1).max(50),
  email: z.string().trim().email().max(200),
});

export const sendLeadEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    // Importado dentro do handler para não vazar Node built-ins pro bundle do cliente
    const nodemailer = (await import("nodemailer")).default;

    const host = process.env.SMTP_HOST ?? "127.0.0.1";
    const port = Number(process.env.SMTP_PORT ?? 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM ?? "contato@administradorlinux.com.br";
    const to = process.env.LEAD_TO ?? "comercial@utah.com.br";

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,           // STARTTLS na 587
      requireTLS: false,       // Postfix local geralmente sem TLS obrigatório
      ignoreTLS: true,         // Aceita relay em texto claro no 127.0.0.1
      tls: { rejectUnauthorized: false },
      ...(user && pass ? { auth: { user, pass } } : {}),
    });

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
      await transporter.sendMail({
        from,
        to,
        replyTo: data.email,
        subject,
        text,
        html,
      });
      return { ok: true as const };
    } catch (error) {
      console.error("[lead-email] SMTP send failed:", error);
      const message = error instanceof Error ? error.message : "SMTP error";
      return { ok: false as const, error: message };
    }
  });

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

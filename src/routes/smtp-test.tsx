import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { testSmtp } from "@/lib/lead-email.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/smtp-test")({
  head: () => ({
    meta: [
      { title: "Diagnóstico SMTP — Formação Linux" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: SmtpTestPage,
});

function SmtpTestPage() {
  const run = useServerFn(testSmtp);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [to, setTo] = useState("");

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-foreground">
      <h1 className="text-2xl font-bold mb-2">Diagnóstico SMTP local</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Executa <code>transporter.verify()</code> e envia um e-mail de teste pelo Postfix local
        (padrão <code>127.0.0.1:587</code>). Veja também os logs do servidor Node
        (prefixo <code>[smtp-test]</code> / <code>[lead-email]</code>).
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          placeholder="Destinatário opcional (default: LEAD_TO)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <Button
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            setResult(null);
            try {
              const res = await run({ data: to ? { to } : {} });
              setResult(res);
            } catch (err) {
              setResult({ thrown: String(err) });
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Testando..." : "Rodar teste"}
        </Button>
      </div>

      {result !== null && (
        <pre className="rounded-lg border border-border bg-surface p-4 text-xs overflow-auto whitespace-pre-wrap">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}

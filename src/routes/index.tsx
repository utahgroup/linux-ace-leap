import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Check,
  X,
  Clock,
  Award,
  Users,
  Video,
  MessageCircle,
  BookOpen,
  Briefcase,
  ShieldCheck,
  Zap,
  Target,
  TrendingUp,
  Rocket,
  ChevronDown,
  Play,
  Server,
  Terminal,
  Cloud,
  Lock,
  Network,
  GraduationCap,
  Download,
} from "lucide-react";
import logoUtah from "@/assets/logo-utah.png";
import badgeLpic from "@/assets/badge-lpic1.png";
import badgeRhcsa from "@/assets/badge-rhcsa.png";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Formação Administrador Linux — RHCSA + LPIC-1 | Grupo Utah" },
      {
        name: "description",
        content:
          "Formação inédita 100% EAD ao vivo que prepara você para as certificações RHCSA e LPIC-1 em uma única jornada. Turma 20/07/2026 — vagas limitadas.",
      },
      { property: "og:title", content: "Formação Administrador Linux — RHCSA + LPIC-1" },
      {
        property: "og:description",
        content:
          "2 certificações internacionais, 70h de curso, coaching e PNL. A maior carga horária do mercado.",
      },
    ],
  }),
  component: LandingPage,
});

const TARGET_DATE = new Date("2026-07-20T20:00:00-03:00");

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, TARGET_DATE.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-surface-2 border border-border px-4 py-3 min-w-[72px]">
      <span className="font-display text-3xl md:text-4xl font-bold text-primary tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mt-1">
        {label}
      </span>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-page">
        {eyebrow && (
          <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            {eyebrow}
          </div>
        )}
        {title && (
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05] max-w-4xl">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{subtitle}</p>
        )}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function LandingPage() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container-page flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-2">
            <img src={logoUtah} alt="Grupo Utah" className="h-9 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#curso" className="hover:text-foreground transition">O curso</a>
            <a href="#diferenciais" className="hover:text-foreground transition">Diferenciais</a>
            <a href="#ementa" className="hover:text-foreground transition">Ementa</a>
            <a href="#investimento" className="hover:text-foreground transition">Investimento</a>
            <a href="#faq" className="hover:text-foreground transition">FAQ</a>
          </nav>
          <a
            href="#inscricao"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-glow transition"
          >
            Quero minha vaga
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${heroBg})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" aria-hidden />
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />

        <div className="relative container-page pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse-red" />
                Turma inicia 20/07/2026 — vagas limitadas
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02]">
                Formação{" "}
                <span className="text-gradient-red">Administrador Linux</span>
                <br />
                <span className="text-foreground">RHCSA + LPIC-1</span>
                <br />
                <span className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-medium">
                  100% EAD AO VIVO
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
                A <strong className="text-foreground">única formação do Brasil</strong> que prepara
                você para <strong className="text-foreground">2 certificações internacionais</strong> em
                uma única jornada — com coaching e PNL para garantir que você não desista.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#inscricao"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-base font-bold text-primary-foreground hover:bg-primary-glow transition shadow-elegant"
                >
                  <Rocket className="w-5 h-5" />
                  Quero minha vaga
                </a>
                <a
                  href="#aula-teste"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-6 py-4 text-base font-semibold text-foreground hover:bg-surface-2 transition"
                >
                  <Play className="w-5 h-5" />
                  Assistir aula teste grátis
                </a>
              </div>

              {/* Selos institucionais */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { k: "25+", v: "anos de mercado" },
                  { k: "86.471", v: "alunos formados" },
                  { k: "Platinum", v: "Partner LPI" },
                  { k: "Cisco", v: "Networking Academy" },
                ].map((s) => (
                  <div key={s.v} className="rounded-lg border border-border bg-surface/60 px-3 py-3 text-center">
                    <div className="font-display text-lg font-bold text-primary">{s.k}</div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card lateral com badges + countdown */}
            <div className="relative">
              <div className="rounded-2xl border border-border bg-surface/80 backdrop-blur p-6 shadow-card">
                <div className="flex items-center justify-center gap-6 py-4">
                  <img src={badgeRhcsa} alt="RHCSA — Red Hat Certified" className="h-24 w-24 object-contain" width={512} height={512} />
                  <div className="text-primary text-3xl font-display font-bold">+</div>
                  <img src={badgeLpic} alt="LPIC-1 Linux Professional" className="h-24 w-24 object-contain" width={512} height={512} />
                </div>
                <div className="text-center mt-2">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Duas certificações. Uma única formação.
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-center text-sm text-muted-foreground mb-3">
                    Próxima turma inicia em:
                  </div>
                  <div className="flex justify-center gap-2">
                    <CountdownBox value={days} label="dias" />
                    <CountdownBox value={hours} label="horas" />
                    <CountdownBox value={minutes} label="min" />
                    <CountdownBox value={seconds} label="seg" />
                  </div>
                  <div className="mt-4 text-center text-xs text-primary font-semibold">
                    Apenas 12 vagas restantes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOR / IDENTIFICAÇÃO */}
      <Section
        eyebrow="Você se identifica?"
        title={<>Você se formou e ainda <span className="text-gradient-red">ganha mal?</span></>}
        subtitle="Se pelo menos um destes pontos te representa, esta formação foi construída para você:"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Você sabe um pouco de tudo e não é especialista em nada",
            "Já tentou aprender Linux sozinho por vídeos soltos e travou",
            "Está preso em um cargo júnior sem previsão de crescimento",
            "Vê vagas de Cloud, DevOps e Cyber Security exigindo Linux — e você não sabe",
            "Não confia em cursos online porque acha que não terá suporte",
            "Fez outros cursos e nunca conseguiu passar em uma certificação",
          ].map((p) => (
            <div key={p} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5">
              <div className="mt-0.5 flex-shrink-0 rounded-md bg-primary/15 p-1.5">
                <X className="w-4 h-4 text-primary" />
              </div>
              <p className="text-foreground">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PERGUNTA-GANCHO */}
      <section className="relative py-24 md:py-32 border-y border-border bg-surface/40">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div className="relative container-page text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-6">
            A pergunta que muda tudo
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] max-w-4xl mx-auto">
            Você quer ter um <span className="line-through text-muted-foreground">emprego</span>{" "}
            <br className="hidden md:block" />
            ou uma <span className="text-gradient-red">carreira?</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Cargos mudam. Empresas mudam. Mas competência técnica sólida em Linux é o alicerce que
            sustenta qualquer carreira em TI pelas próximas décadas.
          </p>
        </div>
      </section>

      {/* POR QUE LINUX */}
      <Section
        id="curso"
        eyebrow="Por que Linux e por que agora"
        title={<>Linux é a <span className="text-gradient-red">base</span> de tudo em TI.</>}
        subtitle="Cloud, DevOps, Cyber Security, Redes, Servidores. Dominar Linux deixou de ser opção — virou obrigação."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Cloud, title: "Cloud Computing", desc: "AWS, Azure, GCP — 90% dos servidores rodam Linux." },
            { icon: Lock, title: "Cyber Security", desc: "Ferramentas de defesa e ataque nasceram no Linux." },
            { icon: Server, title: "DevOps & SRE", desc: "Docker, Kubernetes, CI/CD — tudo baseado em Linux." },
            { icon: Network, title: "Redes & Servidores", desc: "Firewalls, roteadores, DNS, VPNs. Linux domina." },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-surface p-6 hover:border-primary/50 transition group">
              <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition">
                <c.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* O QUE VOCÊ VAI SER CAPAZ */}
      <Section
        eyebrow="Resultado prático"
        title="O que você vai ser capaz de fazer"
        subtitle="Ao final da formação você domina a stack completa de administração Linux em ambiente corporativo:"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            "Instalar e configurar servidores Linux do zero",
            "Dominar o Shell e comandos GNU em nível profissional",
            "Automatizar tarefas complexas com Shell Script",
            "Gerenciar pacotes em Debian e Red Hat (DNF, APT, RPM)",
            "Configurar redes, firewalls e serviços TCP/IP",
            "Administrar processos, serviços e daemons com systemd",
            "Trabalhar com contêineres Docker e virtualização",
            "Gerenciar permissões, usuários e grupos com segurança",
            "Manter servidores seguros com SSH, GPG e criptografia",
            "Trabalhar com LVM, partições e sistemas de arquivos",
            "Configurar NFS, NAS e armazenamento em rede",
            "Manter sistemas prontos para certificação internacional",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-lg bg-surface/60 border border-border p-4">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="/ementa-completa.pdf"
            download="Ementa_Completa_Administrador_Linux_RHCSA_LPIC1.pdf"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-base font-bold text-primary-foreground hover:bg-primary-glow transition shadow-elegant"
          >
            <Download className="w-5 h-5" />
            Veja a Ementa Completa
          </a>
        </div>
      </Section>

      {/* DIFERENCIAIS */}
      <Section
        id="diferenciais"
        eyebrow="Por que a Utah"
        title={<>14 razões pelas quais a Utah é <span className="text-gradient-red">diferente</span></>}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Video, t: "100% EAD ao vivo", d: "Aulas ao vivo com interação real, não vídeos gravados sem alma." },
            { icon: Clock, t: "3 meses de reassistir", d: "Todas as aulas gravadas na central do aluno por 3 meses." },
            { icon: Target, t: "Simulados oficiais", d: "Simulados baseados nas provas reais RHCSA e LPI." },
            { icon: Award, t: "Desconto na certificação", d: "Desconto exclusivo e parcelamento nas taxas de prova." },
            { icon: BookOpen, t: "Material impresso", d: "Apostila didática impressa entregue no seu endereço." },
            { icon: TrendingUp, t: "Coaching & PNL", d: "Técnicas de desenvolvimento comportamental para você não desistir." },
            { icon: MessageCircle, t: "Grupos WhatsApp/Telegram", d: "Suporte contínuo em grupos exclusivos com instrutores." },
            { icon: Briefcase, t: "Encaminhamento profissional", d: "Encaminhamento para empresas parceiras que contratam alunos." },
            { icon: GraduationCap, t: "Certificado Utah", d: "Certificação Utah 25 anos, reconhecida pelo mercado brasileiro." },
            { icon: Users, t: "Reposição de aulas", d: "Perdeu uma aula? Faça reposição sem burocracia." },
            { icon: ShieldCheck, t: "Pioneiros em Linux", d: "Eleita a melhor escola de Linux do Brasil." },
            { icon: Zap, t: "Metodologia DILDIP", d: "Modelo 70/20/10 — prática, mentoria e teoria integradas." },
          ].map((f) => (
            <div key={f.t} className="rounded-xl border border-border bg-surface p-5 hover:border-primary/50 transition">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-base mb-1">{f.t}</h3>
              <p className="text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* MÉTODO #5D */}
      <Section
        eyebrow="Método #5D"
        title={<>O método que leva você a <span className="text-gradient-red">R$10K+/mês</span> em até 3 anos</>}
        subtitle="Um passo a passo estruturado. Combinado com dedicação, é o que separa quem tem emprego de quem constrói carreira."
      >
        <div className="grid md:grid-cols-5 gap-4 relative">
          {[
            { n: "1", t: "Descobrir", d: "Entender seu ponto atual e onde quer chegar." },
            { n: "2", t: "Direcionar", d: "Plano de carreira personalizado dentro de Linux." },
            { n: "3", t: "Desenvolver", d: "70h de conteúdo técnico + prática guiada em laboratório." },
            { n: "4", t: "Demonstrar", d: "Simulados, certificações e portfólio prático." },
            { n: "5", t: "Decolar", d: "Encaminhamento, mentoria e networking com o mercado." },
          ].map((s) => (
            <div key={s.n} className="rounded-xl border border-border bg-surface p-6 relative">
              <div className="font-display text-5xl font-bold text-gradient-red leading-none">{s.n}D</div>
              <h3 className="font-display text-xl font-semibold mt-3">{s.t}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground italic">
          * Resultados variam conforme dedicação, background e mercado individual. Não garantimos remuneração específica.
        </p>
      </Section>

      {/* CARGA HORÁRIA + EMENTA */}
      <Section
        id="ementa"
        eyebrow="Conteúdo programático"
        title={<>70 horas — a <span className="text-gradient-red">maior carga horária</span> do mercado</>}
        subtitle="Enquanto concorrentes entregam 30-40h fragmentadas, você recebe 70h de imersão real cobrindo LPIC-101, LPIC-102, RH-124 e RH-134."
      >
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          {[
            { l: "Carga horária total", v: "70h" },
            { l: "Certificações", v: "2" },
            { l: "Provas cobertas", v: "4" },
            { l: "Modalidade", v: "EAD ao vivo" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-surface p-5 text-center">
              <div className="font-display text-3xl font-bold text-primary">{s.v}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        <Accordion type="single" collapsible className="rounded-xl border border-border bg-surface">
          {[
            {
              id: "lpic101",
              title: "LPIC-101 — Fundamentos e Sistema",
              items: [
                "101.1 — Determinar e Configurar Hardware (sysfs, udev, dbus, lsusb, lspci)",
                "101.2 — Inicialização do Sistema (BIOS/UEFI, SysVinit, systemd)",
                "101.3 — Níveis de execução, targets, shutdown e reboot",
                "102.1 — Layout de partições, LVM, swap",
                "102.2 — Gerenciador de Boot (GRUB Legacy e GRUB 2)",
                "102.3 — Bibliotecas compartilhadas e Docker (arquitetura, imagens, registry)",
                "103.x — Trabalhando com linha de comando, filtros, redirecionamento, vi",
              ],
            },
            {
              id: "lpic102",
              title: "LPIC-102 — Administração e Rede",
              items: [
                "104.x — Sistemas de arquivos, permissões, links, FHS",
                "105.x — Shell scripting: loops, testes, substituição, correspondência condicional",
                "107.x — Localização, i18n, fuso horário e ambientes desktop",
                "108.x — NTP, chrony, logs, MTA e envio de e-mail via CLI",
                "109.x — TCP/IP, UDP, ICMP, IPv4/IPv6, NetworkManager, systemd-networkd",
                "110.x — Segurança: SSH, GPG, túneis, chaves de host, revogação",
              ],
            },
            {
              id: "rh124",
              title: "RH-124 — Red Hat System Administration I",
              items: [
                "Acesso à linha de comando e ambiente Bash",
                "Gerenciamento de arquivos, criação, visualização e edição de texto",
                "Ajuda no RHEL: man pages, info, documentação oficial",
                "Redirecionamento, pipes, filtros de texto",
                "Estados e ciclo de vida de processos, controle de tarefas, monitoramento",
                "Controle de serviços e daemons com systemctl",
                "Instalação/atualização de pacotes com DNF, habilitação de repositórios",
                "Acesso a sistemas de arquivos, montagens, dispositivos",
              ],
            },
            {
              id: "rh134",
              title: "RH-134 — Red Hat System Administration II",
              items: [
                "Preservação do journal do sistema e manutenção de tempo (chrony)",
                "Arquivamento e transferência de arquivos (tar, rsync, scp)",
                "Gerenciamento avançado de armazenamento em camadas, LVM avançado",
                "Acesso a armazenamento NAS com NFS e montagem automática",
                "Gerenciamento de contêineres, armazenamento e rede de contêineres",
                "Contêineres como serviços do sistema (systemd + Podman)",
                "Revisão abrangente para certificação prática RHCSA",
              ],
            },
          ].map((mod) => (
            <AccordionItem key={mod.id} value={mod.id} className="border-border">
              <AccordionTrigger className="px-6 py-5 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <Terminal className="w-5 h-5 text-primary" />
                  <span className="font-display text-lg font-semibold">{mod.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <ul className="space-y-2">
                  {mod.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* PROVA SOCIAL */}
      <Section
        eyebrow="Prova social"
        title={<>+86.471 alunos <span className="text-gradient-red">transformados</span></>}
        subtitle="Não somos os únicos que dizem que a Utah funciona. Nossos alunos dizem."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              n: "Rafael M.",
              r: "Analista → SysAdmin Sr.",
              t: "R$ 4.200 → R$ 11.500/mês",
              q: "Passei na LPIC-1 na primeira tentativa. O suporte no WhatsApp foi decisivo — todo dia eu tirava dúvida com o próprio instrutor.",
            },
            {
              n: "Bianca S.",
              r: "Migrou para Cyber Security",
              t: "R$ 5.800 → R$ 14.000/mês",
              q: "Sem Linux eu não conseguiria migrar. A metodologia com coaching me ajudou a não travar quando as coisas apertaram.",
            },
            {
              n: "Diego L.",
              r: "Estagiário → DevOps Pleno",
              t: "R$ 2.100 → R$ 9.800/mês",
              q: "As 70h fazem diferença. Fiz outro curso antes com 30h e não aprendi metade. Aqui saí pronto para trabalhar de verdade.",
            },
          ].map((t) => (
            <div key={t.n} className="rounded-xl border border-border bg-surface p-6 flex flex-col">
              <p className="text-foreground italic leading-relaxed">"{t.q}"</p>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="font-semibold">{t.n}</div>
                <div className="text-sm text-muted-foreground">{t.r}</div>
                <div className="mt-2 inline-block text-xs font-semibold text-primary bg-primary/10 border border-primary/30 rounded-md px-2 py-1">
                  {t.t}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SOBRE A UTAH */}
      <section className="py-20 md:py-28 bg-surface/40 border-y border-border">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Sobre a Utah
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05]">
              25 anos formando os melhores profissionais Linux do Brasil.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Pioneira em treinamentos e consultoria com Software Livre no país, o Grupo Utah é
              parceiro Platinum da LPI (o nível máximo de reconhecimento) e Cisco Networking Academy.
              Eleita a melhor escola de Linux do Brasil, formamos profissionais que ocupam posições
              de liderança em empresas de todos os portes.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div>
                <div className="font-display text-4xl font-bold text-primary">25+</div>
                <div className="text-xs uppercase text-muted-foreground">Anos</div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-primary">86K+</div>
                <div className="text-xs uppercase text-muted-foreground">Alunos</div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-primary">#1</div>
                <div className="text-xs uppercase text-muted-foreground">em Linux BR</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-10 flex items-center justify-center">
            <img src={logoUtah} alt="Grupo Utah" className="max-h-64 w-auto" />
          </div>
        </div>
      </section>

      {/* INVESTIMENTO */}
      <Section
        id="investimento"
        eyebrow="Investimento"
        title={<>O que custa <span className="text-gradient-red">não fazer</span> essa formação?</>}
        subtitle="Um SysAdmin Junior ganha em média R$ 4.000/mês. Um SysAdmin Senior com RHCSA + LPIC-1 ganha R$ 12.000+/mês. A diferença anual paga a formação mais de 10x."
      >
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border bg-surface p-8 relative">
            <div className="text-sm text-muted-foreground uppercase tracking-widest">Fazer sozinho</div>
            <div className="mt-3 font-display text-3xl font-bold text-muted-foreground line-through">
              R$ 0
            </div>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {[
                "Meses (ou anos) perdidos",
                "Sem suporte quando travar",
                "Sem certificação reconhecida",
                "Alto risco de desistência",
              ].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <X className="w-4 h-4 text-destructive" />
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-primary bg-gradient-to-br from-surface to-surface-2 p-8 relative shadow-elegant">
            <div className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Recomendado
            </div>
            <div className="text-sm text-primary uppercase tracking-widest font-semibold">
              Formação Completa Utah
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-sm text-muted-foreground">12x de</span>
              <span className="font-display text-5xl font-bold text-foreground">R$ 249,90</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              ou R$ 2.490,00 à vista
            </div>
            <ul className="mt-6 space-y-2 text-sm">
              {[
                "70h ao vivo + 3 meses gravadas",
                "Material didático impresso",
                "Coaching, PNL e mentoria",
                "Simulados oficiais RHCSA + LPI",
                "Desconto na taxa de certificação",
                "Grupos exclusivos WhatsApp/Telegram",
                "Encaminhamento para empresas parceiras",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {i}
                </li>
              ))}
            </ul>
            <a
              href="#inscricao"
              className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-4 text-base font-bold text-primary-foreground hover:bg-primary-glow transition"
            >
              Garantir minha vaga
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Bônus por inscrição antecipada até 15/07
            </p>
          </div>
        </div>
      </Section>

      {/* GARANTIA */}
      <section className="py-16 border-y border-border bg-surface/40">
        <div className="container-page grid md:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, t: "Reposição de aula", d: "Perdeu por qualquer motivo? Reponha sem burocracia." },
            { icon: MessageCircle, t: "Suporte WhatsApp/Telegram", d: "Grupos exclusivos com instrutores respondendo dúvidas." },
            { icon: Video, t: "3 meses de gravações", d: "Reveja todas as aulas na central do aluno sem pressa." },
          ].map((g) => (
            <div key={g.t} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <g.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{g.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{g.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <Section id="faq" eyebrow="FAQ" title="Perguntas frequentes">
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {[
            {
              q: "Preciso de conhecimento prévio em Linux?",
              a: "Não. Começamos do zero. É desejável conhecimento básico em informática e noções de redes, mas todo o conteúdo é construído do fundamento até nível de certificação.",
            },
            {
              q: "E se eu faltar uma aula?",
              a: "Todas as aulas ficam gravadas na central do aluno por 3 meses. Além disso, oferecemos política de reposição de aula em turmas paralelas quando possível.",
            },
            {
              q: "A taxa da certificação está inclusa?",
              a: "A prova oficial da Red Hat e da LPI é paga diretamente ao órgão certificador. Como parceiro Platinum LPI, oferecemos desconto exclusivo e opções de parcelamento na taxa de prova.",
            },
            {
              q: "Funciona para quem não tem graduação?",
              a: "Sim. Certificações internacionais valem mais do que diploma no mercado de TI. Muitos alunos sem graduação hoje ocupam cargos sênior graças à certificação RHCSA + LPIC-1.",
            },
            {
              q: "Quero migrar para Cyber Security. Faz sentido?",
              a: "Total. Linux é a base absoluta de Cyber Security — todas as ferramentas ofensivas e defensivas rodam Linux. Esta formação é o primeiro passo obrigatório de qualquer trilha em segurança.",
            },
            {
              q: "Como funciona o EAD ao vivo?",
              a: "Aulas em tempo real via plataforma de vídeo, com interação direta com o instrutor. Você tira dúvidas ao vivo, participa dos laboratórios e faz parte de uma turma real — não é curso auto-instrucional.",
            },
            {
              q: "Consigo estudar trabalhando?",
              a: "Sim. As aulas ao vivo acontecem em horários compatíveis com trabalho. E se não puder assistir ao vivo, a gravação fica disponível por 3 meses.",
            },
          ].map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* CTA FINAL */}
      <section
        id="inscricao"
        className="relative py-24 md:py-32 overflow-hidden border-y border-primary/30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" aria-hidden />
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
        <div className="relative container-page text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/15 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-red" />
            Últimas vagas para a turma 20/07/2026
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] max-w-3xl mx-auto">
            Sua carreira em Linux começa <span className="text-gradient-red">agora.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Turma limitada. Instrutor dedicado. Certificações reais no seu nome. Você decide se
            começa hoje ou daqui a mais um ano.
          </p>

          <div className="mt-10 flex justify-center gap-2 flex-wrap">
            <CountdownBox value={days} label="dias" />
            <CountdownBox value={hours} label="horas" />
            <CountdownBox value={minutes} label="min" />
            <CountdownBox value={seconds} label="seg" />
          </div>

          <div className="mt-8 flex justify-center">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* AULA TESTE */}
      <section id="aula-teste" className="py-16 border-b border-border">
        <div className="container-page text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold">
            Ainda em dúvida? Assista uma aula teste gratuita.
          </h3>
          <p className="mt-3 text-muted-foreground">
            Fale com nosso time e agende uma aula demonstrativa sem compromisso.
          </p>
          <a
            href="https://wa.me/5511969311515?text=Quero%20agendar%20uma%20aula%20teste%20da%20forma%C3%A7%C3%A3o%20Linux"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-6 py-3 font-semibold text-primary hover:bg-primary/20 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Falar no WhatsApp: (11) 96931-1515
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-surface/40">
        <div className="container-page">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img src={logoUtah} alt="Grupo Utah" className="h-14 w-auto" />
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                25 anos formando os melhores profissionais Linux do Brasil.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contato</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>WhatsApp: (11) 96931-1515</li>
                <li>utah.com.br</li>
                <li>@grupoutah</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Certificações</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Parceiro Platinum LPI</li>
                <li>Cisco Networking Academy</li>
                <li>Red Hat Training</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Grupo Utah. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

function LeadForm() {
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          toast.success("Recebemos seus dados! Em breve entraremos em contato via WhatsApp.");
          (e.target as HTMLFormElement).reset();
        }, 800);
      }}
      className="w-full max-w-xl rounded-2xl border border-border bg-surface p-6 md:p-8 text-left shadow-card"
    >
      <div className="grid gap-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Nome completo
          </label>
          <Input required name="nome" placeholder="Seu nome" className="mt-1 bg-background" />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              WhatsApp
            </label>
            <Input required name="whatsapp" placeholder="(11) 90000-0000" className="mt-1 bg-background" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              E-mail
            </label>
            <Input required type="email" name="email" placeholder="voce@email.com" className="mt-1 bg-background" />
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="mt-2 h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary-glow"
        >
          {loading ? "Enviando..." : "Quero garantir minha vaga"}
        </Button>
        <p className="text-[11px] text-muted-foreground text-center">
          Ao enviar, você concorda em receber contato do time Utah via WhatsApp e e-mail.
        </p>
      </div>
    </form>
  );
}

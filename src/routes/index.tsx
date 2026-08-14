import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, Wifi, MessageCircle, Check, Sparkles } from "lucide-react";

import heroFlavia from "@/assets/hero-flavia.jpg";
import cookieOpen from "@/assets/cookie-open.jpg";
import logoMaskavo from "@/assets/logo-maskavo.svg";

const WEBHOOK_URL =
  "https://webhook-n8n.v4companyamaral.com/webhook/fc7781ec-0d4c-46e3-ba4c-3c0dfc2c0a96";

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const len = digits.length;
  if (len === 0) return "";
  if (len <= 2) return `(${digits}`;
  if (len <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (len <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aula Gratuita AO VIVO — Cookie NYC Lakaoreo com Flávia Maskavo" },
      {
        name: "description",
        content:
          "07/07 às 19h. Aprenda o Cookie NYC Lakaoreo ao vivo com Flávia Maskavo e ganhe uma oportunidade exclusiva. Vagas limitadas.",
      },
      { property: "og:title", content: "Aula Gratuita AO VIVO — Cookie NYC Lakaoreo" },
      {
        property: "og:description",
        content:
          "Comemore o Dia Mundial do Chocolate com uma aula gratuita ao vivo em 07/07 às 19h. Cadastre-se e entre no grupo exclusivo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [form, setForm] = useState({ nome: "", whatsapp: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.whatsapp.trim() || !form.email.trim()) return;
    const digits = form.whatsapp.replace(/\D/g, "");
    if (digits.length < 10) return;
    setSubmitting(true);
    try {
      (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("track", "Lead");
    } catch {
      /* noop */
    }
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome.trim(),
          whatsapp: form.whatsapp.trim(),
          whatsapp_digits: digits,
          email: form.email.trim(),
          origem: "landing-cookie-nyc",
          submitted_at: new Date().toISOString(),
        }),
      });
    } catch {
      /* segue fluxo mesmo se webhook falhar */
    }
    navigate({ to: "/obrigado" });
  };


  const scrollToForm = () => {
    document.getElementById("cadastro")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[color:var(--brown-deep)] text-foreground">

      {/* ===== Section 1 — Hero ===== */}
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-12 md:pt-12 md:pb-16 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="order-1 text-center lg:text-left">
            <img
              src={logoMaskavo}
              alt="Maskavo"
              className="mx-auto mb-6 h-9 w-auto md:h-11 lg:mx-0"
            />

            <span className="tag-chip">
              <Sparkles className="h-3.5 w-3.5" />
              AO VIVO • GRATUITO • VAGAS LIMITADAS
            </span>

            <h1 className="mt-6 text-3xl leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
              Comemore o{" "}
              <span className="italic text-white">Dia Mundial do Chocolate</span>{" "}
              aprendendo um{" "}
              <span className="font-bold text-[color:var(--yellow-junina)]">Cookie NYC Lakaoreo</span>
            </h1>

            <p className="mt-4 text-xl font-semibold text-white sm:text-2xl">
              AO VIVO com Flávia Maskavo.
            </p>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl lg:mx-0">
              No dia <strong className="text-white">07 de julho, às 19h</strong>, participe
              gratuitamente de uma aula especial e descubra uma surpresa exclusiva preparada para
              quem estiver ao vivo.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <button onClick={scrollToForm} className="btn-cta">
                Quero participar gratuitamente
              </button>
            </div>
          </div>

          <div className="order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[color:var(--yellow-junina)]/15 blur-2xl" />
              <div className="premium-card overflow-hidden rounded-[2.5rem]">
                <img
                  src={heroFlavia}
                  alt="Flávia Maskavo segurando o Cookie NYC Lakaoreo"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl md:mt-10">
          <div className="content-card-dark rounded-3xl px-6 py-6 md:px-10 md:py-8">
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
              {[
                { icon: Calendar, label: "07/07" },
                { icon: Clock, label: "19h" },
                { icon: Wifi, label: "Evento online e gratuito" },
                { icon: MessageCircle, label: "Acesso pelo grupo exclusivo de WhatsApp" },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center justify-center gap-3 text-center">
                  <span className="icon-circle flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium leading-snug text-white/85">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Section 2 — What you'll learn ===== */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div className="order-2 lg:order-1">
              <div className="premium-card overflow-hidden rounded-[2.5rem]">
                <img
                  src={cookieOpen}
                  alt="Cookie NYC Lakaoreo aberto ao meio com recheio cremoso"
                  width={1280}
                  height={1280}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--yellow-junina)]">
                Conteúdo da aula
              </p>
              <h2 className="mt-3 text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
                Em uma única aula você vai aprender:
              </h2>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {[
                  { emoji: "🍪", text: "Receita completa do Cookie NYC Lakaoreo" },
                  { emoji: "🍫", text: "Técnicas para textura, recheio e finalização" },
                  {
                    emoji: "🎂",
                    text: "Dicas práticas utilizadas pela Flávia para produzir cookies premium",
                  },
                  {
                    emoji: "🎁",
                    text: "Uma oportunidade especial revelada apenas para quem estiver ao vivo",
                  },
                ].map((c) => (
                  <div
                    key={c.text}
                    className="content-card-dark group flex flex-col gap-3 p-6 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="text-3xl">{c.emoji}</span>
                    <p className="text-base font-medium leading-snug text-white/90">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 3 — For whom ===== */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--yellow-junina)]">
                Feita para você
              </p>
              <h2 className="mt-3 text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
                Essa aula é para você que...
              </h2>

              <ul className="mt-10 space-y-4">
                {[
                  "Ama confeitaria",
                  "Quer aprender uma receita diferenciada",
                  "Busca novidades para vender",
                  "Já acompanha a Flávia ou deseja conhecer seu método",
                  "Não quer perder oportunidades exclusivas",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--yellow-junina)] text-[color:var(--brown-deep)]">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="text-lg text-white/85">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-3xl border border-[color:var(--yellow-junina)]/35 bg-[color:var(--yellow-junina)]/10 p-6 md:p-7">
                <p className="text-base font-medium text-white/90 md:text-lg">
                  <span className="text-2xl font-bold text-[color:var(--yellow-junina)]">+4 mil</span>{" "}
                  alunas já passaram pelos cursos da Flávia Maskavo.
                </p>
              </div>
            </div>

            <div>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[color:var(--yellow-junina)]/20 blur-2xl" />
                <div className="premium-card overflow-hidden rounded-[2.5rem]">
                  <img
                    src={heroFlavia}
                    alt="Flávia Maskavo ensinando confeitaria em cozinha moderna"
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 4 — Signup ===== */}
      <section id="cadastro" className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)] lg:grid lg:min-h-[480px] lg:grid-cols-2">
            
          <div className="order-1 flex flex-col justify-center bg-[color:var(--brown)] px-6 py-10 sm:px-8 lg:px-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--yellow-junina)] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--brown-deep)]">
                <Sparkles className="h-3.5 w-3.5" />
                Vagas limitadas
              </span>
              <h2 className="mt-6 text-3xl leading-tight text-white sm:text-4xl">
                Garanta sua vaga gratuitamente
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
                Preencha seus dados para receber todas as informações da aula e entrar no grupo
                exclusivo onde serão enviados os lembretes e o acesso da transmissão.
              </p>
            </div>
            
            <form
              onSubmit={onSubmit}
              className="order-2 flex h-full min-h-full flex-col justify-center bg-white p-6 sm:p-8 lg:p-10"
            >
              <div className="space-y-5">
                <Field
                  id="nome"
                  label="Nome"
                  value={form.nome}
                  onChange={(v) => setForm((f) => ({ ...f, nome: v }))}
                  placeholder="Seu nome completo"
                  autoComplete="name"
                  maxLength={100}
                />
                <Field
                  id="whatsapp"
                  label="WhatsApp"
                  value={form.whatsapp}
                  onChange={(v) => setForm((f) => ({ ...f, whatsapp: maskPhone(v) }))}
                  placeholder="(11) 99999-9999"
                  type="tel"
                  autoComplete="tel"
                  maxLength={20}
                />
                <Field
                  id="email"
                  label="E-mail"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="seu@email.com"
                  type="email"
                  autoComplete="email"
                  maxLength={200}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-cta mt-8 w-full text-lg disabled:opacity-70"
              >
                {submitting ? "Redirecionando..." : "Garantir minha vaga"}
              </button>

              <p className="mt-4 text-center text-xs text-[color:var(--on-card-muted)]">
                Ao se cadastrar você entrará no grupo exclusivo de WhatsApp da aula.
              </p>
            </form>

          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-sm text-white/50">
        <p>© {new Date().getFullYear()} Flávia Maskavo · Todos os direitos reservados</p>
      </footer>
    </main>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[color:var(--on-card)]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        className="w-full rounded-2xl border border-[color:var(--on-card-border)] bg-[#f7f3ee] px-5 py-4 text-base text-[color:var(--on-card)] outline-none transition focus:border-[color:var(--brown)] focus:bg-white focus:ring-4 focus:ring-[color:var(--brown)]/10"
      />
    </div>
  );
}

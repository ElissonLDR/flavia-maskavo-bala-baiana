import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, Sparkles } from "lucide-react";

import heroFlavia from "@/assets/hero-flavia.jpg";
import cookieOpen from "@/assets/cookie-open.jpg";
import logoMaskavo from "@/assets/logo-maskavo.svg";
import { siteConfig } from "@/lib/site-config";

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
      { title: siteConfig.seo.title },
      { name: "description", content: siteConfig.seo.description },
      { property: "og:title", content: siteConfig.seo.ogTitle },
      { property: "og:description", content: siteConfig.seo.ogDescription },
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
      await fetch(siteConfig.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome.trim(),
          whatsapp: form.whatsapp.trim(),
          whatsapp_digits: digits,
          email: form.email.trim(),
          origem: siteConfig.eventOrigin,
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
              alt={siteConfig.brandName}
              className="mx-auto mb-6 h-9 w-auto md:h-11 lg:mx-0"
            />

            <span className="tag-chip">
              <Sparkles className="h-3.5 w-3.5" />
              AULA GRATUITA E AO VIVO • 17 DE AGOSTO
            </span>

            <h1 className="mt-6 text-3xl leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
              Aprenda a fazer o{" "}
              <span className="font-bold text-[color:var(--yellow-junina)]">
                Cookie de Bala Baiana
              </span>{" "}
              com {siteConfig.hostName}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl lg:mx-0">
              Uma aula prática para você aprender uma combinação diferente e irresistível: cookie +
              o sabor clássico da bala baiana.
            </p>

            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl lg:mx-0">
              Participe gratuitamente e acompanhe todo o preparo ao vivo com a Flávia.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <button onClick={scrollToForm} className="btn-cta">
                Quero participar da aula gratuita
              </button>
            </div>

            <p className="mt-5 text-sm font-medium text-white/70 md:text-base">
              {siteConfig.eventDateShort} • {siteConfig.eventTimeShort} • Online e gratuito
            </p>
          </div>

          <div className="order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[color:var(--yellow-junina)]/15 blur-2xl" />
              <div className="premium-card overflow-hidden rounded-[2.5rem]">
                <img
                  src={heroFlavia}
                  alt={`${siteConfig.hostName} segurando o ${siteConfig.eventName}`}
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2 — O que você vai aprender ===== */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
            <div className="order-2 lg:order-1">
              <div className="premium-card overflow-hidden rounded-[2.5rem]">
                <img
                  src={cookieOpen}
                  alt={`${siteConfig.eventName} aberto ao meio`}
                  width={1280}
                  height={1280}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--yellow-junina)]">
                Aula prática
              </p>
              <h2 className="mt-3 text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
                Uma receita para sair do cookie de sempre
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-white/75">
                Flávia Maskavo vai preparar o Cookie de Bala Baiana e mostrar o passo a passo da
                receita, compartilhando os detalhes que fazem diferença no preparo e no resultado
                final.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-white/75">
                Uma oportunidade para acompanhar a receita sendo feita ao vivo, entender cada etapa
                e aprender uma nova opção para incluir no seu cardápio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 3 — Aula ao vivo ===== */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--yellow-junina)]">
                Anote na agenda
              </p>
              <h2 className="mt-3 text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
                Separe esse dia para aprender com a Flávia
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-white/75">
                A aula acontece no dia 17 de agosto, ao vivo e gratuitamente.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-white/75">
                E atenção: a aula não ficará gravada. Para acompanhar o preparo completo do Cookie
                de Bala Baiana, você precisa estar presente no dia da transmissão.
              </p>

              <div className="mt-10 rounded-3xl border border-[color:var(--yellow-junina)]/35 bg-[color:var(--yellow-junina)]/10 p-6 md:p-7">
                <div className="flex flex-wrap items-center gap-4 text-white">
                  <span className="flex items-center gap-2 text-lg font-bold uppercase tracking-wide text-[color:var(--yellow-junina)] md:text-xl">
                    <Calendar className="h-5 w-5" />
                    17 DE AGOSTO
                  </span>
                  <span className="hidden h-5 w-px bg-[color:var(--yellow-junina)]/40 sm:block" />
                  <span className="flex items-center gap-2 text-lg font-bold uppercase tracking-wide text-[color:var(--yellow-junina)] md:text-xl">
                    <Clock className="h-5 w-5" />
                    {siteConfig.eventTimeShort}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[color:var(--yellow-junina)]/20 blur-2xl" />
                <div className="premium-card overflow-hidden rounded-[2.5rem]">
                  <img
                    src={heroFlavia}
                    alt={`${siteConfig.hostName} ensinando confeitaria`}
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

      {/* ===== Section 4 — CTA + Formulário ===== */}
      <section id="cadastro" className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)] lg:grid lg:min-h-[480px] lg:grid-cols-2">
            <div className="order-1 flex flex-col justify-center bg-[color:var(--brown)] px-6 py-10 sm:px-8 lg:px-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--yellow-junina)] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--brown-deep)]">
                <Sparkles className="h-3.5 w-3.5" />
                Inscreva-se gratuitamente
              </span>
              <h2 className="mt-6 text-3xl leading-tight text-white sm:text-4xl">
                Garanta sua participação na aula
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
                Preencha seus dados para receber as informações de acesso e os avisos da
                transmissão.
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
                  placeholder="Digite seu nome"
                  autoComplete="name"
                  maxLength={100}
                />
                <Field
                  id="whatsapp"
                  label="WhatsApp"
                  value={form.whatsapp}
                  onChange={(v) => setForm((f) => ({ ...f, whatsapp: maskPhone(v) }))}
                  placeholder="Digite seu WhatsApp"
                  type="tel"
                  autoComplete="tel"
                  maxLength={20}
                />
                <Field
                  id="email"
                  label="E-mail"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="Digite seu melhor e-mail"
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
                {submitting ? "Redirecionando..." : "Quero garantir minha vaga gratuita"}
              </button>

              <p className="mt-4 text-center text-xs text-[color:var(--on-card-muted)]">
                Inscrição gratuita. A aula acontece ao vivo no dia 17 de agosto e não ficará
                gravada.
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-sm text-white/50">
        <p>
          © {new Date().getFullYear()} {siteConfig.hostName} · Todos os direitos reservados
        </p>
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

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, Sparkles, VideoOff } from "lucide-react";

import cookieBalaBaiana from "@/assets/imagem-1-1-bala-baiana.jpeg";
import cookieEstilizado from "@/assets/imagem-estilizada-bala-baiana.png";
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
    <main className="min-h-screen text-foreground">
      {/* ===== Section 1 — Hero ===== */}
      <section className="page-container pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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

            <h1 className="mt-6 text-3xl leading-[1.15] tracking-tight text-[color:var(--brown-deep)] sm:text-4xl md:text-5xl">
              Aprenda a fazer o{" "}
              <span className="font-bold text-[color:var(--brown)]">
                Cookie de Bala Baiana
              </span>{" "}
              com {siteConfig.hostName}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-[color:var(--on-card-muted)] md:text-xl">
              Uma aula prática para você aprender uma combinação diferente e irresistível: cookie +
              o sabor clássico da bala baiana.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[color:var(--on-card-muted)] md:text-xl">
              Participe gratuitamente e acompanhe todo o preparo ao vivo com a Flávia.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <button onClick={scrollToForm} className="btn-cta">
                Quero participar da aula gratuita
              </button>
            </div>

            <p className="mt-5 text-sm font-medium text-[color:var(--on-card-muted)] md:text-base">
              {siteConfig.eventDateShort} • {siteConfig.eventTimeShort} • Online e gratuito
            </p>
          </div>

          <div className="order-2">
            <div className="relative mx-auto w-full">
              <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[color:var(--yellow-junina)]/25 blur-2xl" />
              <div className="premium-card overflow-hidden rounded-[2.5rem]">
                <img
                  src={cookieBalaBaiana}
                  alt={siteConfig.eventName}
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
        <div className="page-container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:order-2 lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--brown)]">
                Aula prática
              </p>
              <h2 className="mt-3 text-3xl leading-tight text-[color:var(--brown-deep)] sm:text-4xl md:text-5xl">
                Uma receita para sair do cookie de sempre
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-[color:var(--on-card-muted)]">
                Flávia Maskavo vai preparar o Cookie de Bala Baiana e mostrar o passo a passo da
                receita, compartilhando os detalhes que fazem diferença no preparo e no resultado
                final.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-[color:var(--on-card-muted)]">
                Uma oportunidade para acompanhar a receita sendo feita ao vivo, entender cada etapa
                e aprender uma nova opção para incluir no seu cardápio.
              </p>
            </div>

            <div className="mx-auto w-[70%] lg:order-1">
              <img
                src={cookieEstilizado}
                alt={siteConfig.eventName}
                width={1080}
                height={1080}
                loading="lazy"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 3 — Aula ao vivo ===== */}
      <section className="py-12 md:py-16">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--yellow-junina)]/35 bg-white/80 px-6 py-10 shadow-[var(--shadow-card)] sm:px-8 md:px-10 md:py-12 lg:px-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[color:var(--yellow-junina)]/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-[color:var(--brown)]/10 blur-3xl" />

            <div className="relative text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--brown)]">
                Anote na agenda
              </p>
              <h2 className="mt-3 text-3xl leading-tight text-[color:var(--brown-deep)] sm:text-4xl md:text-5xl">
                Separe esse dia para aprender com a Flávia
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-[color:var(--on-card-muted)]">
                A aula acontece no dia 17 de agosto, ao vivo e gratuitamente.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-[color:var(--yellow-junina)]/40 bg-[color:var(--cream)] px-6 py-6">
                  <Calendar className="mx-auto h-7 w-7 text-[color:var(--brown)]" />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--on-card-muted)]">
                    Data
                  </p>
                  <p className="mt-1 text-xl font-bold uppercase tracking-wide text-[color:var(--brown-deep)]">
                    17 de agosto
                  </p>
                </div>
                <div className="rounded-3xl border border-[color:var(--yellow-junina)]/40 bg-[color:var(--cream)] px-6 py-6">
                  <Clock className="mx-auto h-7 w-7 text-[color:var(--brown)]" />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--on-card-muted)]">
                    Horário
                  </p>
                  <p className="mt-1 text-xl font-bold uppercase tracking-wide text-[color:var(--brown-deep)]">
                    {siteConfig.eventTimeShort}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[color:var(--brown)]/15 bg-[color:var(--brown)]/5 px-5 py-4 text-left sm:px-6">
                <VideoOff className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--brown)]" />
                <p className="text-base leading-relaxed text-[color:var(--brown-deep)]">
                  <strong>A aula não ficará gravada.</strong> Para acompanhar o preparo completo do
                  Cookie de Bala Baiana, você precisa estar presente no dia da transmissão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 4 — CTA + Formulário ===== */}
      <section id="cadastro" className="py-12 md:py-16">
        <div className="page-container">
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
                className="btn-cta mt-8 w-full disabled:opacity-70"
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

      <footer className="border-t border-[color:var(--brown-deep)]/10 py-6 text-center text-sm text-[color:var(--on-card-muted)]">
        <div className="page-container">
          <p>
            © {new Date().getFullYear()} {siteConfig.hostName} · Todos os direitos reservados
          </p>
        </div>
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

import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Calendar, Clock } from "lucide-react";

import logoMaskavo from "@/assets/logo-maskavo.svg";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: `Cadastro confirmado — Aula ${siteConfig.eventName}` },
      {
        name: "description",
        content:
          "Seu cadastro foi confirmado! Em breve você receberá todas as informações da aula ao vivo.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ObrigadoPage,
});

function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brown-deep)] text-white">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <img src={logoMaskavo} alt={siteConfig.brandName} className="mb-8 h-10 w-auto" />

        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--yellow-junina)] text-[color:var(--brown-deep)] shadow-lg">
          <Check className="h-8 w-8" strokeWidth={3} />
        </span>

        <h1 className="mt-8 text-3xl leading-tight sm:text-4xl md:text-5xl">
          Cadastro <span className="italic">confirmado!</span>
        </h1>

        <p className="mt-5 max-w-xl text-lg text-white/80">
          Sua vaga está garantida na aula gratuita ao vivo do{" "}
          <strong className="text-white">{siteConfig.eventName}</strong> com {siteConfig.hostName}.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-white/85">
          <span className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2">
            <Calendar className="h-4 w-4" /> {siteConfig.eventDateShort}
          </span>
          <span className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2">
            <Clock className="h-4 w-4" /> {siteConfig.eventTimeShort}
          </span>
        </div>

        <div className="mt-10 w-full max-w-lg rounded-2xl border-2 border-[#25D366]/40 bg-gradient-to-b from-[#25D366]/15 to-[#25D366]/5 p-8 shadow-[0_10px_40px_-10px_rgba(37,211,102,0.4)] backdrop-blur-sm">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg">
              <svg
                viewBox="0 0 32 32"
                fill="currentColor"
                className="h-8 w-8 text-white"
                aria-hidden="true"
              >
                <path d="M16.003 3C9.373 3 4 8.373 4 15c0 2.28.635 4.41 1.74 6.23L4 29l7.98-1.71A11.94 11.94 0 0 0 16.003 27C22.633 27 28 21.627 28 15S22.633 3 16.003 3Zm0 21.6c-1.79 0-3.55-.48-5.08-1.39l-.36-.21-4.74 1.02 1.03-4.62-.24-.38A9.55 9.55 0 0 1 6.4 15c0-5.29 4.31-9.6 9.6-9.6s9.6 4.31 9.6 9.6-4.31 9.6-9.6 9.6Zm5.49-7.19c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.54-.07-.15-.68-1.63-.93-2.23-.24-.58-.5-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.28-.2-.58-.35Z" />
              </svg>
            </span>
            <h2 className="mt-4 text-xl font-semibold sm:text-2xl">Entre no grupo exclusivo</h2>
            <p className="mt-2 text-base text-white/80">
              Receba todas as informações e lembretes da aula direto no seu WhatsApp.
            </p>

            <a
              href={siteConfig.whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1fbb59]"
            >
              <svg
                viewBox="0 0 32 32"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M16.003 3C9.373 3 4 8.373 4 15c0 2.28.635 4.41 1.74 6.23L4 29l7.98-1.71A11.94 11.94 0 0 0 16.003 27C22.633 27 28 21.627 28 15S22.633 3 16.003 3Zm0 21.6c-1.79 0-3.55-.48-5.08-1.39l-.36-.21-4.74 1.02 1.03-4.62-.24-.38A9.55 9.55 0 0 1 6.4 15c0-5.29 4.31-9.6 9.6-9.6s9.6 4.31 9.6 9.6-4.31 9.6-9.6 9.6Zm5.49-7.19c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.54-.07-.15-.68-1.63-.93-2.23-.24-.58-.5-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.28-.2-.58-.35Z" />
              </svg>
              Entrar no grupo do WhatsApp
            </a>
          </div>
        </div>

        <Link
          to="/"
          className="mt-10 text-sm text-white/60 underline underline-offset-4 hover:text-white"
        >
          Voltar para a página inicial
        </Link>
      </section>
    </main>
  );
}

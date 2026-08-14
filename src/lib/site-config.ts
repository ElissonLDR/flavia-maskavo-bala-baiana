/**
 * Central place to edit everything that is specific to YOUR event.
 * Change the values here and they propagate to the landing page,
 * the thank-you page, and the SEO metadata — no other edits needed.
 */

export const siteConfig = {
  /** Brand / host */
  brandName: "Maskavo",
  brandLogo: "/assets/logo-maskavo.svg",
  hostName: "Flávia Maskavo",

  /** Event identity */
  eventName: "Cookie de Bala Baiana",
  eventHook: "Bala Baiana",
  eventDateShort: "17 de agosto",
  eventTimeShort: "[HORÁRIO]", // atualizar quando o horário for confirmado
  eventDateLong: "17 de agosto",
  eventIsOnline: true,
  eventIsFree: true,
  eventOrigin: "landing-bala-baiana",

  /** Social proof */
  socialProofCount: "+4 mil",
  socialProofText: "alunas já passaram pelos cursos da Flávia Maskavo.",

  /** WhatsApp group (shown on the thank-you page) */
  whatsappGroupUrl: "https://chat.whatsapp.com/Eyo30XEe1sPGvOCw2XktwK",

  /** Form webhook — POST JSON leads here. Replace with YOUR endpoint. */
  webhookUrl:
    "https://webhook-n8n.v4companyamaral.com/webhook/fc7781ec-0d4c-46e3-ba4c-3c0dfc2c0a96",

  /** SEO — keep title < 60 chars, description < 160 chars */
  seo: {
    title: "Aula Gratuita AO VIVO — Cookie de Bala Baiana com Flávia Maskavo",
    description:
      "17 de agosto. Aprenda o Cookie de Bala Baiana ao vivo com Flávia Maskavo. Online e gratuito. A aula não ficará gravada.",
    ogTitle: "Aula Gratuita AO VIVO — Cookie de Bala Baiana",
    ogDescription:
      "Aula prática e gratuita ao vivo em 17 de agosto. Aprenda o Cookie de Bala Baiana com Flávia Maskavo. Inscreva-se agora.",
  },
} as const;

export type SiteConfig = typeof siteConfig;

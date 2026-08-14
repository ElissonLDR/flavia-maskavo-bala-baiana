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
  eventName: "Cookie NYC Lakaoreo",
  eventHook: "Dia Mundial do Chocolate",
  eventDateShort: "07/07", // shown as the date chip
  eventTimeShort: "19h", // shown as the time chip
  eventDateLong: "07 de julho, às 19h", // used in body copy
  eventIsOnline: true,
  eventIsFree: true,
  eventOrigin: "landing-cookie-nyc", // sent to the webhook as `origem`

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
    title: "Aula Gratuita AO VIVO — Cookie NYC Lakaoreo com Flávia Maskavo",
    description:
      "07/07 às 19h. Aprenda o Cookie NYC Lakaoreo ao vivo com Flávia Maskavo e ganhe uma oportunidade exclusiva. Vagas limitadas.",
    ogTitle: "Aula Gratuita AO VIVO — Cookie NYC Lakaoreo",
    ogDescription:
      "Comemore o Dia Mundial do Chocolate com uma aula gratuita ao vivo em 07/07 às 19h. Cadastre-se e entre no grupo exclusivo.",
  },
} as const;

export type SiteConfig = typeof siteConfig;

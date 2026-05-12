import type { Opportunity } from "@/types/content";

export const opportunities: Opportunity[] = [
  {
    id: "berlin-product",
    type: "internship",
    category: {
      en: "Product & strategy",
      pt: "Produto e estratégia",
      es: "Producto y estrategia",
    },
    title: {
      en: "Product internship — Berlin",
      pt: "Estágio em produto — Berlim",
      es: "Prácticas en producto — Berlín",
    },
    location: {
      en: "Berlin, Germany · Hybrid",
      pt: "Berlim, Alemanha · Híbrido",
      es: "Berlín, Alemania · Híbrido",
    },
    duration: {
      en: "3–6 months",
      pt: "3–6 meses",
      es: "3–6 meses",
    },
  },
  {
    id: "lisbon-growth",
    type: "traineeship",
    category: {
      en: "Growth & partnerships",
      pt: "Crescimento e parcerias",
      es: "Crecimiento y alianzas",
    },
    title: {
      en: "Growth trainee — Lisbon",
      pt: "Trainee de crescimento — Lisboa",
      es: "Becario/a de crecimiento — Lisboa",
    },
    location: {
      en: "Lisbon, Portugal · On-site",
      pt: "Lisboa, Portugal · Presencial",
      es: "Lisboa, Portugal · Presencial",
    },
    duration: {
      en: "4 months",
      pt: "4 meses",
      es: "4 meses",
    },
  },
  {
    id: "erasmus-research",
    type: "mobility",
    category: {
      en: "Research mobility",
      pt: "Mobilidade de investigação",
      es: "Movilidad de investigación",
    },
    title: {
      en: "Erasmus+ research mobility",
      pt: "Mobilidade Erasmus+ em investigação",
      es: "Movilidad Erasmus+ en investigación",
    },
    location: {
      en: "Multiple EU destinations",
      pt: "Vários destinos na UE",
      es: "Varios destinos en la UE",
    },
    duration: {
      en: "1–2 semesters",
      pt: "1–2 semestres",
      es: "1–2 semestres",
    },
  },
];

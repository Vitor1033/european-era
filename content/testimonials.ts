import type { Testimonial } from "@/types/content";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Inês Marques",
    role: {
      en: "Economics graduate, Porto",
      pt: "Licenciada em Economia, Porto",
      es: "Graduada en Economía, Oporto",
    },
    quote: {
      en: "European Era made the paperwork feel simple. I focused on the work, not the stress.",
      pt: "A European Era simplificou a papelada. Concentrei-me no trabalho, não no stress.",
      es: "European Era simplificó el papeleo. Me centré en el trabajo, no en el estrés.",
    },
  },
  {
    id: "t2",
    name: "Jonas Weber",
    role: {
      en: "Engineering student, Munich",
      pt: "Estudante de Engenharia, Munique",
      es: "Estudiante de Ingeniería, Múnich",
    },
    quote: {
      en: "Clear steps, human support, and opportunities that actually matched my goals.",
      pt: "Passos claros, apoio humano e oportunidades que corresponderam aos meus objetivos.",
      es: "Pasos claros, apoyo humano y oportunidades que encajaron con mis objetivos.",
    },
  },
  {
    id: "t3",
    name: "Sofía Álvarez",
    role: {
      en: "Design fellow, Valencia",
      pt: "Bolseira em design, Valência",
      es: "Becaria en diseño, Valencia",
    },
    quote: {
      en: "The platform feels premium—fast, calm, and built for international careers.",
      pt: "A plataforma parece premium—rápida, calma e feita para carreiras internacionais.",
      es: "La plataforma se siente premium: rápida, calmada y pensada para carreras internacionales.",
    },
  },
];

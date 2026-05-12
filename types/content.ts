export type Locale = "en" | "pt" | "es";

export type Localized<T = string> = Record<Locale, T>;

export type BlogPost = {
  slug: string;
  date: string;
  readMinutes: number;
  coverImage: string;
  title: Localized;
  excerpt: Localized;
};

export type Testimonial = {
  id: string;
  name: string;
  role: Localized;
  quote: Localized;
  avatar?: string;
};

export type Opportunity = {
  id: string;
  category: Localized;
  title: Localized;
  location: Localized;
  duration: Localized;
  type: "internship" | "mobility" | "traineeship";
};

export type Partner = {
  id: string;
  name: string;
  logo: string;
  href?: string;
};

export type FaqItem = {
  id: string;
  question: Localized;
  answer: Localized;
};

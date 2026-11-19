export const SITE_NAME = "Julian Frazier";
export const SITE_TAGLINE = "Drummer & Producer";
export const CONTACT_EMAIL = "frazierjulian50@gmail.com";

export const NAV_ITEMS = [
  { to: "/music", label: "Music" },
  { to: "/photos", label: "Photos" },
  { to: "/lessons", label: "Lessons" },
  { to: "/press", label: "Press" },
  { to: "/bio", label: "Bio" },
] as const;

export function pageMeta(title: string, description: string) {
  const full = `${title} — ${SITE_NAME}`;
  return [
    { title: full },
    { name: "description", content: description },
    { property: "og:title", content: full },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

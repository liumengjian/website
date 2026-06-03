export const social = [
  { url: "mailto:liumengjianguge@gmail.com", name: "mail" },
  { url: "https://github.com/liumengjian", name: "github" },
  { url: "https://x.com/Prina_lmther", name: "x" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];

export const social = [
  { url: "mailto:liumengjianguge@gmail.com", name: "mail" },
  { url: "https://github.com/liumengjian", name: "github" },
  { url: "https://x.com/Prina_lmther", name: "x" },
  { content: "image", image: "src/assets/images/normal/wechat.png", name: "wechat" },
  { content: "+86 18725926908", name: "phone"},
] as const satisfies { url?: string; content?: string; image?: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" | "wechat" | "phone" }[];

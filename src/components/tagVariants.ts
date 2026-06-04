export type TagVariant =
  | "three"
  | "websockets"
  | "react"
  | "redis"
  | "gray"
  | "html"
  | "css"
  | "javascript"
  | "node"
  | "next"
  | "kubernetes"
  | "postgresql"
  | "ogl"
  | "glsl"
  | "wx"
  | "typescript"
  | "vue"
  | "ai"
  | "koa"
  | "indexDB"
  | "electron"

export const tagLabels = {
  three: "Three.js",
  websockets: "WebSockets",
  react: "React",
  redis: "Redis",
  gray: "Gray",
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  node: "Node.js",
  next: "Next.js",
  kubernetes: "Kubernetes",
  postgresql: "PostgreSQL",
  ogl: "OGL.js",
  glsl: "GLSL",
  wx: "WeChat Mini Program",
  typescript: "TypeScript",
  vue: "Vue.js",
  ai: "AI",
  koa: "Koa",
  indexDB: "indexDB",
  electron: "electron.js"
} as const satisfies Record<TagVariant, string>;

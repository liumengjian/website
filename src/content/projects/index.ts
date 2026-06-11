import type { Locale } from "../../i18n/types";

//export const projectIds = ["cubewar", "quibbo", "sharkie", "particles", "pokedex"];
export const projectIds = ["streakon"];

function simplifyModules(glob: Record<string, any>) {
  const result: Record<string, any> = {};
  for (const [path, mod] of Object.entries(glob)) {
    const match = path.match(/\/([a-z0-9_-]+)\.ts$/i);
    if (match) result[match[1] as string] = mod;
  }
  return result;
}

export const projectModules = {
  zh: simplifyModules(import.meta.glob("./zh/*.ts")),
  en: simplifyModules(import.meta.glob("./en/*.ts")),
} as const satisfies Record<Locale, Record<string, () => Promise<any>>>;

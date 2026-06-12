import WHO_PAY from "../../../assets/thumbnails/who-pay.jpg";
import AI_PM from "../../../assets/thumbnails/ai-pm.png";
import COMMIT_CHECK from "../../../assets/thumbnails/commit-check.png";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Who Pay",
    slug: "whoPay",
    thumbnail: WHO_PAY,
    description: "Social/Expense Tracking Mini Program",
  },
  {
    title: "AI PM",
    slug: "aiPm",
    thumbnail: AI_PM,
    description: "AI assistant deployed and running locally",
  },
  {
    title: "prina-pre-commit-check",
    slug: "commitCheck",
    thumbnail: COMMIT_CHECK,
    description: "LLM-powered Git Hooks with natural language rule configuration",
  }
] as const satisfies ProjectPreview[];

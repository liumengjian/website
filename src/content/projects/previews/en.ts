import WHO_PAY from "../../../assets/thumbnails/who-pay.jpg";
import AI_PM from "../../../assets/thumbnails/ai-pm.png";

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
    description: "Local AI Assistant",
  },
] as const satisfies ProjectPreview[];

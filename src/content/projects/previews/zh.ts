import WHO_PAY from "../../../assets/thumbnails/who-pay.jpg";
import AI_PM from "../../../assets/thumbnails/ai-pm.png";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Who Pay",
    slug: "whoPay",
    thumbnail: WHO_PAY,
    description: "社交/记账小程序",
  },
  {
    title: "AI PM",
    slug: "aiPm",
    thumbnail: AI_PM,
    description: "本地AI助手",
  },
] as const satisfies ProjectPreview[];

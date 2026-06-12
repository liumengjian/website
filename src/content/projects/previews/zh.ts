import WHO_PAY from "../../../assets/thumbnails/who-pay.jpg";
import AI_PM from "../../../assets/thumbnails/ai-pm.png";
import COMMIT_CHECK from "../../../assets/thumbnails/commit-check.png";

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
    description: "本地部署运行的AI助手",
  },
  {
    title: "prina-pre-commit-check",
    slug: "commitCheck",
    thumbnail: COMMIT_CHECK,
    description: "大模型赋能 Git Hooks，支持自然语言配置代码检测规则",
  }
] as const satisfies ProjectPreview[];

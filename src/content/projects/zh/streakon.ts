import streakon0 from "../../../assets/images/projects/streakon/streakon-0.webp";
import streakon1 from "../../../assets/images/projects/streakon/streakon-1.webp";
import streakon2 from "../../../assets/images/projects/streakon/streakon-2.webp";
import streakon3 from "../../../assets/images/projects/streakon/streakon-3.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "StreakOn",
  theme: "dark",
  tags: ["next", "node", "postgresql", "redis"],
  videoBorder: false,
  live: "https://www.streakon.app",
  description:
    "StreakOn 帮助小群体通过共享连续打卡和简单的签到功能保持日常习惯。<br/><br/>该应用围绕低摩擦交互、移动端可用性和轻量级社交功能设计，使用 Next.js、Node.js、PostgreSQL 和 Redis 构建。",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: streakon0,
        alt: "个人和群组连续打卡",
        caption: "个人和群组连续打卡",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: streakon1,
        alt: "连续进度",
        caption: "连续进度",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: streakon2,
        alt: "为朋友加油",
        caption: "为朋友加油",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: streakon3,
        alt: "邀请流程",
        caption: "邀请流程",
      },
    },
  ],
} as const satisfies ProjectContent;

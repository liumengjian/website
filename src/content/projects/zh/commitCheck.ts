import IMG_1 from "../../../assets/images/projects/commit-check/1.png";
import IMG_2 from "../../../assets/images/projects/commit-check/2.png";
import IMG_3 from "../../../assets/images/projects/commit-check/3.png";


import type { ProjectContent } from "../../types";

export default {
  title: "prina-pre-commit-check",
  theme: "dark",
  tags: ["husky", "node", "ai", "gitHooks"],
  videoBorder: false,
  description:
    "依托大语言模型与指令编排，构建智能 Git 提交校验网关，支持自然语言自定义代码检测规则，实现提交阶段自动化代码质量巡检。",
  components: [
    {
      type: "text",
      props: {
        type: "link",
        title: "尝试一下",
        text: "https://www.npmjs.com/package/prina-pre-commit-check"
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_1,
        alt: "模型配置",
        caption: "模型配置",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_2,
        alt: "规则配置",
        caption: "规则配置",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_3,
        alt: "拦截示例",
        caption: "拦截示例",
      },
    },
  ],
} as const satisfies ProjectContent;

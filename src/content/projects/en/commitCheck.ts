import IMG_1 from "../../../assets/images/projects/commit-check/1.png";
import IMG_2 from "../../../assets/images/projects/commit-check/2.png";
import IMG_3 from "../../../assets/images/projects/commit-check/3.png";


import type { ProjectContent } from "../../types";

export default {
  title: "prina-pre-commit-check",
  theme: "dark",
  tags: ["husky", "node", "ai", "gitHooks"],
  videoBorder: false,
  // live: "https://www.streakon.app",
  description:
    "An intelligent Git commit validation gateway is developed with large language models and prompt orchestration. It enables natural language-based custom code inspection rules and automated code quality checks during code submission.",
  components: [
    {
      type: "text",
      props: {
        type: "link",
        title: "Try It",
        text: "https://www.npmjs.com/package/prina-pre-commit-check"
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_1,
        alt: "Model Configuration",
        caption: "Model Configuration",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_2,
        alt: "Rule Configuration",
        caption: "Rule Configuration",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_3,
        alt: "Interception Examples",
        caption: "Interception Examples",
      },
    },
  ],
} as const satisfies ProjectContent;

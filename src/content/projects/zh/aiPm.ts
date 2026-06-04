import IMG_1 from "../../../assets/images/projects/ai-pm/1.png";
import IMG_2 from "../../../assets/images/projects/ai-pm/2.png";
import IMG_3 from "../../../assets/images/projects/ai-pm/3.png";
import IMG_4 from "../../../assets/images/projects/ai-pm/4.png";


import type { ProjectContent } from "../../types";

export default {
  title: "AI PM",
  theme: "dark",
  tags: ["electron", "node", "indexDB", "javascript"],
  videoBorder: false,
  // live: "https://www.streakon.app",
  description:
    "AI PM 本地浏览器离线 AI 助手，数据全留存本地、零云端传输。支持自定义导入需求文档，一键变身 AI 产品经理，兼顾个人与企业使用<br/><br/>另有桌面版，可私信体验试用。",
  components: [
    {
      type: "text",
      props: {
        type: "link",
        title: "在线体验",
        text: "https://www.prina.site/pm/"
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_1,
        alt: "首页",
        caption: "首页",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_2,
        alt: "聊天",
        caption: "聊天",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_3,
        alt: "知识库",
        caption: "知识库",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_4,
        alt: "模型配置",
        caption: "模型配置",
      },
    },
  ],
} as const satisfies ProjectContent;

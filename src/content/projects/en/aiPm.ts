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
    "AI PM is an on-premises AI assistant. Its knowledge base and all business data are stored locally without any cloud transmission.It can function as a personal assistant and enterprise customer service assistant. By importing customized requirement documents with one click, it can be transformed into an AI Product Manager, meeting the usage demands of individuals and enterprises.; feel free to contact me for a free trial.",
  components: [
    {
      type: "text",
      props: {
        type: "link",
        title: "Try Online",
        text: "https://www.prina.site/pm/"
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_1,
        alt: "Home",
        caption: "Home",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_2,
        alt: "Chat",
        caption: "Chat",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_3,
        alt: "Knowledge Base",
        caption: "Knowledge Base",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_4,
        alt: "Model Configuration",
        caption: "Model Configuration",
      },
    },
  ],
} as const satisfies ProjectContent;

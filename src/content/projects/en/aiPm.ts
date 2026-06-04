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
    "AI PM is a local-browser-based AI assistant with full on-premise data storage and zero cloud data transmission. It acts as a dedicated AI helper for individuals and enterprises, and can function as an AI Product Manager after ingesting requirement documents. A desktop version is also ready; feel free to contact me for a free trial.",
  components: [
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

import IMG_1 from "../../../assets/images/projects/who-pay/1.jpg";
import IMG_2 from "../../../assets/images/projects/who-pay/2.jpg";
import IMG_3 from "../../../assets/images/projects/who-pay/3.jpg";
import IMG_4 from "../../../assets/images/projects/who-pay/4.jpg";
import IMG_5 from "../../../assets/images/projects/who-pay/5.jpg";
import IMG_6 from "../../../assets/images/projects/who-pay/6.jpg";
import IMG_7 from "../../../assets/images/projects/who-pay/7.jpg";


import type { ProjectContent } from "../../types";

export default {
  title: "Who Pay",
  theme: "dark",
  tags: ["wx", "node", "koa", "ai"],
  videoBorder: false,
  // live: "https://www.streakon.app",
  description:
    "WhoPay lets you quickly log detailed expenses for every trip.<br/><br/>You can also find like-minded travel companions to journey together, chat online and keep digital travel journals.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_1,
        alt: "Activity Lobby",
        caption: "Activity Lobby",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_2,
        alt: "Activity Details",
        caption: "Activity Details",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_3,
        alt: "Friend Chat",
        caption: "Friend Chat",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_4,
        alt: "Menu Page",
        caption: "Menu Page",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_5,
        alt: "Activity Notes",
        caption: "Activity Notes",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_6,
        alt: "My Information",
        caption: "My Information",
      },
    },
     {
      type: "media",
      props: {
        type: "image",
        src: IMG_7,
        alt: "Try it out!",
        caption: "Try it out!",
      },
    },
  ],
} as const satisfies ProjectContent;

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
    "Who Pay 可以帮你快速记录每次游玩的详细消费<br/><br/>还可以寻找志同道合的驴友一起游玩，在线聊天、做旅行手账",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_1,
        alt: "活动大厅",
        caption: "活动大厅",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_2,
        alt: "活动详情",
        caption: "活动详情",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_3,
        alt: "好友聊天（内测）",
        caption: "好友聊天（内测）",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_4,
        alt: "菜单页面",
        caption: "菜单页面",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_5,
        alt: "活动笔记",
        caption: "活动笔记",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: IMG_6,
        alt: "我的信息",
        caption: "我的信息",
      },
    },
     {
      type: "media",
      props: {
        type: "image",
        src: IMG_7,
        alt: "快来试试吧！",
        caption: "快来试试吧！",
      },
    },
  ],
} as const satisfies ProjectContent;

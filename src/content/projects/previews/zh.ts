import WHO_PAY from "../../../assets/thumbnails/who-pay.jpg";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Who Pay",
    slug: "whoPay",
    thumbnail: WHO_PAY,
    description: "社交/记账小程序",
  },
] as const satisfies ProjectPreview[];

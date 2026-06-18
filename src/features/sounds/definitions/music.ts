import { Howl } from "howler";

import trackPrina from "../../../assets/music/prina.ogg";

import type { MusicTrack } from "../types";

export const musicTracks = {
  prina: new Howl({ src: [trackPrina], loop: true, volume: 0, preload: false }),
} as const;

export const BASE_VOLUMES = {
  prina: 0.15,
} as const satisfies Record<MusicTrack, number>;

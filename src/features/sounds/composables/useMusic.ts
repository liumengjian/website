import { onMounted, onUnmounted, watchEffect } from "vue";
import gsap from "gsap";
import { BASE_VOLUMES, musicTracks } from "../definitions/music";
import { sizes } from "../../../utils/sizes";
import { howlerUnlocked, soundsEnabled } from "./useHowler";
import { isFeatureEnabled } from "../../../utils/features";
import { useAgent } from "../../../composables/useAgent";

import type { MusicTrack } from "../types";

export const useMusic = () => {
  const { isTouch } = useAgent();

  const tick = () => {
    if (!sizes.visible) return;
    if (!soundsEnabled.value || !howlerUnlocked.value || isTouch.value) return;

    // Always play prina track at base volume when sounds are enabled
    musicTracks.prina.volume(BASE_VOLUMES.prina);
  };

  const play = (trackId: MusicTrack) => {
    if (!isFeatureEnabled("sounds") || isTouch.value) return;
    const track = musicTracks[trackId];
    if (!track || track.playing()) return;
    track.load();
    track.play();
  };

  watchEffect(() => {
    if (!isFeatureEnabled("sounds")) return;
    if (!howlerUnlocked.value || !soundsEnabled.value || isTouch.value) return;

    play("prina");
  });

  onMounted(() => {
    if (!isFeatureEnabled("sounds")) return;
    gsap.ticker.add(tick);
  });

  onUnmounted(() => {
    if (!isFeatureEnabled("sounds")) return;
    gsap.ticker.remove(tick);
    musicTracks.prina.stop();
  });
};

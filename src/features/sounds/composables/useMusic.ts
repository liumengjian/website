import { onMounted, onUnmounted, watchEffect, watch } from "vue";
import gsap from "gsap";
import { BASE_VOLUMES, musicTracks } from "../definitions/music";
import { sizes } from "../../../utils/sizes";
import { howlerUnlocked, soundsEnabled } from "./useHowler";
import { isFeatureEnabled } from "../../../utils/features";
import { resources } from "../../../utils/resources";

import type { MusicTrack } from "../types";

export const useMusic = () => {
  let musicTried = false;

  const tick = () => {
    if (!sizes.visible) return;
    if (!soundsEnabled.value || !howlerUnlocked.value) return;

    // Always play prina track at base volume when sounds are enabled
    musicTracks.prina.volume(BASE_VOLUMES.prina);
  };

  const play = (trackId: MusicTrack) => {
    if (!isFeatureEnabled("sounds")) return;
    const track = musicTracks[trackId];
    if (!track || track.playing()) return;

    musicTried = true;

    const onLoad = () => {
      track.off("load", onLoad);
      track.off("loaderror", onLoadError);
      track.play();
    };

    const onLoadError = () => {
      track.off("load", onLoad);
      track.off("loaderror", onLoadError);
      // Silently fail — background music is not critical
    };

    track.once("load", onLoad);
    track.once("loaderror", onLoadError);
    track.load();
  };

  watchEffect(() => {
    if (!isFeatureEnabled("sounds")) return;
    if (!howlerUnlocked.value || !soundsEnabled.value) return;

    // Only load music after main resources are ready
    if (!musicTried && resources.isReady) {
      play("prina");
    }
  });

  // When resources become ready, trigger a re-evaluation
  watch(
    () => resources.isReady,
    (isReady) => {
      if (isReady && !musicTried && howlerUnlocked.value && soundsEnabled.value) {
        play("prina");
      }
    },
  );

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

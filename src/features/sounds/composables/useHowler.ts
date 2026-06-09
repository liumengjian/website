import { onMounted, onUnmounted, ref, watch } from "vue";
import gsap from "gsap";
import { lerp } from "../../../utils/math";
import { Howler } from "howler";
import { isFeatureEnabled } from "../../../utils/features";
import { tick as contactTick } from "../core/contact";
import { useAgent } from "../../../composables/useAgent";
import { stopSnoreRepetition } from "../core/contact";
import { tick as roomTick } from "../core/room";
import { sounds } from "../definitions/sounds";
import { getSoundsHowl } from "../utils/sounds";
import { resources } from "../../../utils/resources";

import type { SoundKey } from "../types";

export const howlerUnlocked = ref(false);
export const soundsEnabled = ref(false);

Howler.volume(0);

export const useHowler = () => {
  const { isTouch } = useAgent();
  const enabledVolume = ref<number>(0);

  const handleUnlocked = () => {
    howlerUnlocked.value = true;

    const storeItem = localStorage.getItem("portfolio-soundsEnabled");
    if (storeItem) {
      soundsEnabled.value = storeItem === "true";
    } else {
      // Default: enabled on desktop, disabled on touch
      soundsEnabled.value = !isTouch.value;
      localStorage.setItem("portfolio-soundsEnabled", soundsEnabled.value.toString());
    }
  };

  const tick = () => {
    if (!howlerUnlocked.value) {
      if (Howler.ctx.state !== "running") return;
      handleUnlocked();
    } else {
      contactTick();
      roomTick();

      const currentVolume = Howler.volume();
      if (currentVolume > 0.99 && enabledVolume.value === 1) {
        return;
      }
      const speed = enabledVolume.value === 1 ? 0.01 : 0.05;
      Howler.volume(lerp(currentVolume, enabledVolume.value, speed));
    }
  };

  const handleVisibilityChange = () => {
    Howler.mute(document.visibilityState === "hidden");
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "KeyM") {
      soundsEnabled.value = !soundsEnabled.value;
    }
  };

  watch(soundsEnabled, (newVal) => {
    if (!isFeatureEnabled("sounds")) return;
    enabledVolume.value = newVal ? 1 : 0;
    localStorage.setItem("portfolio-soundsEnabled", newVal.toString());

    // On touch devices, resume AudioContext on user toggle
    if (newVal && isTouch.value && Howler.ctx.state === "suspended") {
      Howler.ctx.resume();
    }
  });

  const loadSoundWithRetry = (soundKey: SoundKey, retries = 0): Promise<void> => {
    const howl = getSoundsHowl(soundKey);
    if (!howl) return Promise.resolve();

    return new Promise((resolve) => {
      // Skip if already loaded
      if (howl.state() === "loaded") {
        resolve();
        return;
      }

      const onLoad = () => {
        howl.off("load", onLoad);
        howl.off("loaderror", onError);
        resolve();
      };

      const onError = (_id: number, _error: unknown) => {
        howl.off("load", onLoad);
        howl.off("loaderror", onError);

        if (retries < 2) {
          // Retry with exponential backoff
          const delay = Math.pow(2, retries + 1) * 1000; // 2s, 4s
          setTimeout(() => {
            howl.load();
            loadSoundWithRetry(soundKey, retries + 1).then(resolve);
          }, delay);
        } else {
          // Max retries exhausted — resolve anyway, don't block
          console.warn(`[Audio] Failed to load ${soundKey} after ${retries + 1} attempts`);
          resolve();
        }
      };

      howl.once("load", onLoad);
      howl.once("loaderror", onError);
      howl.load();
    });
  };

  const loadAllSounds = async () => {
    const soundKeys = Object.keys(sounds) as SoundKey[];

    // Load sequentially to avoid overwhelming the server
    for (const key of soundKeys) {
      await loadSoundWithRetry(key);
    }
  };

  onMounted(() => {
    if (!isFeatureEnabled("sounds")) return;
    Howler.volume(0);

    if (howlerUnlocked.value) {
      soundsEnabled.value = localStorage.getItem("portfolio-soundsEnabled") === "true";
    }

    gsap.ticker.add(tick);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyPress);

    // Delay audio loading until after 3D resources are ready,
    // then load in background to avoid competing with critical assets
    if (resources.isReady) {
      loadAllSounds();
    } else {
      resources.once("ready", () => {
        loadAllSounds();
      });
    }
  });

  onUnmounted(() => {
    if (!isFeatureEnabled("sounds")) return;
    gsap.ticker.remove(tick);
    window.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("keydown", handleKeyPress);
    stopSnoreRepetition();
  });
};

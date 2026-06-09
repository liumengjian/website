import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { SRGBColorSpace, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter";
import { sources } from "../sources";

import type { Texture } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const isProd = import.meta.env.PROD;

type ResourceType = Texture | GLTF;

const LOADING_TIMEOUT = 30000; // 30s max loading time as safety net

class Resources extends EventEmitter<{
  ready: void;
  progress: number;
}> {
  toLoad = sources.length;
  isReady = false;
  loaded = 0;
  items: Record<string, any> = {};

  loaders: {
    gltfLoader: GLTFLoader;
    textureLoader: TextureLoader;
    fontLoader: FontLoader;
  };

  constructor() {
    super();

    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
      fontLoader: new FontLoader(),
    };
  }

  startLoading() {
    if (this.isReady) return;

    for (const source of sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(
          source.path,
          (file) => {
            this.sourceLoaded(source, file);
          },
          undefined, // onProgress
          (error) => {
            this.sourceError(source, error);
          },
        );
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(
          source.path,
          (file: Texture) => {
            file.colorSpace = SRGBColorSpace;
            this.sourceLoaded(source, file);
          },
          undefined, // onProgress
          (error) => {
            this.sourceError(source, error);
          },
        );
      }
    }

    // Safety timeout: force completion after LOADING_TIMEOUT
    this.timeoutId = window.setTimeout(() => {
      if (!this.isReady) {
        this.forceReady();
      }
    }, LOADING_TIMEOUT);
  }

  sourceLoaded(source: { name: string; type: string; path: string }, file: ResourceType) {
    if (this.isReady) return;

    this.items[source.name] = file;
    this.loaded++;

    this.emit("progress", this.loaded / this.toLoad);

    if (this.loaded === this.toLoad) {
      this.onReady();
    }
  }

  sourceError(source: { name: string; type: string; path: string }, error: unknown) {
    // Count failed assets as "loaded" so the preloader doesn't get stuck
    // Missing assets are rendered as fallback/empty in the 3D scene
    this.log(`Failed to load ${source.name} (${source.type}): ${source.path}`);
    if (!isProd) {
      console.warn(`[Resources] Failed to load ${source.name}:`, error);
    }

    this.loaded++;

    this.emit("progress", this.loaded / this.toLoad);

    if (this.loaded === this.toLoad) {
      this.onReady();
    }
  }

  forceReady() {
    // Force completion: count all unloaded assets as failed
    if (this.isReady) return;

    this.log(`Force ready: ${this.loaded}/${this.toLoad} assets loaded, timing out`);

    // Mark remaining assets as loaded to trigger ready
    this.loaded = this.toLoad;
    this.emit("progress", 1);

    this.onReady();
  }

  onReady() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
    this.isReady = true;
    this.emit("ready");
    this.log("All resources loaded");
  }

  log(message: string) {
    if (isProd) return;
    console.log(`[Resources] ${message}`);
  }

  private timeoutId: number | undefined;
}

export const resources = new Resources();
resources.startLoading();

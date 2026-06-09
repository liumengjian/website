import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { SRGBColorSpace, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter";
import { sources } from "../sources";

import type { Texture } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const isProd = import.meta.env.PROD;

type ResourceType = Texture | GLTF;

const MAX_CONCURRENCY = 3; // Limit parallel requests to avoid overwhelming server
const MAX_RETRIES = 2; // Retry failed loads with backoff
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

  private timeoutId: number | undefined;
  private queue: Array<{ source: (typeof sources)[number]; retries: number }> = [];
  private activeCount = 0;

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

    // Enqueue all sources
    this.queue = sources.map((s) => ({ source: s, retries: 0 }));

    // Start initial batch
    while (this.activeCount < MAX_CONCURRENCY && this.queue.length > 0) {
      this.loadNext();
    }

    // Safety timeout
    this.timeoutId = window.setTimeout(() => {
      if (!this.isReady) {
        this.forceReady();
      }
    }, LOADING_TIMEOUT);
  }

  private loadNext() {
    const entry = this.queue.shift();
    if (!entry) return;

    this.activeCount++;

    const { source } = entry;

    if (source.type === "gltfModel") {
      this.loaders.gltfLoader.load(
        source.path,
        (file) => {
          this.sourceLoaded(source, file);
          this.activeCount--;
          this.drainQueue();
        },
        undefined,
        (error) => {
          this.handleError(entry, error);
        },
      );
    } else if (source.type === "texture") {
      this.loaders.textureLoader.load(
        source.path,
        (file: Texture) => {
          file.colorSpace = SRGBColorSpace;
          this.sourceLoaded(source, file);
          this.activeCount--;
          this.drainQueue();
        },
        undefined,
        (error) => {
          this.handleError(entry, error);
        },
      );
    }
  }

  private handleError(entry: { source: (typeof sources)[number]; retries: number }, error: unknown) {
    if (entry.retries < MAX_RETRIES) {
      // Retry with exponential backoff
      entry.retries++;
      const delay = Math.pow(2, entry.retries) * 1000; // 2s, 4s
      this.log(`Retrying ${entry.source.name} (attempt ${entry.retries + 1}) in ${delay}ms`);
      setTimeout(() => {
        this.queue.push(entry);
        this.activeCount--;
        this.drainQueue();
      }, delay);
    } else {
      // Max retries exhausted — count as done
      this.sourceError(entry.source, error);
      this.activeCount--;
      this.drainQueue();
    }
  }

  private drainQueue() {
    // Start more loads if capacity available
    while (this.activeCount < MAX_CONCURRENCY && this.queue.length > 0) {
      this.loadNext();
    }

    // Check if everything is done
    if (this.activeCount === 0 && this.queue.length === 0 && !this.isReady) {
      this.onReady();
    }
  }

  sourceLoaded(source: { name: string; type: string; path: string }, file: ResourceType) {
    if (this.isReady) return;

    this.items[source.name] = file;
    this.loaded++;
    this.emit("progress", this.loaded / this.toLoad);
    this.log(`Loaded ${source.name} (${this.loaded}/${this.toLoad})`);
  }

  sourceError(source: { name: string; type: string; path: string }, error: unknown) {
    if (this.isReady) return;

    this.log(`Failed to load ${source.name} (${source.type}): ${source.path}`);
    if (!isProd) {
      console.warn(`[Resources] Failed to load ${source.name}:`, error);
    }

    this.loaded++;
    this.emit("progress", this.loaded / this.toLoad);
  }

  forceReady() {
    if (this.isReady) return;

    // Force count remaining unloaded assets as done
    const remaining = this.toLoad - this.loaded + this.queue.length;
    this.log(`Force ready: ${this.loaded}/${this.toLoad} loaded, ${remaining} pending, timing out`);

    this.loaded = this.toLoad;
    this.queue = [];
    this.activeCount = 0;
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
}

export const resources = new Resources();
resources.startLoading();

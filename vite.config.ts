import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  plugins: [
    vue(),
    glsl({
      include: ["**/*.glsl", "**/*.vert", "**/*.frag"],
      defaultExtension: "glsl",
      warnDuplicatedImports: false,
    }),
  ],
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".ogg", ".wav", ".glsl", ".ktx2"],
  },
  assetsInclude: ["**/*.svg", "**/*.gltf", "**/*.glb", "**/*.png", "**/*.jpg", "**/*.ktx2"],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/assets/styles/mixins.scss";`,
      },
    },
  },
  build: {
    outDir: "./dist",
    sourcemap: false,
    emptyOutDir: true,
    chunkSizeWarningLimit: 500,
    // Inline small assets as base64 to reduce HTTP requests
    assetsInlineLimit: 8192, // 8KB — inlines small images/fonts
    // Use newer target for smaller output
    target: "esnext",
    // Enable CSS code splitting per chunk
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Split large vendor libraries for better caching and parallel loading
        manualChunks: {
          "vendor-three": ["three"],
          "vendor-gsap": ["gsap"],
        },
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          const name = assetInfo.names?.[0] ?? "";
          if (/\.(png|jpe?g|webp|svg)$/i.test(name)) {
            return "assets/images/[hash][extname]";
          }
          if (/\.(glb|gltf)$/i.test(name)) {
            return "assets/models/[hash][extname]";
          }
          if (/\.(ogg|mp3|wav)$/i.test(name)) {
            return "assets/audio/[hash][extname]";
          }
          if (/\.(woff2?|ttf|otf)$/i.test(name)) {
            return "assets/fonts/[hash][extname]";
          }
          return "assets/[hash][extname]";
        },
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "js/[name]-[hash].js",
      },
    },
  },
});

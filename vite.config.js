/* eslint-disable prettier/prettier */
import {
  fileURLToPath,
  URL
} from "url";

import {
  defineConfig
} from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./client",
        import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    output: {
      assetFileNames: `assets/[name].[ext]`
    }
  },
});
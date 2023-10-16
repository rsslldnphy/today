import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/today/",
  plugins: [react()],
  resolve: { alias: { lodash: "lodash-es" } },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.join(__dirname, "index.html"),
        404: path.join(__dirname, "public/404.html"),
      },
    },
  },
});

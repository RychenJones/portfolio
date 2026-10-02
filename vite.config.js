import { defineConfig } from "vite";
import { resolve } from "node:path";

// Multi-page build: without this, `vite build` only emits index.html
// and the /pages/*.html files 404 in production.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        projects: resolve(import.meta.dirname, "pages/projects.html"),
        about: resolve(import.meta.dirname, "pages/about.html"),
        contact: resolve(import.meta.dirname, "pages/contact.html"),
      },
    },
  },
});
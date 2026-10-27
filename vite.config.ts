import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The site is served from the custom domain root.
export default defineConfig({
  base: "/",
  plugins: [react()],
});

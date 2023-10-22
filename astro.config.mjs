import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import svelte from "@astrojs/svelte";
import glsl from "vite-plugin-glsl";
import glslify from "vite-plugin-glslify";

export default defineConfig({
  integrations: [tailwind(), svelte()],
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [glsl(), glslify()],
  },
});

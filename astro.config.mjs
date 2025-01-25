// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

import svelte from "@astrojs/svelte";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), db(), tailwind(), svelte(), icon()],
  adapter: netlify(),
  output: "server",
});
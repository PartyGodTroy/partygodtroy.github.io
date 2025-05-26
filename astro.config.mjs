import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import htmx from 'astro-htmx';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  site: 'https://partygodtroy.github.io'
});
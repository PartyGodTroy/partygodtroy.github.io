import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://astronaut.github.io',
  base: 'partygodtroy.github.io',
  integrations: [tailwind()]
});
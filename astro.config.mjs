import { defineConfig } from 'astro/config';
import htmx from 'astro-htmx';
import react from "@astrojs/react";

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [ react()],
  site: 'https://partygodtroy.github.io',

  vite: {
    plugins: [tailwindcss()]
  }
});
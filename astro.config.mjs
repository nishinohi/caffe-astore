// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://nishinohi.github.io',
  base: '/caffe-astore',
  output: 'static',

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },
})

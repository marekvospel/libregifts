import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pages from 'vite-plugin-pages'
import i18n from '@intlify/vite-plugin-vue-i18n'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pages(),
    i18n({
      compositionOnly: true,
    }),
  ]
})

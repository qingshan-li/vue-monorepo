import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from "path";
// import WindiCSS from 'vite-plugin-windicss';
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // WindiCSS(),
    // Unocss({}),
  ],
  resolve: {
    // alias: {
    //   '@': resolve(__dirname, 'public')
    // }
  }
})
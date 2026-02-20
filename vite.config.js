import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      /** * Mendaftarkan '@' sebagai alias untuk folder 'src'.
       * Dengan ini, Anda cukup menulis '@/components/...' 
       * tanpa perlu menyertakan 'src' lagi dalam path-nya.
       */
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost gap-2 normal-case font-sans">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.085 11.062c.334.791.614 1.599.833 2.435.196.746.331 1.516.406 2.301a.539.539 0 00.54.491h12.274a.539.539 0 00.54-.491 21.084 21.084 0 00.406-2.301c.219-.836.499-1.644.833-2.435.482-1.141 1.101-2.212 1.834-3.193a.539.539 0 00-.092-.765 10.23 10.23 0 00-2.458-1.558c-.85-.414-1.745-.726-2.677-.927a.539.539 0 00-.575.362 5.39 5.39 0 01-10.428 0 .539.539 0 00-.575-.362 10.23 10.23 0 00-2.677.927 10.23 10.23 0 00-2.458 1.558.539.539 0 00-.092.765c.733.981 1.352 2.052 1.834 3.193z" />
      </svg>
      <span class="hidden md:inline">Themes</span>
      <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
    </div>

    <ul tabindex="0" class="dropdown-content z-[50] p-2 shadow-2xl bg-base-300 rounded-box w-64 mt-4 max-h-[70vh] overflow-y-auto border border-white/5 space-y-1">
      <li v-for="theme in availableThemes" :key="theme">
        <button 
          @click="setTheme(theme)"
          :class="['flex items-center justify-between w-full px-3 py-3 rounded-lg transition-all font-sans text-xs capitalize group', 
                   currentTheme === theme ? 'bg-primary text-primary-content shadow-lg' : 'hover:bg-base-content/10']"
          :data-theme="theme"
        >
          <div class="flex items-center gap-3">
            <div class="flex gap-0.5 rounded overflow-hidden border border-base-content/10 shrink-0">
              <div class="w-2 h-5 bg-primary"></div>
              <div class="w-2 h-5 bg-secondary"></div>
              <div class="w-2 h-5 bg-accent"></div>
              <div class="w-2 h-5 bg-neutral"></div>
            </div>
            <span class="font-bold tracking-wide">{{ theme }}</span>
          </div>
          
          <div v-if="currentTheme === theme" class="badge badge-xs badge-ghost border-none bg-primary-content/20 text-primary-content">
            Active
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/**
 * Daftar tema yang tersedia di DaisyUI.
 * Pastikan tema-tema ini didukung oleh versi DaisyUI kamu.
 */
const availableThemes = [
  "night", "luxury", "dracula", "emerald", 
  "cupcake", "retro", "halloween", "nord", 
  "coffee", "synthwave", "cyberpunk", "garden"
]

const currentTheme = ref(localStorage.getItem('zenshin_theme') || 'night')

const setTheme = (theme) => {
  currentTheme.value = theme
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('zenshin_theme', theme)
}

onMounted(() => {
  // Pastikan tema terpasang saat inisialisasi awal
  document.documentElement.setAttribute('data-theme', currentTheme.value)
})
</script>

<style scoped>
/* Custom scrollbar untuk menu dropdown.
  Menggunakan CSS variabel asli agar kompatibel dengan Tailwind v4.
*/
ul::-webkit-scrollbar {
  width: 5px;
}
ul::-webkit-scrollbar-track {
  background: transparent;
}
ul::-webkit-scrollbar-thumb {
  background-color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 20%, transparent);
  border-radius: 20px;
}
</style>
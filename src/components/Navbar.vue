<template>
  <div class="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-30 border-b border-base-content/5 px-4 md:px-6 transition-all duration-500">
    
    <div class="navbar-start gap-2">
      <label for="main-drawer" class="btn btn-ghost btn-circle lg:hidden">
        <Icon icon="ph:list-bold" class="text-xl text-base-content" />
      </label>
      
      <div class="flex items-center gap-3 px-2 select-none group">
        <span class="text-primary text-2xl font-black group-hover:rotate-12 transition-transform duration-300">前進</span>
        <div class="flex flex-col leading-none hidden xs:flex">
          <span class="text-lg font-black tracking-tighter text-base-content uppercase">Zenshin</span>
          <span class="text-[8px] opacity-40 font-black uppercase tracking-[0.2em] text-base-content">Core System</span>
        </div>
      </div>
    </div>

    <div class="navbar-end gap-1 md:gap-2">
      
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors" title="Switch Theme">
          <Icon icon="ph:palette-duotone" class="text-xl md:text-2xl text-primary" />
        </div>
        <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-[1.5rem] w-52 mt-4 max-h-80 md:max-h-96 overflow-y-auto border border-base-content/10 backdrop-blur-xl">
          <li class="px-4 py-2 text-[10px] font-black opacity-30 uppercase tracking-widest text-base-content">Environment Theme</li>
          <li v-for="theme in themes" :key="theme" class="mb-1">
            <button 
              class="flex items-center justify-between w-full px-4 py-3 text-sm capitalize rounded-xl transition-all group"
              :class="currentTheme === theme ? 'bg-primary text-primary-content font-black shadow-lg shadow-primary/20' : 'hover:bg-base-content/10 text-base-content'"
              @click="changeTheme(theme)"
            >
              <div class="flex items-center gap-3">
                <div :data-theme="theme" class="w-3 h-3 rounded-full bg-primary border border-white/20 shadow-sm"></div>
                <span class="tracking-tight">{{ theme }}</span>
              </div>
              <Icon v-if="currentTheme === theme" icon="ph:check-circle-fill" class="text-primary-content animate-pulse" />
            </button>
          </li>
        </ul>
      </div>

      <router-link to="/settings" class="btn btn-ghost btn-circle avatar hover:bg-primary/5 transition-all">
        <div class="bg-primary/10 text-primary rounded-xl w-9 md:w-10 ring-2 ring-primary/5 overflow-hidden flex items-center justify-center transition-all hover:ring-primary/20">
          <img v-if="userAvatar" :src="userAvatar" class="object-cover w-full h-full" alt="Avatar" />
          <span v-else class="text-[10px] font-black tracking-tighter">{{ userInitial }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const themes = [
  "night", "luxury", "dracula", "nord", 
  "synthwave", "coffee", "halloween", "emerald"
]

const currentTheme = ref(localStorage.getItem('zenshin_theme') || 'night')
const userName = ref(localStorage.getItem('zenshin_username') || 'User')
const userAvatar = ref(localStorage.getItem('zenshin_avatar') || '')

const userInitial = computed(() => {
  return userName.value.substring(0, 2).toUpperCase()
})

const changeTheme = (theme) => {
  currentTheme.value = theme
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('zenshin_theme', theme)
}

const loadProfile = () => {
  userName.value = localStorage.getItem('zenshin_username') || 'User'
  userAvatar.value = localStorage.getItem('zenshin_avatar') || ''
}

let profileInterval

onMounted(() => {
  document.documentElement.setAttribute('data-theme', currentTheme.value)
  window.addEventListener('storage', loadProfile)
  profileInterval = setInterval(loadProfile, 1000)
})

onUnmounted(() => {
  window.removeEventListener('storage', loadProfile)
  clearInterval(profileInterval)
})
</script>

<style scoped>
/* Custom Scrollbar untuk Dropdown Tema */
ul::-webkit-scrollbar {
  width: 4px;
}
ul::-webkit-scrollbar-thumb {
  background-color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 15%, transparent);
  border-radius: 10px;
}

/* Fix untuk mobile: Sembunyikan label teks Core System pada layar sangat kecil */
@media (max-width: 350px) {
  .xs\:flex {
    display: none !important;
  }
}
</style>
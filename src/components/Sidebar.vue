<template>
  <header class="lg:hidden fixed top-0 left-0 w-full bg-base-200/80 backdrop-blur-lg border-b border-base-content/5 z-50 px-6 py-4 flex items-center justify-between">
    <router-link to="/" class="flex items-center gap-3">
      <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
        <span class="text-primary-content text-lg font-black">前</span>
      </div>
      <span class="text-lg font-black tracking-tighter uppercase text-base-content">Zenshin</span>
    </router-link>
    
    <router-link to="/settings" class="avatar">
      <div class="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
        <img v-if="userAvatar" :src="userAvatar" class="object-cover" />
        <span v-else class="text-[10px] font-black text-primary">{{ userName.substring(0, 2).toUpperCase() }}</span>
      </div>
    </router-link>
  </header>

  <aside class="fixed bottom-0 left-0 w-full h-16 bg-base-200 border-t lg:static lg:flex lg:flex-col lg:w-80 lg:h-full lg:border-t-0 lg:border-r border-base-content/5 transition-all duration-300 z-50">
    
    <router-link to="/" class="hidden lg:flex p-8 items-center gap-4 group select-none">
      <div class="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:rotate-6">
        <span class="text-primary-content text-2xl font-black">前</span>
      </div>
      <div>
        <h2 class="text-xl font-black tracking-tighter leading-none text-base-content">Zenshin</h2>
        <p class="text-[10px] opacity-40 font-black uppercase tracking-[0.2em] mt-1 text-base-content">Core System</p>
      </div>
    </router-link>

    <nav class="flex flex-row lg:flex-col lg:flex-grow px-2 lg:px-4 h-full items-center lg:items-stretch justify-around lg:justify-start lg:space-y-1.5 lg:mt-2">
      <p class="hidden lg:block px-4 text-[10px] font-black opacity-30 uppercase tracking-[0.15em] mb-4 text-base-content">Workspace</p>
      
      <router-link 
        v-for="item in menuItems" 
        :key="item.path"
        :to="item.path" 
        class="flex flex-col lg:flex-row items-center gap-1 lg:gap-4 px-3 lg:px-4 py-2 lg:py-3.5 rounded-xl transition-all duration-300 group hover:bg-base-content/5 text-base-content"
        active-class="bg-primary! text-primary-content! shadow-lg lg:shadow-xl shadow-primary/20 scale-105 lg:scale-[1.02]"
      >
        <Icon :icon="item.icon" class="text-xl lg:text-lg transition-transform group-hover:scale-110" />
        <span class="font-bold text-[9px] lg:text-sm tracking-tight lg:tracking-normal">{{ item.name }}</span>
      </router-link>

      <button @click="handleLogout" class="lg:hidden flex flex-col items-center gap-1 px-3 py-2 text-error opacity-70">
        <Icon icon="ph:arrow-line-right-bold" class="text-xl" />
        <span class="font-bold text-[9px]">Exit</span>
      </button>
    </nav>

    <div class="hidden lg:block p-4 bg-base-content/5 m-4 rounded-[2rem] border border-base-content/5 space-y-3">
      <div class="flex items-center gap-3 px-2 py-1">
        <div class="avatar">
          <div class="bg-primary/10 text-primary rounded-2xl w-10 h-10 flex items-center justify-center overflow-hidden shadow-inner border border-primary/20">
            <img v-if="userAvatar" :src="userAvatar" alt="Avatar" class="object-cover w-full h-full" />
            <span v-else class="text-xs font-black">{{ userName.substring(0, 2).toUpperCase() }}</span>
          </div>
        </div>
        <div class="overflow-hidden">
          <p class="text-sm font-black truncate text-base-content leading-none mb-1">{{ userName }}</p>
          <p class="text-[9px] opacity-40 font-bold uppercase tracking-wider text-base-content">Active User</p>
        </div>
      </div>

      <button 
        @click="handleLogout"
        class="btn btn-ghost btn-sm w-full rounded-xl gap-3 font-black text-[10px] tracking-widest hover:bg-error/10 uppercase transition-all duration-300 group border-none"
      >
        <Icon icon="ph:arrow-line-right-bold" class="text-error transition-transform group-hover:translate-x-1" />
        <span class="text-base-content opacity-70 group-hover:opacity-100 group-hover:text-error transition-colors">
          Logout System
        </span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { Icon } from '@iconify/vue'

const router = useRouter()
const authStore = useAuthStore()

const userName = ref('User')
const userAvatar = ref('')

const menuItems = [
  { name: 'Overview', path: '/dashboard', icon: 'ph:layout-duotone' },
  { name: 'Tasks', path: '/tasks', icon: 'ph:check-square-offset-duotone' },
  { name: 'Schedule', path: '/schedule', icon: 'ph:calendar-blank-duotone' },
  { name: 'Settings', path: '/settings', icon: 'ph:gear-six-duotone' }
]

const loadProfile = () => {
  userName.value = localStorage.getItem('zenshin_username') || 'User'
  userAvatar.value = localStorage.getItem('zenshin_avatar') || ''
}

const handleLogout = () => {
  if (confirm('Keluar dari sistem Zenshin Core?')) {
    authStore.logout()
    router.push('/')
  }
}

onMounted(() => {
  loadProfile()
  window.addEventListener('storage', loadProfile)
})
</script>

<style scoped>
.text-base-content {
  transition: color 0.3s ease;
}

.router-link-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Sembunyikan scrollbar untuk nav mobile */
nav {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
nav::-webkit-scrollbar {
  display: none;
}

@media (max-width: 1023px) {
  /* Pastikan konten utama tidak tertutup bottom nav */
  :deep(main) {
    padding-bottom: 5rem;
    padding-top: 5rem;
  }
}
</style>
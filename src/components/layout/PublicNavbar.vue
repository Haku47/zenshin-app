<template>
  <nav class="fixed top-0 w-full z-50 px-6 py-6 transition-all duration-500">
    <div class="max-w-7xl mx-auto zenshin-glass rounded-[2rem] px-8 py-3 flex items-center justify-between shadow-2xl border-none">
      
      <router-link to="/" class="flex items-center gap-3 select-none group">
        <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform duration-300">
          <span class="text-primary-content text-xl font-black">前</span>
        </div>
        <div class="hidden sm:flex flex-col leading-none">
          <span class="text-xl font-black tracking-tighter uppercase text-base-content">Zenshin</span>
          <span class="text-[8px] font-black opacity-30 uppercase tracking-[0.4em] text-base-content">Core System</span>
        </div>
      </router-link>

      <div class="hidden lg:flex items-center gap-2">
        <button @click="navigateToSection('features')" class="zenshin-nav-link">
          <Icon icon="ph:rocket-launch-duotone" class="text-sm opacity-60" /> Fitur
        </button>
        <button @click="navigateToSection('security')" class="zenshin-nav-link">
          <Icon icon="ph:shield-check-duotone" class="text-sm opacity-60" /> Keamanan
        </button>
        <button @click="navigateToSection('about')" class="zenshin-nav-link">
          <Icon icon="ph:info-duotone" class="text-sm opacity-60" /> Tentang Kami
        </button>
      </div>

      <div class="flex items-center gap-3">
        <router-link 
          :to="authStore.isLoggedIn ? '/dashboard' : '/auth'" 
          class="btn btn-primary btn-md px-8 font-black text-[10px] tracking-[0.2em] uppercase rounded-2xl shadow-xl shadow-primary/20 border-none group transition-all duration-300 active:scale-95"
        >
          {{ authStore.isLoggedIn ? 'Dashboard' : 'Get Started' }}
          
          <Icon 
            :icon="authStore.isLoggedIn ? 'ph:gauge-duotone' : 'ph:arrow-right-bold'" 
            class="ml-2 text-base transition-transform duration-300 group-hover:translate-x-1" 
          />
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter, useRoute } from 'vue-router'
import { nextTick } from 'vue'
import { Icon } from '@iconify/vue' // Import Iconify Component

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

/**
 * Navigasi Lintas Halaman:
 * Memastikan scroll tetap bekerja meski user tidak sedang di Landing Page.
 */
const navigateToSection = async (id) => {
  if (route.path !== '/') {
    await router.push('/')
    await nextTick()
  }
  
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.zenshin-nav-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1.25rem;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  color: var(--fallback-bc, oklch(var(--bc)));
  opacity: 0.4;
  background: none;
  border: none;
  cursor: pointer;
}

.zenshin-nav-link:hover {
  opacity: 1;
  background-color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 5%, transparent);
  color: var(--fallback-p, oklch(var(--p)));
}

.zenshin-glass {
  background-color: color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 85%, transparent);
  backdrop-filter: blur(20px);
  border: 1px solid color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 10%, transparent);
}
</style>
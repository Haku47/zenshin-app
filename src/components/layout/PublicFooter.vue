<template>
  <footer class="relative py-12 md:py-20 px-6 border-t border-base-content/5 mt-10 md:mt-20 overflow-hidden bg-base-100 transition-colors duration-500">
    <div class="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-[80px] md:blur-[120px] -mr-32 -mt-32 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
        
        <div class="col-span-2 lg:col-span-1 space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
          <div class="flex items-center gap-3 select-none">
            <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/10">
              <span class="text-primary-content text-xl font-black">前</span>
            </div>
            <div class="flex flex-col leading-none">
              <span class="text-xl font-black tracking-tighter uppercase text-base-content">Zenshin</span>
              <span class="text-[8px] font-black opacity-30 uppercase tracking-[0.4em] text-base-content">Core System</span>
            </div>
          </div>
          <p class="text-[11px] font-black opacity-50 uppercase tracking-widest leading-relaxed max-w-[280px] text-base-content">
            Personal Productivity Environment. <br class="hidden md:block">
            Didesain untuk privasi lokal dan fokus maksimal.
          </p>
          <div class="flex gap-4 pt-2">
            <a href="https://github.com" target="_blank" class="social-link" aria-label="Github">
              <Icon icon="ph:github-logo-duotone" />
            </a>
            <a href="https://instagram.com" target="_blank" class="social-link" aria-label="Instagram">
              <Icon icon="ph:instagram-logo-duotone" />
            </a>
            <a href="https://twitter.com" target="_blank" class="social-link" aria-label="Twitter">
              <Icon icon="ph:x-logo-duotone" />
            </a>
          </div>
        </div>

        <div class="space-y-6">
          <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Portal</h4>
          <ul class="space-y-4">
            <li><router-link to="/" class="footer-link">Overview</router-link></li>
            <li><router-link :to="authStore.isLoggedIn ? '/dashboard' : '/auth'" class="footer-link">Akses Sistem</router-link></li>
            <li><button @click="navigateToSection('features')" class="footer-link">Fitur</button></li>
            <li><router-link to="/changelog" class="footer-link">Changelog</router-link></li>
          </ul>
        </div>

        <div class="space-y-6">
          <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Legal</h4>
          <ul class="space-y-4">
            <li><router-link to="/privacy" class="footer-link">Privacy</router-link></li>
            <li><router-link to="/terms" class="footer-link">Terms</router-link></li>
            <li><router-link to="/security-audit" class="footer-link">Security</router-link></li>
          </ul>
        </div>

        <div class="col-span-2 lg:col-span-1 space-y-6 mt-4 lg:mt-0">
          <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-primary">System Status</h4>
          <div class="zenshin-glass p-5 rounded-2xl border-none space-y-4 shadow-inner">
            <div class="flex items-center justify-between">
              <span class="text-[9px] font-black uppercase opacity-40 text-base-content">Core Engine</span>
              <span class="badge badge-success badge-xs font-black p-2 text-[8px] rounded-md">ONLINE</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-[9px] font-black uppercase opacity-40 text-base-content">Local Sync</span>
              <span class="badge badge-success badge-xs font-black p-2 text-[8px] rounded-md">STABLE</span>
            </div>
            <p class="text-[9px] font-black opacity-30 leading-tight text-base-content">Terhubung secara lokal di browser Anda.</p>
          </div>
        </div>
      </div>

      <div class="pt-8 border-t border-base-content/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div class="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <p class="text-[9px] font-black opacity-20 uppercase tracking-[0.4em] text-base-content">
            &copy; 2026 ZENSHIN CORE • BUILD 1.0.4
          </p>
        </div>
        <p class="text-[9px] font-black opacity-20 uppercase tracking-[0.4em] leading-none text-base-content">
          Designed for those who keep moving forward
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter, useRoute } from 'vue-router'
import { nextTick } from 'vue'
import { Icon } from '@iconify/vue'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const navigateToSection = async (id) => {
  if (route.path !== '/') {
    await router.push('/')
    await nextTick()
  }
  
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.footer-link {
  display: block;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  color: var(--fallback-bc, oklch(var(--bc)));
  opacity: 0.4;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.footer-link:hover {
  opacity: 1;
  transform: translateX(4px);
  color: var(--fallback-p, oklch(var(--p)));
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 5%, transparent);
  color: var(--fallback-bc, oklch(var(--bc)));
  opacity: 0.5;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.social-link:hover {
  opacity: 1;
  background-color: var(--fallback-p, oklch(var(--p)));
  color: var(--fallback-pc, oklch(var(--pc)));
  transform: translateY(-2px);
}

.zenshin-glass {
  background-color: color-mix(in srgb, var(--fallback-b2, oklch(var(--b2))) 50%, transparent);
  backdrop-filter: blur(10px);
}

/* Fix mobile touch targets */
@media (max-width: 768px) {
  .footer-link {
    padding: 4px 0;
  }
  .social-link {
    width: 40px;
    height: 40px;
  }
}
</style>
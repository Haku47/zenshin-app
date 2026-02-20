<template>
  <div class="drawer lg:drawer-open font-sans">
    <input id="main-drawer" type="checkbox" class="drawer-toggle" />
    
    <div class="drawer-content flex flex-col min-h-screen bg-base-100">
      
      <Navbar />

      <main class="p-6 md:p-10 flex-grow relative">
        <RouterView v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <div :key="$route.path">
              <component :is="Component" />
            </div>
          </transition>
        </RouterView>
      </main>

      <footer class="p-8 footer footer-center text-base-content/30 border-t border-base-content/5">
        <div class="flex flex-col gap-1">
          <p class="font-bold tracking-widest text-xs uppercase">Zenshin Framework</p>
          <p class="text-[10px]">© 2026 Zenshin App | Alviensyah Mohammad</p>
        </div>
      </footer>
    </div> 

    <div class="drawer-side z-40 shadow-2xl">
      <label for="main-drawer" class="drawer-overlay" aria-label="close sidebar"></label>
      <Sidebar />
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'

const $route = useRoute()
</script>

<style scoped>
/* Animasi Perpindahan Halaman yang Halus */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Memastikan konten utama selalu mengambil lebar maksimal dengan rapi */
main {
  width: 100%;
  max-width: 100vw;
}
</style>
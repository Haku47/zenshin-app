<template>
  <div class="min-h-screen bg-base-100 font-sans transition-colors duration-300">
    
    <div v-if="isInternalPage" class="flex h-screen overflow-hidden">
      <Sidebar />

      <div class="flex flex-col flex-grow overflow-hidden">
        <Navbar />

        <main class="flex-grow overflow-y-auto p-6 bg-base-100">
          <router-view v-slot="{ Component }">
            <transition name="page-slide" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
      </div>
    </div>

    <div v-else class="min-h-screen">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()

/**
 * Logika pemisahan layout:
 * Jika rute memiliki meta 'requiresAuth', tampilkan Sidebar & Navbar internal.
 * Jika tidak (Landing/Auth), tampilkan layout polos.
 */
const isInternalPage = computed(() => {
  return route.meta.requiresAuth === true
})
</script>

<style>
/* Animasi Transisi Halaman Internal */
.page-slide-enter-active,
.page-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.page-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Animasi Fade untuk Public (Landing/Auth) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom Scrollbar untuk Area Main Dashboard */
main::-webkit-scrollbar {
  width: 6px;
}
main::-webkit-scrollbar-thumb {
  background-color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 10%, transparent);
  border-radius: 10px;
}
</style>
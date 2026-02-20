<template>
  <div class="min-h-screen flex flex-col bg-base-100 transition-colors duration-500 overflow-hidden relative">
    <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

    <PublicNavbar />

    <main class="flex-grow pt-32 pb-20 px-6 relative z-10">
      <div class="max-w-5xl mx-auto space-y-20">
        
        <section class="text-center space-y-6 animate-fade-in">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-content/5 border border-base-content/10 backdrop-blur-md text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-2">
            <Icon icon="ph:cpu-duotone" class="text-lg animate-pulse" /> Zenshin Core Updates
          </div>
          <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-none text-base-content">
            Versi <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic">Log.</span>
          </h1>
          <p class="max-w-2xl mx-auto text-base-content opacity-50 font-bold text-lg leading-relaxed">
            Evolusi berkelanjutan menuju ekosistem produktivitas yang lebih cerdas, aman, dan tanpa distraksi.
          </p>
        </section>

        <div class="space-y-12">
          <div v-for="(log, index) in changelogs" :key="index" class="relative group animate-fade-in-up" :style="{ animationDelay: `${index * 150}ms` }">
            
            <div class="zenshin-card group-hover:zenshin-card-active p-8 md:p-12 rounded-[3rem] border border-base-content/5 transition-all duration-500 relative overflow-hidden bg-base-200/40 backdrop-blur-xl shadow-2xl">
              
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div class="flex items-center gap-6">
                  <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl shadow-inner group-hover:bg-primary group-hover:text-primary-content transition-all duration-500">
                    <Icon :icon="log.version === '1.0.4' ? 'ph:rocket-duotone' : 'ph:package-duotone'" />
                  </div>
                  <div>
                    <h2 class="text-3xl font-black tracking-tighter text-base-content uppercase leading-none">{{ log.title }}</h2>
                    <div class="flex items-center gap-3 mt-2">
                       <span class="badge badge-primary font-black text-[10px] tracking-widest px-3 rounded-lg">{{ log.version }}</span>
                       <span class="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">{{ log.date }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="hidden md:block">
                  <Icon icon="ph:seal-check-duotone" class="text-5xl opacity-5 group-hover:opacity-20 text-primary transition-opacity" />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div v-for="item in log.changes" :key="item" class="flex items-start gap-4 p-4 rounded-2xl hover:bg-base-content/5 transition-colors duration-300">
                  <div class="w-2 h-2 rounded-full bg-primary mt-2 group-hover:scale-150 transition-transform"></div>
                  <p class="text-sm font-bold opacity-70 leading-relaxed text-base-content tracking-tight">
                    {{ item }}
                  </p>
                </div>
              </div>

              <div class="absolute -right-8 -bottom-10 text-[12rem] font-black opacity-[0.02] select-none group-hover:opacity-[0.05] transition-opacity duration-700 italic">
                {{ log.version }}
              </div>
            </div>
          </div>
        </div>

        <div class="text-center pt-10">
          <router-link to="/" class="btn btn-ghost hover:bg-base-content/5 rounded-2xl font-black gap-3 px-10 transition-all group text-base-content opacity-50 hover:opacity-100">
            <Icon icon="ph:arrow-left-bold" class="group-hover:-translate-x-2 transition-transform" />
            KEMBALI KE BERANDA
          </router-link>
        </div>
      </div>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import PublicNavbar from '@/components/layout/PublicNavbar.vue'
import PublicFooter from '@/components/layout/PublicFooter.vue'

const changelogs = [
  {
    version: '1.0.4',
    date: '09 FEBRUARI 2026',
    title: 'Visual Integrity',
    changes: [
      'Migrasi total sistem ikon ke Iconify Phosphor Duotone untuk performa maksimal.',
      'Sistem navigasi cerdas yang mendeteksi posisi halaman untuk auto-scrolling.',
      'Refaktor CSS global menggunakan color-mix untuk dukungan High-Contrast murni.',
      'Penambahan sistem audit keamanan teknis dan kebijakan privasi transparan.'
    ]
  },
  {
    version: '1.0.2',
    date: '02 FEBRUARI 2026',
    title: 'Core Engine',
    changes: [
      'Implementasi penyimpanan Local-First dengan skema sinkronisasi instan.',
      'Dashboard statistik interaktif dengan visualisasi progres harian.',
      'Fitur export/import data dalam format .json untuk portabilitas data.',
      'Optimasi rendering list tugas dengan animasi Bezier premium.'
    ]
  },
  {
    version: '1.0.0',
    date: '15 JANUARI 2026',
    title: 'Grand Alpha',
    changes: [
      'Inisialisasi Zenshin Core dengan Vue 3 dan Tailwind CSS v4.',
      'Sistem otentikasi berbasis sesi lokal tanpa database eksternal.',
      'Layouting Glassmorphism adaptif dengan dukungan multi-tema.',
      'Modul manajemen jadwal mingguan (Academic Schedule).'
    ]
  }
]
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Modern Card Glow */
.zenshin-card {
  box-shadow: 0 0 0 1px rgba(var(--bc), 0.05);
}

.zenshin-card-active {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2), 
              0 0 0 1px rgba(var(--p), 0.2);
  background-color: color-mix(in srgb, var(--fallback-b2, oklch(var(--b2))) 60%, transparent);
}

.text-base-content {
  color: var(--fallback-bc, oklch(var(--bc)));
}
</style>
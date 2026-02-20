<template>
  <div class="min-h-screen flex flex-col bg-base-100 transition-colors duration-500 overflow-x-hidden">
    <PublicNavbar />

    <main class="flex-grow pt-24 md:pt-32 pb-10 md:pb-20 px-4 md:px-6">
      <div class="max-w-6xl mx-auto text-center space-y-20 md:space-y-32">
        
        <section class="space-y-8 md:space-y-12 py-6 md:py-10">
          <div class="space-y-6 animate-fade-in">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[9px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase mb-2 md:mb-4">
              <Icon icon="ph:shield-check-duotone" class="text-sm" /> Privacy First Environment
            </div>
            <h1 class="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9] text-base-content px-2">
              Langkah Lebih <span class="text-primary italic">Jauh</span> <br class="hidden sm:block"> 
              Mulai Dari <span class="underline decoration-secondary decoration-4 md:decoration-8 italic">Sini.</span>
            </h1>
            <p class="max-w-xl md:max-w-2xl mx-auto text-sm md:text-lg opacity-60 font-bold tracking-tight leading-relaxed px-4">
              Manajemen tugas dan agenda harian yang dirancang untuk produktivitas maksimal. Tanpa distraksi, murni data lokal, dan sepenuhnya milik Anda.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
            <router-link 
              to="/auth" 
              class="btn btn-primary btn-md md:btn-lg w-full sm:w-auto px-10 md:px-12 rounded-2xl font-black shadow-2xl shadow-primary/20 border-none group text-xs md:text-sm"
            >
              START YOUR JOURNEY 
              <Icon icon="ph:arrow-right-bold" class="ml-2 group-hover:translate-x-1 transition-transform" />
            </router-link>
            
            <button 
              @click="scrollTo('features')"
              class="btn btn-ghost btn-md md:btn-lg w-full sm:w-auto px-10 md:px-12 rounded-2xl font-black opacity-40 hover:opacity-100 transition-all uppercase tracking-widest text-[10px]"
            >
              EXPLORE CORE <Icon icon="ph:caret-double-down-bold" class="ml-2 animate-bounce" />
            </button>
          </div>
        </section>

        <section id="features" class="space-y-10 md:space-y-16 scroll-mt-24 md:scroll-mt-32 px-2">
          <div class="text-center space-y-2">
            <h2 class="text-[10px] font-black tracking-[0.4em] text-primary uppercase">Core Features</h2>
            <p class="text-2xl md:text-3xl font-black tracking-tighter text-base-content">Esensi Produktivitas.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div 
              v-for="feat in features" 
              :key="feat.title" 
              class="zenshin-glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-left space-y-4 md:space-y-5 hover:scale-[1.02] md:hover:scale-105 transition-all duration-500 shadow-xl border-none group"
            >
              <div class="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl md:text-2xl shadow-inner transition-colors group-hover:bg-primary group-hover:text-primary-content">
                <Icon :icon="feat.icon" />
              </div>
              <div>
                <h3 class="font-black uppercase text-[10px] md:text-xs tracking-[0.2em] text-primary mb-2">{{ feat.title }}</h3>
                <p class="text-sm md:text-base opacity-70 font-bold tracking-tight leading-snug text-base-content">{{ feat.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="security" class="scroll-mt-24 md:scroll-mt-32 px-2">
          <div class="zenshin-glass rounded-[2rem] md:rounded-[3rem] p-6 md:p-20 flex flex-col md:flex-row items-center gap-10 md:gap-12 text-left border-none shadow-2xl overflow-hidden relative">
            <div class="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none hidden md:block">
              <Icon icon="ph:shield-slash-duotone" class="text-[20rem] -rotate-12" />
            </div>

            <div class="w-full md:w-1/2 space-y-6 relative">
              <div class="w-10 h-10 md:w-12 md:h-12 bg-success/10 text-success rounded-xl flex items-center justify-center">
                <Icon icon="ph:fingerprint-duotone" class="text-xl md:text-2xl" />
              </div>
              <h2 class="text-3xl md:text-4xl font-black tracking-tighter leading-tight text-base-content">Data Anda, <br><span class="text-success">Kedaulatan Anda.</span></h2>
              <p class="font-bold opacity-60 leading-relaxed tracking-tight text-sm md:text-base text-base-content">
                Zenshin Core dibangun dengan prinsip Local-First. Semua data tugas, agenda, dan profil Anda disimpan 100% di browser. Tanpa server, tanpa pelacakan, sepenuhnya kebal dari kebocoran data pihak ketiga.
              </p>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <li v-for="item in securityPoints" :key="item" class="flex items-center gap-3 font-black text-[9px] md:text-xs uppercase tracking-widest opacity-80 text-base-content">
                  <Icon icon="ph:check-circle-fill" class="text-success text-sm md:text-base" /> {{ item }}
                </li>
              </ul>
            </div>

            <div class="w-full md:w-1/2 grid grid-cols-2 gap-3 md:gap-4 relative">
              <div class="zenshin-glass p-4 md:p-6 rounded-2xl md:rounded-3xl bg-base-100/50 text-center space-y-2 border-none">
                <Icon icon="ph:cloud-slash-duotone" class="text-error opacity-40 text-xl md:text-3xl mx-auto" />
                <p class="text-[8px] md:text-[10px] font-black uppercase opacity-40 text-base-content">Cloud Server</p>
                <p class="text-[10px] md:text-xs font-black italic uppercase text-base-content">Disconnected</p>
              </div>
              <div class="zenshin-glass p-4 md:p-6 rounded-2xl md:rounded-3xl bg-base-100/50 text-center space-y-2 border-none">
                <Icon icon="ph:hard-drive-duotone" class="text-success text-xl md:text-3xl mx-auto" />
                <p class="text-[8px] md:text-[10px] font-black uppercase opacity-40 text-base-content">Local Storage</p>
                <p class="text-[10px] md:text-xs font-black italic uppercase text-success">Active</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" class="space-y-8 md:space-y-12 scroll-mt-24 md:scroll-mt-32 pb-10 md:pb-20 px-4">
          <div class="max-w-3xl mx-auto space-y-6">
            <h2 class="text-[10px] font-black tracking-[0.4em] text-primary uppercase">About Zenshin</h2>
            <p class="text-3xl md:text-4xl font-black tracking-tighter leading-tight text-base-content">
              Didesain untuk yang ingin terus <span class="italic text-primary">Melangkah Maju.</span>
            </p>
            <p class="font-bold opacity-60 leading-relaxed text-sm md:text-lg text-base-content">
              Nama <span class="text-primary font-black">Zenshin (前進)</span> berarti "Maju Terus". Kami percaya produktivitas bukan tentang seberapa sibuk Anda, tapi seberapa konsisten Anda melangkah menuju target.
            </p>
            <div class="flex justify-center gap-8 md:gap-12 pt-6">
              <div class="text-center">
                <p class="text-3xl md:text-4xl font-black tracking-tighter text-base-content">1.0.4</p>
                <p class="text-[8px] md:text-[10px] font-black uppercase opacity-40 tracking-widest text-base-content">Stable Build</p>
              </div>
              <div class="text-center">
                <p class="text-3xl md:text-4xl font-black tracking-tighter text-base-content">100%</p>
                <p class="text-[8px] md:text-[10px] font-black uppercase opacity-40 tracking-widest text-base-content">Client Side</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import PublicNavbar from '@/components/layout/PublicNavbar.vue'
import PublicFooter from '@/components/layout/PublicFooter.vue'

const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const features = [
  { 
    title: 'Daily Task', 
    icon: 'ph:check-square-offset-duotone', 
    desc: 'Kelola rencana harian dengan sistem antarmuka yang bersih dan intuitif.' 
  },
  { 
    title: 'Smart Schedule', 
    icon: 'ph:calendar-duotone', 
    desc: 'Agenda mingguan yang otomatis terurut secara kronologis untuk fokus Anda.' 
  },
  { 
    title: 'Total Privacy', 
    icon: 'ph:vault-duotone', 
    desc: 'Semua data disimpan di storage lokal Anda. Tidak ada data yang meninggalkan sistem.' 
  }
]

const securityPoints = [
  'Zero Tracking',
  'Offline First',
  'Browser Auth',
  'JSON Export'
]
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.zenshin-glass {
  background-color: color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 85%, transparent);
  backdrop-filter: blur(20px);
}

.text-base-content {
  color: var(--fallback-bc, oklch(var(--bc)));
}
</style>
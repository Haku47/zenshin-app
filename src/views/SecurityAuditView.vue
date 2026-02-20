<template>
  <div class="min-h-screen flex flex-col bg-base-100 transition-colors duration-500">
    <PublicNavbar />

    <main class="flex-grow pt-32 pb-20 px-6">
      <div class="max-w-5xl mx-auto space-y-12">
        
        <section class="text-center space-y-4 animate-fade-in">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/5 border border-success/10 text-success text-[10px] font-black tracking-[0.3em] uppercase mb-4">
            <Icon icon="ph:cpu-duotone" class="text-sm" /> Technical Integrity
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-none text-base-content">
            Security <span class="text-primary italic">Audit.</span>
          </h1>
          <p class="text-xs font-black opacity-40 uppercase tracking-[0.4em]">Audit Internal System • Versi 1.0.4</p>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div class="zenshin-glass p-8 rounded-[2.5rem] border-none shadow-xl space-y-4 group">
            <div class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-content">
              <Icon icon="ph:cloud-slash-duotone" class="text-2xl" />
            </div>
            <h3 class="text-xl font-black tracking-tighter uppercase">Zero External Requests</h3>
            <p class="text-sm font-black opacity-60 leading-relaxed">
              Zenshin Core tidak melakukan pemanggilan API eksternal untuk menyimpan atau mengolah data pengguna. Seluruh logika aplikasi berjalan 100% di sisi klien (Client-Side).
            </p>
            <div class="badge badge-outline border-primary/20 text-[9px] font-black tracking-widest p-3 text-primary uppercase">Verified by Design</div>
          </div>

          <div class="zenshin-glass p-8 rounded-[2.5rem] border-none shadow-xl space-y-4 group">
            <div class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-content">
              <Icon icon="ph:browser-duotone" class="text-2xl" />
            </div>
            <h3 class="text-xl font-black tracking-tighter uppercase">Browser Sandboxing</h3>
            <p class="text-sm font-black opacity-60 leading-relaxed">
              Data Anda diisolasi menggunakan mekanisme sandboxing browser. Situs lain tidak dapat mengakses data <code>localStorage</code> yang dimiliki oleh domain Zenshin.
            </p>
            <div class="badge badge-outline border-primary/20 text-[9px] font-black tracking-widest p-3 text-primary uppercase">Native Protection</div>
          </div>

          <div class="zenshin-glass p-8 rounded-[2.5rem] border-none shadow-xl space-y-4 group">
            <div class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-content">
              <Icon icon="ph:shield-checkered-duotone" class="text-2xl" />
            </div>
            <h3 class="text-xl font-black tracking-tighter uppercase">XSS Mitigation</h3>
            <p class="text-sm font-black opacity-60 leading-relaxed">
              Kami menerapkan sanitasi ketat pada setiap input pengguna untuk mencegah serangan Cross-Site Scripting (XSS), memastikan tidak ada skrip berbahaya yang dapat dieksekusi.
            </p>
            <div class="badge badge-outline border-primary/20 text-[9px] font-black tracking-widest p-3 text-primary uppercase">Strict Sanitization</div>
          </div>

          <div class="zenshin-glass p-8 rounded-[2.5rem] border-none shadow-xl space-y-4 group">
            <div class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-content">
              <Icon icon="ph:file-code-duotone" class="text-2xl" />
            </div>
            <h3 class="text-xl font-black tracking-tighter uppercase">Clear-Text Transparency</h3>
            <p class="text-sm font-black opacity-60 leading-relaxed">
              Anda dapat memeriksa data Anda kapan saja melalui Developer Tools. Kami menggunakan format JSON transparan agar Anda tahu persis apa yang disimpan di perangkat Anda.
            </p>
            <div class="badge badge-outline border-primary/20 text-[9px] font-black tracking-widest p-3 text-primary uppercase">Open Data Structure</div>
          </div>
        </div>

        <section class="zenshin-glass rounded-[3rem] p-8 md:p-12 border-none shadow-2xl relative overflow-hidden">
           <h2 class="text-2xl font-black tracking-tighter uppercase mb-8 flex items-center gap-3">
             <Icon icon="ph:terminal-window-duotone" class="text-primary text-2xl" /> Environment Status
           </h2>
           <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
             <div v-for="spec in specs" :key="spec.label" class="space-y-1">
               <p class="text-[9px] font-black opacity-30 uppercase tracking-widest">{{ spec.label }}</p>
               <p class="text-sm font-black text-base-content uppercase tracking-tight">{{ spec.value }}</p>
             </div>
           </div>
        </section>

        <div class="text-center">
          <router-link to="/" class="btn btn-ghost btn-sm rounded-xl font-black gap-2 opacity-40 hover:opacity-100 uppercase tracking-widest text-[10px]">
            <Icon icon="ph:arrow-left-bold" /> Kembali ke Beranda
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

const specs = [
  { label: 'Database', value: 'LocalStorage' },
  { label: 'Auth Method', value: 'Session-Less' },
  { label: 'Encryption', value: 'In-Browser' },
  { label: 'Analytics', value: 'None' }
]
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.zenshin-glass {
  background-color: color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 85%, transparent);
  backdrop-filter: blur(20px);
}

h1, h2, h3, p, code {
  color: var(--fallback-bc, oklch(var(--bc)));
}

code {
  background-color: color-mix(in srgb, var(--fallback-bc, oklch(var(--bc))) 10%, transparent);
  padding: 0.125rem 0.375rem;
  border-radius: 0.4rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 11px;
}
</style>
<template>
  <div class="min-h-screen flex flex-col bg-base-100 transition-colors duration-500">
    <PublicNavbar />

    <main class="flex-grow pt-32 pb-20 px-6">
      <div class="max-w-4xl mx-auto space-y-12">
        
        <section class="text-center space-y-4 animate-fade-in">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/5 border border-success/10 text-success text-[10px] font-black tracking-[0.3em] uppercase mb-4">
            <i class="fa-solid fa-user-shield"></i> Trusted Environment
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-none text-base-content">
            Kebijakan <span class="text-primary italic">Privasi.</span>
          </h1>
          <p class="text-xs font-black opacity-40 uppercase tracking-[0.4em]">Terakhir diperbarui: Februari 2026</p>
        </section>

        <section class="zenshin-glass rounded-[3rem] p-8 md:p-16 border-none shadow-2xl space-y-12 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
            <i class="fa-solid fa-vault text-[15rem]"></i>
          </div>

          <div class="space-y-4 relative">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <i class="fa-solid fa-database"></i>
              </div>
              <h2 class="text-2xl font-black tracking-tighter uppercase">Penyimpanan Lokal</h2>
            </div>
            <p class="font-black opacity-70 leading-relaxed tracking-tight">
              Zenshin Core beroperasi dengan prinsip <strong>Local-First</strong>. Seluruh data yang Anda masukkan—termasuk daftar tugas, jadwal kuliah/agenda, dan nama profil—disimpan sepenuhnya di dalam storage browser perangkat Anda. Kami tidak memiliki server database terpusat untuk menyimpan informasi pribadi Anda.
            </p>
          </div>

          <div class="space-y-4 relative">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <i class="fa-solid fa-eye-slash"></i>
              </div>
              <h2 class="text-2xl font-black tracking-tighter uppercase">Tanpa Pelacakan</h2>
            </div>
            <p class="font-black opacity-70 leading-relaxed tracking-tight">
              Kami tidak menggunakan tracker pihak ketiga, algoritma analitik yang mengidentifikasi user, atau skrip iklan. Aktivitas produktivitas Anda adalah privasi Anda sepenuhnya.
            </p>
          </div>

          <div class="space-y-4 relative">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <i class="fa-solid fa-file-export"></i>
              </div>
              <h2 class="text-2xl font-black tracking-tighter uppercase">Kendali Penuh</h2>
            </div>
            <p class="font-black opacity-70 leading-relaxed tracking-tight">
              Anda memiliki kendali 100% atas data Anda. Anda dapat mengekspor seluruh data ke format <strong>.json</strong> kapan saja melalui menu pengaturan, atau menghapus seluruh environment secara permanen melalui fitur "Nuke System".
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-warning/5 border border-warning/20 flex gap-4 items-start">
            <i class="fa-solid fa-circle-exclamation text-warning mt-1"></i>
            <div>
              <p class="text-[11px] font-black uppercase tracking-widest text-warning mb-1">Penting untuk Diketahui</p>
              <p class="text-xs font-bold opacity-70 leading-relaxed">
                Karena data disimpan secara lokal, menghapus cache browser atau menghapus data situs secara manual melalui pengaturan browser dapat menyebabkan data Zenshin Anda hilang. Pastikan untuk melakukan ekspor data secara berkala.
              </p>
            </div>
          </div>
        </section>

        <div class="text-center">
          <router-link to="/" class="btn btn-ghost btn-sm rounded-xl font-black gap-2 opacity-40 hover:opacity-100 uppercase tracking-widest text-[10px]">
            <i class="fa-solid fa-arrow-left"></i> Kembali ke Beranda
          </router-link>
        </div>
      </div>
    </main>

    <PublicFooter />
  </div>
</template>

<script setup>
import PublicNavbar from '@/components/layout/PublicNavbar.vue'
import PublicFooter from '@/components/layout/PublicFooter.vue'
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

/* Memastikan teks tetap tajam */
h1, h2, p, li {
  color: var(--fallback-bc, oklch(var(--bc)));
}
</style>
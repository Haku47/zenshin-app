<template>
  <div class="min-h-screen flex flex-col bg-base-100 transition-colors duration-500">
    <PublicNavbar />

    <main class="flex-grow pt-32 pb-20 px-6">
      <div class="max-w-4xl mx-auto space-y-12">
        
        <section class="text-center space-y-4 animate-fade-in">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4">
            <i class="fa-solid fa-file-contract"></i> Compliance & Usage
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-none text-base-content">
            Syarat & <span class="text-primary italic">Ketentuan.</span>
          </h1>
          <p class="text-xs font-black opacity-40 uppercase tracking-[0.4em]">Versi 1.0.4 • Efektif 2026</p>
        </section>

        <section class="zenshin-glass rounded-[3rem] p-8 md:p-16 border-none shadow-2xl space-y-12 relative overflow-hidden">
          
          <div class="space-y-4 relative">
            <h2 class="text-2xl font-black tracking-tighter uppercase flex items-center gap-3">
              <span class="text-primary">01.</span> Penerimaan Layanan
            </h2>
            <p class="font-black opacity-70 leading-relaxed tracking-tight">
              Dengan mengakses portal Zenshin Core, Anda menyetujui untuk menggunakan sistem ini sebagai alat bantu produktivitas pribadi. Sistem ini disediakan "apa adanya" (as-is) tanpa jaminan sinkronisasi cloud pihak ketiga karena prinsip kedaulatan data lokal yang kami terapkan.
            </p>
          </div>

          <div class="space-y-4 relative">
            <h2 class="text-2xl font-black tracking-tighter uppercase flex items-center gap-3">
              <span class="text-primary">02.</span> Tanggung Jawab Data
            </h2>
            <p class="font-black opacity-70 leading-relaxed tracking-tight text-base-content">
              Zenshin Core tidak bertanggung jawab atas hilangnya data yang disebabkan oleh pembersihan cache browser, kerusakan perangkat keras, atau penghapusan data situs oleh pengguna. Pengguna bertanggung jawab penuh untuk melakukan <strong>Archive Export (.json)</strong> secara mandiri melalui menu Konfigurasi secara berkala.
            </p>
          </div>

          <div class="space-y-4 relative">
            <h2 class="text-2xl font-black tracking-tighter uppercase flex items-center gap-3">
              <span class="text-primary">03.</span> Batasan Penggunaan
            </h2>
            <p class="font-black opacity-70 leading-relaxed tracking-tight">
              Anda dilarang memodifikasi core engine Zenshin untuk tujuan berbahaya, mendistribusikan ulang kode sumber tanpa izin tertulis, atau mengeksploitasi sistem penyimpanan lokal untuk menyimpan konten ilegal yang melanggar hukum setempat.
            </p>
          </div>

          <div class="space-y-4 relative">
            <h2 class="text-2xl font-black tracking-tighter uppercase flex items-center gap-3">
              <span class="text-primary">04.</span> Modifikasi Layanan
            </h2>
            <p class="font-black opacity-70 leading-relaxed tracking-tight">
              Kami berhak memperbarui struktur database atau fitur core kapan saja untuk meningkatkan efisiensi sistem. Perubahan besar yang berpotensi mempengaruhi data lokal akan diinformasikan melalui log perubahan (Changelog) pada dashboard utama.
            </p>
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

h1, h2, p {
  color: var(--fallback-bc, oklch(var(--bc)));
}
</style>
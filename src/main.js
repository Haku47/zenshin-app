import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 1. Import CSS Utama (Tailwind v4 & DaisyUI)
// Pastikan ini di-load paling awal agar variabel CSS tersedia
import './assets/css/tailwind.css'

// 2. Import Font Inter
import "@fontsource/inter/400.css"
import "@fontsource/inter/700.css"

// 3. Import Core Components & Router
import App from './App.vue'
import router from './router'

// --- INISIALISASI TEMA DEFAULT GELAP ---
// Mengambil tema tersimpan atau menggunakan 'night' sebagai default permanen
const savedTheme = localStorage.getItem('zenshin_theme') || 'night'
document.documentElement.setAttribute('data-theme', savedTheme)

// Jika belum ada data di localStorage, kita set agar sinkron ke depannya
if (!localStorage.getItem('zenshin_theme')) {
  localStorage.setItem('zenshin_theme', 'night')
}

// 4. Inisialisasi App
const app = createApp(App)

// 5. Registrasi Plugin
// Pinia diinisialisasi lebih dulu untuk menangani state data tugas/jadwal
const pinia = createPinia()
app.use(pinia)
app.use(router)

// 6. Mounting
// Aplikasi ditempelkan ke elemen #app di index.html
app.mount('#app')
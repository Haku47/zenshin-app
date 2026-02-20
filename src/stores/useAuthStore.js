import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    /**
     * Mengambil data user dari localStorage jika sesi masih aktif.
     * Struktur: { name: string, email: string, avatar: string }
     */
    user: JSON.parse(localStorage.getItem('zenshin_auth_user')) || null,
    isLoggedIn: !!localStorage.getItem('zenshin_auth_user'),
    loading: false
  }),

  getters: {
    /**
     * Mendapatkan inisial nama untuk avatar fallback
     */
    userInitial: (state) => {
      if (!state.user || !state.user.name) return 'U'
      return state.user.name.substring(0, 2).toUpperCase()
    }
  },

  actions: {
    /**
     * Aksi Registrasi: Membuat environment baru.
     * Nama disimpan ke sistem profil umum agar Sidebar langsung update.
     */
    async register(name, email, password) {
      this.loading = true
      try {
        // Simulasi network latency
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const userData = { 
          name, 
          email, 
          avatar: localStorage.getItem('zenshin_avatar') || '' 
        }

        this.user = userData
        this.isLoggedIn = true

        // Persistensi Data
        localStorage.setItem('zenshin_auth_user', JSON.stringify(userData))
        localStorage.setItem('zenshin_username', name) // Sinkron ke Sidebar/Navbar
        
        // Memicu event storage agar komponen lain update instan
        window.dispatchEvent(new Event('storage'))
        
        return true
      } finally {
        this.loading = false
      }
    },

    /**
     * Aksi Login: Memvalidasi sesi dan memulihkan profil.
     */
    async login(email, password) {
      this.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Simulasi pengambilan nama dari data lokal yang sudah ada
        const savedName = localStorage.getItem('zenshin_username') || email.split('@')[0]
        const userData = { 
          name: savedName, 
          email, 
          avatar: localStorage.getItem('zenshin_avatar') || '' 
        }

        this.user = userData
        this.isLoggedIn = true

        localStorage.setItem('zenshin_auth_user', JSON.stringify(userData))
        
        window.dispatchEvent(new Event('storage'))
        return true
      } finally {
        this.loading = false
      }
    },

    /**
     * Aksi Logout: Memutus sesi tanpa menghapus data tugas/agenda.
     */
    logout() {
      this.user = null
      this.isLoggedIn = false
      localStorage.removeItem('zenshin_auth_user')
      
      // Redirect atau feedback dilakukan di level komponen (UI)
      window.dispatchEvent(new Event('storage'))
    },

    /**
     * Sinkronisasi Manual: Digunakan jika user mengubah profil di halaman Settings.
     */
    syncProfile() {
      const name = localStorage.getItem('zenshin_username') || 'User'
      const avatar = localStorage.getItem('zenshin_avatar') || ''
      
      if (this.user) {
        this.user.name = name
        this.user.avatar = avatar
        localStorage.setItem('zenshin_auth_user', JSON.stringify(this.user))
      }
    }
  }
})
import { defineStore } from 'pinia'

export const useScheduleStore = defineStore('scheduleStore', {
  state: () => ({
    /**
     * Database Agenda Harian Zenshin.
     * State dikosongkan agar pengguna bisa membangun environment sendiri.
     */
    schedules: JSON.parse(localStorage.getItem('zenshin_schedules')) || {
      'Senin': [],
      'Selasa': [],
      'Rabu': [],
      'Kamis': [],
      'Jumat': [],
      'Sabtu': [],
      'Minggu': []
    }
  }),

  getters: {
    /**
     * Mendeteksi nama hari saat ini dalam Bahasa Indonesia.
     * Digunakan untuk label di Dashboard dan ScheduleView.
     */
    currentDay: () => {
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
      return days[new Date().getDay()]
    },

    /**
     * Mengambil daftar agenda khusus untuk hari ini.
     * Jika hari ini Minggu dan jadwal kosong, Dashboard akan tetap aman (render array kosong).
     */
    todaySchedules: (state) => {
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
      const day = days[new Date().getDay()]
      return state.schedules[day] || []
    },

    /**
     * Menghitung total seluruh agenda yang direncanakan dalam satu minggu.
     */
    totalCourses: (state) => {
      return Object.values(state.schedules).flat().length
    }
  },

  actions: {
    /**
     * Menambah agenda baru ke hari tertentu.
     * @param {String} day - Nama hari (e.g., 'Senin')
     * @param {Object} course - Object berisi {timeStart, timeEnd, subject, lecturer, room}
     */
    addSchedule(day, course) {
      if (this.schedules[day]) {
        this.schedules[day].push({
          id: Date.now(), // Unique ID untuk keperluan key render
          ...course
        })
        
        // Auto-Sort: Memastikan agenda yang paling pagi selalu berada di urutan atas
        this.schedules[day].sort((a, b) => a.timeStart.localeCompare(b.timeStart))
        
        this.saveToLocalStorage()
      }
    },

    /**
     * Menghapus agenda berdasarkan index pada array hari tersebut.
     */
    removeSchedule(day, index) {
      if (this.schedules[day]) {
        this.schedules[day].splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    /**
     * Menyimpan state saat ini ke LocalStorage browser.
     */
    saveToLocalStorage() {
      localStorage.setItem('zenshin_schedules', JSON.stringify(this.schedules))
    },

    /**
     * Membersihkan seluruh agenda dari semua hari.
     */
    clearAllSchedules() {
      this.schedules = { 
        'Senin': [], 'Selasa': [], 'Rabu': [], 'Kamis': [], 
        'Jumat': [], 'Sabtu': [], 'Minggu': [] 
      }
      this.saveToLocalStorage()
    }
  }
})
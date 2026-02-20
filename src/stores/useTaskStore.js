import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  // State: Database lokal untuk tugas-tugas personal Anda
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('zenshin_tasks')) || [],
    loading: false
  }),

  // Getters: Kalkulasi progres secara real-time
  getters: {
    totalTugas: (state) => state.tasks.length,
    tugasSelesai: (state) => state.tasks.filter(t => t.done).length,
    tugasBelumSelesai: (state) => state.tasks.filter(t => !t.done).length,
    
    // Getter tambahan untuk mendapatkan persentase progres harian
    progressPercentage: (state) => {
      if (state.tasks.length === 0) return 0
      return Math.round((state.tasks.filter(t => t.done).length / state.tasks.length) * 100)
    }
  },

  // Actions: Engine untuk memanipulasi list tugas
  actions: {
    // Menambah tugas baru ke urutan paling atas (Unshift)
    addTask(content) {
      if (!content.trim()) return

      const newTask = {
        id: Date.now(),
        text: content,
        done: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      this.tasks.unshift(newTask)
      this.saveToLocalStorage()
    },

    // Menghapus tugas berdasarkan ID kustom
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.saveToLocalStorage()
    },

    // Toggle status tugas dengan efek pengurutan (Selesai pindah ke bawah)
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        task.done = !task.done
        task.updatedAt = new Date().toISOString()
        
        // Opsional: Urutkan agar yang selesai otomatis turun ke bawah
        this.sortTasks()
        this.saveToLocalStorage()
      }
    },

    // Update konten tugas
    updateTaskText(id, newText) {
      const task = this.tasks.find(t => t.id === id)
      if (task && newText.trim()) {
        task.text = newText
        task.updatedAt = new Date().toISOString()
        this.saveToLocalStorage()
      }
    },

    // Membersihkan semua tugas yang sudah berstatus 'done'
    clearCompleted() {
      this.tasks = this.tasks.filter(t => !t.done)
      this.saveToLocalStorage()
    },

    // Helper: Mengurutkan tugas (Belum selesai > Selesai)
    sortTasks() {
      this.tasks.sort((a, b) => {
        if (a.done === b.done) return b.id - a.id // Jika status sama, urutkan berdasarkan waktu buat terbaru
        return a.done ? 1 : -1 // Yang sudah 'done' pindah ke bawah
      })
    },

    // Sinkronisasi permanen ke Local Storage
    saveToLocalStorage() {
      localStorage.setItem('zenshin_tasks', JSON.stringify(this.tasks))
    }
  }
})
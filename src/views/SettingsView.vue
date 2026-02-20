<template>
  <div class="max-w-4xl mx-auto space-y-6 md:space-y-10 pb-20 font-sans transition-all duration-500">
    <section class="animate-fade-in px-4">
      <div class="flex items-center gap-3 md:gap-4 mb-2">
        <div class="flex items-center gap-2">
          <h1 class="text-3xl md:text-4xl font-black tracking-tighter text-primary">設定</h1>
          <span class="text-3xl md:text-4xl font-bold tracking-tight opacity-20 uppercase text-base-content">Settings</span>
        </div>
        <Icon icon="ph:sliders-horizontal-duotone" class="text-primary opacity-20 text-2xl md:text-3xl" />
      </div>
      <p class="text-base-content opacity-60 font-bold tracking-tight text-sm md:text-base">Konfigurasi sistem dan manajemen environment Zenshin Anda.</p>
    </section>

    <section class="zenshin-glass rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden border-none mx-2 md:mx-0">
      <div class="card-body p-6 md:p-12">
        <div class="flex items-center gap-3 mb-6 md:mb-8">
          <Icon icon="ph:identification-card-duotone" class="text-primary text-xl md:text-2xl" />
          <h2 class="text-lg md:text-xl font-black tracking-tighter uppercase text-base-content">Identitas Pengguna</h2>
        </div>

        <div class="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          <div class="flex flex-col items-center gap-4 md:gap-6 shrink-0">
            <div class="avatar group relative">
              <div class="w-28 h-28 md:w-32 md:h-32 rounded-[1.5rem] md:rounded-[2rem] ring-4 ring-primary/20 ring-offset-4 ring-offset-base-200 overflow-hidden bg-base-300 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <img v-if="profileData.avatar" :src="profileData.avatar" class="object-cover w-full h-full" />
                <div v-else class="flex items-center justify-center h-full text-4xl md:text-5xl font-black opacity-10 text-base-content">前</div>
                
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Icon icon="ph:camera-duotone" class="text-white text-3xl" />
                </div>
              </div>
            </div>
            <label class="btn btn-primary btn-sm px-6 md:px-8 rounded-xl font-black tracking-widest shadow-lg shadow-primary/20 text-[10px]">
              <Icon icon="ph:upload-simple-bold" class="mr-2" /> UBAH FOTO
              <input type="file" @change="handleAvatarUpload" accept="image/*" class="hidden" />
            </label>
          </div>

          <div class="form-control w-full space-y-6">
            <div class="relative">
              <label class="label pt-0"><span class="label-text font-black opacity-50 uppercase text-[9px] md:text-[10px] tracking-[0.2em] text-base-content">Display Name</span></label>
              <div class="relative">
                <Icon icon="ph:user-duotone" class="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 text-base-content text-xl" />
                <input 
                  v-model="profileData.name" 
                  type="text" 
                  placeholder="Masukkan nama Anda" 
                  class="input input-bordered w-full pl-12 font-black text-base md:text-lg focus:ring-4 focus:ring-primary/10 transition-all rounded-2xl bg-base-100/30 border-none text-base-content" 
                />
              </div>
              <p class="text-[9px] md:text-[10px] mt-3 opacity-30 font-bold uppercase tracking-widest italic text-base-content">Data ini hanya tersimpan di browser Anda.</p>
            </div>
            <button @click="saveProfile" class="btn btn-primary w-full md:w-fit px-12 rounded-xl font-black shadow-xl shadow-primary/10 border-none uppercase tracking-widest text-[10px]">
              SIMPAN PERUBAHAN
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="zenshin-glass rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-none mx-2 md:mx-0">
      <div class="card-body p-6 md:p-12">
        <div class="flex items-center gap-3 mb-8 md:mb-10">
          <Icon icon="ph:database-duotone" class="text-warning text-xl md:text-2xl" />
          <h2 class="text-lg md:text-xl font-black tracking-tighter uppercase text-base-content">Sistem & Database</h2>
        </div>
        
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row items-center sm:items-center justify-between p-5 md:p-6 bg-base-content/5 rounded-3xl border border-base-content/5 gap-6">
            <div class="flex items-center gap-4 w-full">
              <div class="w-12 h-12 rounded-2xl bg-base-100/50 flex items-center justify-center text-primary shadow-inner shrink-0">
                <Icon icon="ph:file-arrow-down-duotone" class="text-2xl" />
              </div>
              <div class="min-w-0">
                <p class="font-black text-base-content uppercase text-[10px] md:text-xs tracking-widest">Archive System</p>
                <p class="text-[10px] md:text-xs opacity-50 font-bold tracking-tight text-base-content truncate">Ekspor data ke format portabel (.json)</p>
              </div>
            </div>
            <button @click="exportData" class="btn btn-ghost bg-base-100/50 hover:bg-primary hover:text-white w-full sm:w-auto btn-sm px-8 rounded-xl font-black transition-all border-none uppercase tracking-widest text-[10px]">
              EXPORT
            </button>
          </div>

          <div class="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-error/5 border border-error/10 space-y-6">
            <div class="flex items-center justify-center md:justify-start gap-3 text-error">
              <Icon icon="ph:warning-duotone" class="animate-pulse text-xl md:text-2xl" />
              <p class="font-black text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em]">Critical Environment Zone</p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              <button @click="confirmErase" class="btn btn-outline btn-error btn-sm font-black rounded-xl border-2 uppercase text-[9px] md:text-[10px]">
                <Icon icon="ph:eraser-duotone" class="text-sm" /> Clear Tasks
              </button>
              <button @click="clearSchedules" class="btn btn-outline btn-error btn-sm font-black rounded-xl border-2 uppercase text-[9px] md:text-[10px]">
                <Icon icon="ph:calendar-minus-duotone" class="text-sm" /> Clear Agenda
              </button>
              <button @click="confirmNuke" class="btn btn-error btn-sm font-black rounded-xl shadow-lg shadow-error/20 uppercase text-[9px] md:text-[10px] border-none">
                <Icon icon="ph:skull-duotone" class="text-sm" /> Nuke System
              </button>
            </div>
            <p class="text-[8px] md:text-[9px] opacity-30 uppercase tracking-[0.2em] md:tracking-[0.3em] text-center font-black italic text-base-content">Tindakan ini akan menghapus data permanen dari storage lokal.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useScheduleStore } from '@/stores/useScheduleStore'

const taskStore = useTaskStore()
const scheduleStore = useScheduleStore()

const profileData = reactive({
  name: localStorage.getItem('zenshin_username') || 'User',
  avatar: localStorage.getItem('zenshin_avatar') || ''
})

const handleAvatarUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    if (file.size > 1024 * 1024) {
      alert('File terlalu besar! Max 1MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      profileData.avatar = event.target.result
      localStorage.setItem('zenshin_avatar', event.target.result)
      window.dispatchEvent(new Event('storage'))
    }
    reader.readAsDataURL(file)
  }
}

const saveProfile = () => {
  localStorage.setItem('zenshin_username', profileData.name)
  window.dispatchEvent(new Event('storage'))
  alert('Environment updated successfully!')
}

const exportData = () => {
  const data = {
    build: "1.0.4",
    user: profileData.name,
    tasks: taskStore.tasks,
    schedules: scheduleStore.schedules,
    timestamp: new Date().toISOString()
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `zenshin_archive_${Date.now()}.json`
  a.click()
}

const confirmErase = () => {
  if (confirm('Hapus semua tugas? Data profil tetap aman.')) {
    taskStore.tasks = []
    taskStore.saveToLocalStorage()
    alert('Task history cleared.')
  }
}

const clearSchedules = () => {
  if (confirm('Hapus seluruh agenda mingguan?')) {
    scheduleStore.clearAllSchedules()
    alert('Agenda harian telah dikosongkan.')
  }
}

const confirmNuke = () => {
  if (confirm('TERMINATE SYSTEM: Hapus TOTAL seluruh data aplikasi?')) {
    localStorage.clear()
    window.location.href = '/'
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
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
<template>
  <div class="max-w-6xl mx-auto space-y-6 md:space-y-8 pb-20 font-sans transition-all duration-500">
    <section class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2">
      <div class="animate-fade-in">
        <h1 class="text-3xl md:text-4xl font-black tracking-tighter flex items-center gap-3 text-base-content leading-none">
          <Icon icon="ph:calendar-duotone" class="text-primary text-3xl md:text-4xl" />
          Agenda Harian
        </h1>
        <p class="opacity-60 font-bold mt-2 tracking-tight text-base-content text-sm md:text-base">Kelola rutinitas dan rencana environment pribadi Anda.</p>
      </div>
      <button @click="openModal" class="btn btn-primary w-full md:w-auto shadow-xl shadow-primary/20 px-8 font-black rounded-xl border-none text-xs md:text-sm">
        <Icon icon="ph:plus-circle-duotone" class="text-xl" />
        TAMBAH AGENDA
      </button>
    </section>

    <div class="zenshin-glass p-1.5 md:p-2 overflow-x-auto flex flex-nowrap gap-1.5 md:gap-2 rounded-2xl shadow-lg border-none scrollbar-hide">
      <button 
        v-for="day in days" 
        :key="day"
        @click="activeDay = day"
        :class="[
          'tab flex-1 md:flex-none min-w-[100px] md:px-10 h-11 md:h-12 rounded-xl transition-all font-black text-[10px] md:text-xs uppercase tracking-widest border-none shrink-0', 
          activeDay === day 
            ? 'bg-primary text-primary-content shadow-lg' 
            : 'hover:bg-base-content/10 opacity-50 text-base-content'
        ]"
      >
        {{ day }}
      </button>
    </div>

    <div class="space-y-4 px-1 md:px-0">
      <div v-if="scheduleStore.schedules[activeDay].length === 0" class="zenshin-glass border-none py-20 md:py-28 text-center rounded-[2.5rem] md:rounded-[3rem] shadow-inner">
        <div class="flex flex-col items-center gap-4 opacity-20 text-base-content px-6">
          <Icon icon="ph:calendar-x-duotone" class="text-6xl md:text-7xl" />
          <p class="italic font-black text-lg md:text-xl tracking-tighter uppercase text-center">No Plan for {{ activeDay }}</p>
        </div>
      </div>

      <div 
        v-for="(item, index) in scheduleStore.schedules[activeDay]" 
        :key="index"
        class="zenshin-glass flex flex-col md:flex-row items-start md:items-center justify-between p-5 md:p-6 rounded-[2rem] md:rounded-3xl shadow-xl hover:bg-base-content/5 transition-all group border-none relative overflow-hidden gap-6"
      >
        <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-primary transition-all group-hover:w-2 md:group-hover:w-3"></div>
        
        <div class="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 lg:gap-20 flex-grow pl-3 md:pl-4 w-full">
          <div class="min-w-0 md:min-w-[140px]">
            <p class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 mb-1 text-base-content">Durasi</p>
            <div class="flex items-center gap-2 font-mono font-black text-primary text-base md:text-lg">
              <Icon icon="ph:clock-duotone" class="text-sm shrink-0" />
              {{ item.timeStart }} — {{ item.timeEnd }}
            </div>
          </div>

          <div class="min-w-0 md:min-w-[200px] lg:min-w-[240px] w-full">
            <p class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 mb-1 text-base-content">Aktivitas</p>
            <p class="font-black text-lg md:text-xl tracking-tighter leading-tight text-base-content break-words">{{ item.subject }}</p>
            <p class="text-[10px] md:text-xs font-bold opacity-50 mt-1.5 flex items-center gap-2 italic text-base-content">
              <Icon icon="ph:note-duotone" class="text-[10px] shrink-0" />
              {{ item.lecturer || 'Personal Plan' }}
            </p>
          </div>

          <div class="w-full md:w-auto">
            <p class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 mb-1 text-base-content">Platform / Lokasi</p>
            <div class="badge zenshin-glass border-none font-black text-[9px] md:text-[10px] px-3 md:px-4 py-3 gap-2 text-base-content max-w-full">
              <Icon icon="ph:map-pin-line-duotone" class="text-primary shrink-0" />
              <span class="truncate">{{ item.room }}</span>
            </div>
          </div>
        </div>

        <button @click="scheduleStore.removeSchedule(activeDay, index)" class="btn btn-ghost btn-circle btn-sm text-error md:opacity-0 group-hover:opacity-100 transition-all hover:bg-error/10 self-end md:self-center">
          <Icon icon="ph:trash-duotone" class="text-lg md:text-xl" />
        </button>
      </div>
    </div>

    <dialog id="schedule_modal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box zenshin-glass border-none rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 md:p-10 shadow-2xl overflow-hidden max-w-2xl">
        <h3 class="font-black text-xl md:text-2xl mb-6 md:mb-8 tracking-tighter flex items-center gap-3 text-base-content">
          <Icon icon="ph:calendar-plus-duotone" class="text-primary text-2xl md:text-3xl" />
          Buat Agenda Baru
        </h3>
        
        <form @submit.prevent="handleSubmit" class="space-y-4 md:space-y-6">
          <div class="grid grid-cols-2 gap-3 md:gap-4">
            <div class="form-control">
              <label class="label"><span class="label-text font-black opacity-60 uppercase text-[9px] md:text-[10px] tracking-widest text-base-content">Mulai</span></label>
              <input v-model="newCourse.timeStart" type="time" class="input input-bordered bg-base-100/30 border-none font-bold focus:ring-4 focus:ring-primary/10 rounded-xl text-base-content text-sm" required />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text font-black opacity-60 uppercase text-[9px] md:text-[10px] tracking-widest text-base-content">Selesai</span></label>
              <input v-model="newCourse.timeEnd" type="time" class="input input-bordered bg-base-100/30 border-none font-bold focus:ring-4 focus:ring-primary/10 rounded-xl text-base-content text-sm" required />
            </div>
          </div>
          
          <div class="form-control">
            <label class="label"><span class="label-text font-black opacity-60 uppercase text-[9px] md:text-[10px] tracking-widest text-base-content">Nama Aktivitas</span></label>
            <input v-model="newCourse.subject" type="text" placeholder="e.g. Focus Coding / Training" class="input input-bordered bg-base-100/30 border-none font-bold focus:ring-4 focus:ring-primary/10 rounded-xl text-base-content text-sm" required />
          </div>
          
          <div class="form-control">
            <label class="label"><span class="label-text font-black opacity-60 uppercase text-[9px] md:text-[10px] tracking-widest text-base-content">Keterangan</span></label>
            <input v-model="newCourse.lecturer" type="text" placeholder="Partner atau catatan singkat" class="input input-bordered bg-base-100/30 border-none font-bold focus:ring-4 focus:ring-primary/10 rounded-xl text-base-content text-sm" />
          </div>
          
          <div class="form-control">
            <label class="label"><span class="label-text font-black opacity-60 uppercase text-[9px] md:text-[10px] tracking-widest text-base-content">Tempat / Platform</span></label>
            <input v-model="newCourse.room" type="text" placeholder="e.g. Kamar / Discord / Gym" class="input input-bordered bg-base-100/30 border-none font-bold focus:ring-4 focus:ring-primary/10 rounded-xl text-base-content text-sm" required />
          </div>

          <div class="modal-action flex-col sm:flex-row gap-3 mt-8 md:mt-10">
            <button type="button" @click="closeModal" class="btn btn-ghost font-black px-8 text-base-content order-2 sm:order-1">BATAL</button>
            <button type="submit" class="btn btn-primary flex-grow sm:flex-none px-10 font-black shadow-lg shadow-primary/20 rounded-xl border-none uppercase tracking-widest text-[10px] order-1 sm:order-2">SIMPAN AGENDA</button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop bg-base-100/60 backdrop-blur-sm">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { useScheduleStore } from '@/stores/useScheduleStore'

const scheduleStore = useScheduleStore()
const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
const activeDay = ref('Senin')

const newCourse = reactive({
  timeStart: '',
  timeEnd: '',
  subject: '',
  lecturer: '',
  room: ''
})

const openModal = () => document.getElementById('schedule_modal').showModal()
const closeModal = () => document.getElementById('schedule_modal').close()

const handleSubmit = () => {
  scheduleStore.addSchedule(activeDay.value, { ...newCourse })
  Object.keys(newCourse).forEach(key => newCourse[key] = '')
  closeModal()
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

/* Hide scrollbar for days navigation on mobile */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
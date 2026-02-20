<template>
  <div class="space-y-6 md:space-y-8 font-sans transition-all duration-500 pb-10">
    <section class="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
      <div class="animate-fade-in">
        <h1 class="text-3xl md:text-4xl font-black tracking-tighter flex items-center flex-wrap gap-2 md:gap-3 text-base-content leading-none">
          Okaeri, <span class="text-primary">{{ userName }}</span> 
          <Icon icon="ph:sparkle-duotone" class="text-warning text-2xl animate-pulse" />
        </h1>
        <p class="opacity-60 font-bold mt-2 text-base-content flex items-center gap-2 text-xs md:text-sm">
          <Icon icon="ph:calendar-check-duotone" class="text-lg text-primary shrink-0" />
          <span class="leading-tight">
            {{ isSunday ? 'Waktunya reset energi sebelum minggu baru dimulai.' : 'Satu langkah lebih dekat ke tujuan hari ini.' }}
          </span>
        </p>
      </div>
      
      <div class="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
        <div class="badge badge-primary badge-outline font-black px-4 py-4 tracking-widest gap-2 rounded-xl text-[9px] md:text-[10px] shrink-0">
          <Icon icon="ph:shield-check-duotone" class="text-xs" /> PERSONAL
        </div>
        <div class="badge badge-secondary badge-outline font-black px-4 py-4 tracking-widest gap-2 rounded-xl text-[9px] md:text-[10px] shrink-0">
          <Icon icon="ph:code-duotone" class="text-xs" /> DEVELOPER
        </div>
      </div>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div class="stats zenshin-glass shadow-xl overflow-hidden border-none group transition-all hover:scale-[1.02]">
        <div class="stat p-4 md:p-6">
          <div class="stat-figure text-primary opacity-30 group-hover:opacity-100 transition-opacity">
            <Icon icon="ph:list-checks-duotone" class="text-3xl md:text-4xl" />
          </div>
          <div class="stat-title font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-50 text-base-content">Total Task</div>
          <div class="stat-value text-primary tracking-tighter text-2xl md:text-3xl">{{ taskStore.totalTugas }}</div>
          <div class="stat-desc font-bold opacity-40 uppercase text-[8px] md:text-[9px] text-base-content">Local Storage Sync</div>
        </div>
      </div>
      
      <div class="stats zenshin-glass shadow-xl overflow-hidden border-none group transition-all hover:scale-[1.02]">
        <div class="stat p-4 md:p-6">
          <div class="stat-figure text-success opacity-30 group-hover:opacity-100 transition-opacity">
            <Icon icon="ph:check-circle-duotone" class="text-3xl md:text-4xl" />
          </div>
          <div class="stat-title font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-50 text-base-content">Completed</div>
          <div class="stat-value text-success tracking-tighter text-2xl md:text-3xl">{{ taskStore.tugasSelesai }}</div>
          <div class="stat-desc font-bold opacity-40 uppercase text-[8px] md:text-[9px] text-base-content">Consistency is Key</div>
        </div>
      </div>

      <div class="stats zenshin-glass shadow-xl overflow-hidden border-none group transition-all hover:scale-[1.02] sm:col-span-2 md:col-span-1">
        <div class="stat p-4 md:p-6">
          <div class="stat-figure text-secondary opacity-30 group-hover:opacity-100 transition-opacity">
            <Icon icon="ph:clock-duotone" class="text-3xl md:text-4xl" />
          </div>
          <div class="stat-title font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-50 text-base-content">Local Time</div>
          <div class="stat-value text-secondary font-mono tracking-tighter text-2xl md:text-3xl">{{ currentTime }}</div>
          <div class="stat-desc font-bold opacity-40 uppercase text-[8px] md:text-[9px] text-base-content">Malang, Indonesia</div>
        </div>
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      
      <BaseCard class="zenshin-glass shadow-2xl border-none p-1 md:p-2 overflow-hidden">
        <template #title>
          <div class="flex items-center gap-2">
            <Icon icon="ph:intersect-square-duotone" class="text-primary text-xl" />
            <span class="font-black tracking-tight uppercase text-xs md:text-sm tracking-[0.1em] text-base-content">Quick Tasks</span>
          </div>
        </template>
        <template #actions-top>
          <router-link to="/tasks" class="btn btn-ghost btn-xs text-primary font-black gap-1 hover:bg-primary/10 rounded-lg transition-all text-[10px] md:text-xs">
            MANAGE <Icon icon="ph:arrow-right-bold" />
          </router-link>
        </template>
        
        <div v-if="taskStore.tasks.length === 0" class="text-center py-10 md:py-12">
          <Icon icon="ph:coffee-duotone" class="mx-auto opacity-10 text-4xl md:text-5xl mb-3" />
          <p class="opacity-30 italic font-bold text-xs md:text-sm text-base-content px-4">Semua rencana sudah tercapai.</p>
        </div>
        
        <div v-else class="space-y-2 mt-2 px-1">
          <div 
            v-for="task in taskStore.tasks.slice(0, 5)" 
            :key="task.id" 
            class="flex items-center justify-between p-3.5 md:p-4 bg-base-content/5 rounded-2xl border border-transparent hover:border-primary/30 hover:bg-base-content/10 transition-all duration-300 group"
          >
            <div class="flex items-center gap-3 md:gap-4 flex-grow mr-2">
              <input 
                type="checkbox" 
                class="checkbox checkbox-primary checkbox-sm rounded-md border-2 shrink-0" 
                :checked="task.done"
                @change="taskStore.toggleTask(task.id)"
              />
              <span :class="['text-xs md:text-sm font-black transition-all tracking-tight text-base-content truncate', task.done ? 'line-through opacity-20 italic' : 'opacity-90']">
                {{ task.text }}
              </span>
            </div>
            <Icon icon="ph:caret-right-bold" class="text-[10px] opacity-0 group-hover:opacity-30 transition-opacity text-base-content shrink-0" />
          </div>
        </div>
      </BaseCard>

      <div class="space-y-4">
        <div class="flex items-center justify-between px-2">
          <h2 class="text-lg md:text-xl font-black flex items-center gap-2 tracking-tighter uppercase text-base-content">
            <Icon icon="ph:calendar-blank-duotone" class="text-secondary" />
            {{ isSunday ? 'Next Day Plan' : 'Agenda Today' }}
          </h2>
          <div class="badge zenshin-glass border-none font-mono text-[9px] md:text-[10px] tracking-tighter py-3 px-3 md:px-4 font-bold text-base-content shrink-0">
            {{ scheduleStore.currentDay }}
          </div>
        </div>
        
        <div class="zenshin-glass rounded-[2rem] overflow-hidden shadow-xl min-h-[250px] md:min-h-[300px]">
          <ScheduleTable :schedules="displaySchedules" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { useScheduleStore } from '@/stores/useScheduleStore'
import BaseCard from '@/components/ui/BaseCard.vue'
import ScheduleTable from '@/components/schedule/ScheduleTable.vue'

const taskStore = useTaskStore()
const scheduleStore = useScheduleStore()

const currentTime = ref('')
const userName = ref('User')

const isSunday = computed(() => new Date().getDay() === 0)

const displaySchedules = computed(() => {
  if (isSunday.value) {
    return scheduleStore.schedules['Senin'] || []
  }
  return scheduleStore.todaySchedules
})

const loadProfile = () => {
  userName.value = localStorage.getItem('zenshin_username') || 'User'
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

let timeInterval

onMounted(() => {
  loadProfile()
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  window.addEventListener('storage', loadProfile)
})

onUnmounted(() => {
  clearInterval(timeInterval)
  window.removeEventListener('storage', loadProfile)
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.zenshin-glass {
  background-color: color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 85%, transparent);
  backdrop-filter: blur(20px);
}

.text-base-content {
  color: var(--fallback-bc, oklch(var(--bc)));
}

/* Fix mobile scroll area */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
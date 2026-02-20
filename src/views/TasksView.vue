<template>
  <div class="max-w-4xl mx-auto space-y-6 pb-10 font-sans transition-all duration-500">
    <section class="zenshin-glass rounded-[2rem] shadow-xl border-none overflow-hidden">
      <div class="card-body p-6 md:p-10">
        <h2 class="text-2xl font-black mb-6 flex items-center gap-3 tracking-tighter text-base-content uppercase">
          <Icon icon="ph:note-pencil-duotone" class="text-primary text-3xl" />
          Daftar Tugas
        </h2>
        
        <form @submit.prevent="handleAddTask" class="flex flex-col sm:flex-row gap-3">
          <div class="relative flex-grow">
            <Icon icon="ph:plus-circle-duotone" class="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40 text-xl" />
            <input 
              v-model="newTaskText"
              type="text" 
              placeholder="Tulis rencana atau tugas baru..." 
              class="input input-bordered input-primary w-full pl-12 focus:ring-4 focus:ring-primary/10 transition-all bg-base-100/30 font-bold border-none text-base-content"
              :disabled="taskStore.loading"
            />
          </div>
          <button type="submit" class="btn btn-primary px-10 font-black shadow-lg shadow-primary/20 rounded-xl" :disabled="!newTaskText.trim()">
            <Icon icon="ph:plus-bold" /> TAMBAH
          </button>
        </form>
      </div>
    </section>

    <section class="flex flex-wrap items-center justify-between gap-4 px-4">
      <div class="flex gap-3">
        <div class="badge zenshin-glass py-5 px-6 gap-3 font-black border-none shadow-sm text-[11px] tracking-widest text-base-content">
          <Icon icon="ph:stack-duotone" class="opacity-40 text-lg" />
          TOTAL: {{ taskStore.totalTugas }}
        </div>
        <div class="badge badge-success py-5 px-6 gap-3 text-success-content font-black shadow-lg shadow-success/10 text-[11px] tracking-widest rounded-xl">
          <Icon icon="ph:check-circle-duotone" class="text-lg" />
          SELESAI: {{ taskStore.tugasSelesai }}
        </div>
      </div>
      
      <button 
        v-if="taskStore.tugasSelesai > 0"
        @click="taskStore.clearCompleted" 
        class="btn btn-ghost btn-xs text-error font-black hover:bg-error/10 rounded-full px-4 gap-2 uppercase text-[10px] tracking-widest transition-all"
      >
        <Icon icon="ph:trash-duotone" class="text-sm" />
        Bersihkan
      </button>
    </section>

    <section class="space-y-3 px-2 md:px-0">
      <TransitionGroup name="task-list">
        <div 
          v-for="task in taskStore.tasks" 
          :key="task.id"
          class="flex items-center justify-between p-5 zenshin-glass rounded-2xl border-none hover:bg-base-content/5 shadow-md transition-all duration-300 group"
        >
          <div class="flex items-center gap-5 flex-grow">
            <input 
              type="checkbox" 
              :checked="task.done"
              @change="taskStore.toggleTask(task.id)"
              class="checkbox checkbox-primary checkbox-md rounded-lg border-2 transition-transform active:scale-90" 
            />
            <span 
              :class="[
                'text-lg font-black transition-all duration-300 tracking-tight leading-tight text-base-content',
                task.done ? 'line-through opacity-20 italic' : 'opacity-100'
              ]"
            >
              {{ task.text }}
            </span>
          </div>
          
          <button 
            @click="taskStore.deleteTask(task.id)"
            class="btn btn-circle btn-ghost btn-sm text-error opacity-0 group-hover:opacity-100 transition-all hover:bg-error/20"
            title="Hapus permanen"
          >
            <Icon icon="ph:x-circle-duotone" class="text-2xl" />
          </button>
        </div>
      </TransitionGroup>

      <div v-if="taskStore.tasks.length === 0" class="flex flex-col items-center justify-center py-28 zenshin-glass rounded-[3rem] border-none shadow-inner animate-fade-in">
        <div class="relative mb-8">
          <Icon icon="ph:wind-duotone" class="text-8xl text-primary/10 animate-pulse" />
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-4xl font-black opacity-5 tracking-tighter select-none uppercase text-base-content">Zenshin</span>
          </div>
        </div>
        <p class="opacity-40 font-black italic text-center px-8 tracking-tighter text-xl text-base-content">
          Environment Bersih. <br>
          <span class="text-sm font-medium opacity-60 not-italic tracking-normal">Waktunya menentukan target baru hari ini.</span>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useTaskStore } from '@/stores/useTaskStore'

const taskStore = useTaskStore()
const newTaskText = ref('')

const handleAddTask = () => {
  if (newTaskText.value.trim()) {
    taskStore.addTask(newTaskText.value)
    newTaskText.value = '' 
  }
}
</script>

<style scoped>
/* Logic Animasi Premium untuk List */
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.task-list-enter-from {
  opacity: 0;
  transform: translateX(-30px) scale(0.95);
}

.task-list-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}

.task-list-move {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.zenshin-glass {
  background-color: color-mix(in srgb, var(--fallback-b1, oklch(var(--b1))) 85%, transparent);
  backdrop-filter: blur(20px);
}

.text-base-content {
  color: var(--fallback-bc, oklch(var(--bc)));
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
<template>
  <div class="space-y-4">
    <div v-if="tasks.length > 0" class="flex justify-between items-center px-2">
      <h3 class="text-xs font-bold uppercase tracking-widest opacity-40">
        Daftar Antrean
      </h3>
      <span class="text-[10px] font-mono opacity-40">
        {{ tasks.length }} Items
      </span>
    </div>

    <TransitionGroup 
      name="task-list" 
      tag="div" 
      class="space-y-3"
    >
      <TaskItem 
        v-for="task in tasks" 
        :key="task.id" 
        :task="task"
        @toggle="taskStore.toggleTask"
        @delete="taskStore.deleteTask"
      />
    </TransitionGroup>

    <div v-if="tasks.length === 0" class="flex flex-col items-center justify-center py-12 px-4 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-content/5">
      <div class="text-4xl mb-4 opacity-20 italic font-bold font-sans text-primary">Zenshin</div>
      <p class="text-sm opacity-40 text-center font-sans">
        Belum ada tugas yang tercatat.<br>Siap untuk memulai sesuatu yang baru?
      </p>
    </div>
  </div>
</template>

<script setup>
import { TransitionGroup } from 'vue'
import { useTaskStore } from '../../stores/useTaskStore'
import TaskItem from './TaskItem.vue'

const taskStore = useTaskStore()

defineProps({
  tasks: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
/* Animasi List: Muncul dari samping dan fade-in */
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.task-list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.task-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Memastikan item yang tidak berpindah tetap memiliki animasi yang mulus */
.task-list-move {
  transition: transform 0.4s ease;
}
</style>
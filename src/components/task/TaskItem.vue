<template>
  <div 
    class="flex items-center justify-between p-4 bg-base-100 rounded-xl border border-base-content/5 hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
  >
    <div class="flex items-center gap-4 flex-grow">
      <label class="cursor-pointer relative flex items-center">
        <input 
          type="checkbox" 
          :checked="task.done"
          @change="$emit('toggle', task.id)"
          class="checkbox checkbox-primary checkbox-md rounded-lg" 
        />
      </label>

      <div class="flex flex-col">
        <span 
          :class="[
            'text-base font-medium transition-all duration-300 font-sans',
            task.done ? 'line-through opacity-30 text-base-content' : 'text-base-content'
          ]"
        >
          {{ task.text }}
        </span>
        <span class="text-[10px] opacity-30 font-mono uppercase tracking-tighter">
          Added: {{ formatDate(task.createdAt) }}
        </span>
      </div>
    </div>

    <button 
      @click="$emit('delete', task.id)"
      class="btn btn-circle btn-ghost btn-sm text-error opacity-0 group-hover:opacity-100 transition-opacity"
      title="Hapus tugas"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle', 'delete'])

// Helper untuk format tanggal singkat
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { 
    day: '2-digit', 
    month: 'short', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<style scoped>
/* Memberikan efek strike-through yang lebih halus */
.line-through {
  text-decoration-thickness: 2px;
}
</style>
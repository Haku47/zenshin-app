<template>
  <div 
    :class="[
      'card bg-base-200 shadow-xl transition-all duration-300 border border-transparent',
      { 'hover:scale-[1.01] hover:shadow-2xl hover:border-primary/10': hoverable },
      customClass
    ]"
  >
    <figure v-if="$slots.image">
      <slot name="image"></slot>
    </figure>

    <div class="card-body p-6">
      <div v-if="title || $slots.title" class="flex items-center justify-between mb-2">
        <h2 class="card-title text-xl font-bold tracking-tight font-sans">
          <slot name="title">{{ title }}</slot>
        </h2>
        <div class="card-actions justify-end">
          <slot name="actions-top"></slot>
        </div>
      </div>

      <div class="font-sans text-base-content/80">
        <slot></slot>
      </div>

      <div v-if="$slots.footer" class="card-actions justify-end mt-4 pt-4 border-t border-base-content/5">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  hoverable: {
    type: Boolean,
    default: true
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
/* Kita menghapus blok @apply di sini untuk menghindari error 'unknown utility' di Tailwind v4.
  Semua logika styling sudah dipindahkan ke class binding di atas agar lebih aman.
*/
</style>
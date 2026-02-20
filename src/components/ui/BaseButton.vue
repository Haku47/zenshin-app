<template>
  <button 
    :class="[
      'btn transition-all duration-200 active:scale-95 font-sans',
      variantClass,
      sizeClass,
      { 'btn-outline': outline, 'btn-ghost': ghost, 'loading': loading, 'btn-wide': wide }
    ]"
    :disabled="loading || disabled"
    @click="$emit('click', $event)"
  >
    <slot name="icon-left"></slot>
    
    <span v-if="loading">Loading...</span>
    <slot v-else></slot>

    <slot name="icon-right"></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, secondary, accent, ghost, error, success, warning
  },
  size: {
    type: String,
    default: 'md', // lg, md, sm, xs
  },
  outline: {
    type: Boolean,
    default: false,
  },
  ghost: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  wide: {
    type: Boolean,
    default: false,
  }
})

defineEmits(['click'])

const variantClass = computed(() => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    error: 'btn-error',
    success: 'btn-success',
    warning: 'btn-warning',
    ghost: 'btn-ghost',
    neutral: 'btn-neutral'
  }
  return variants[props.variant] || 'btn-primary'
})

const sizeClass = computed(() => {
  const sizes = {
    lg: 'btn-lg',
    md: 'btn-md',
    sm: 'btn-sm',
    xs: 'btn-xs'
  }
  return sizes[props.size] || 'btn-md'
})
</script>
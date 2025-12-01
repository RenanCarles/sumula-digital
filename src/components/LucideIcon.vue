<script setup>
import { computed } from 'vue'
import * as icons from 'lucide-vue-next'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 24
  },
  strokeWidth: {
    type: Number,
    default: 2
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})

const iconComponent = computed(() => {
  // Convert kebab-case to PascalCase
  const pascalCase = props.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
  
  return icons[pascalCase] || icons.HelpCircle
})
</script>

<template>
  <component
    :is="iconComponent"
    :size="size"
    :stroke-width="strokeWidth"
    :color="color"
  />
</template>

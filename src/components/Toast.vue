<script setup>
defineProps({
  message: {
    type: String,
    default: ''
  },
  show: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-2 opacity-0"
  >
    <div
      v-if="show"
      class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div class="px-4 py-2 rounded-md bg-white/10 ring-1 ring-white/20 text-sm text-white/90">
        {{ message }}
      </div>
    </div>
  </Transition>
</template>

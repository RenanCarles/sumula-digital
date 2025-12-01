<script setup>
defineProps({
  subtitle: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['new-match', 'export', 'open-settings'])
</script>

<template>
  <header class="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/30 border-b border-white/10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="h-8 w-8 rounded-md bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-white font-semibold tracking-tight">
          SB
        </div>
        <div class="hidden sm:flex flex-col leading-tight">
          <span class="text-[15px] font-medium tracking-tight text-white/90">Súmula Vôlei de Praia</span>
          <span class="text-xs text-white/50">{{ subtitle }}</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="px-3.5 h-9 rounded-md bg-white/5 hover:bg-white/10 text-white/90 text-sm ring-1 ring-white/10 hover:ring-white/20 transition outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
          @click="emit('new-match')"
        >
          Novo jogo
        </button>
        <button
          class="px-3.5 h-9 rounded-md bg-white/5 hover:bg-white/10 text-white/90 text-sm ring-1 ring-white/10 hover:ring-white/20 transition outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 flex items-center gap-2"
          @click="emit('export')"
        >
          <lucide-icon name="share-2" :size="16" :stroke-width="1.5" />
          Exportar
        </button>
        <button
          class="px-3.5 h-9 rounded-md bg-white/5 hover:bg-white/10 text-white/90 text-sm ring-1 ring-white/10 hover:ring-white/20 transition outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 flex items-center gap-2"
          @click="emit('open-settings')"
        >
          <lucide-icon name="sliders" :size="16" :stroke-width="1.5" />
          Ajustes
        </button>
      </div>
    </div>
  </header>
</template>

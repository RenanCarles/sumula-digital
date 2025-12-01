<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false
  },
  earlyTarget: {
    type: Number,
    default: 21
  },
  thirdTarget: {
    type: Number,
    default: 15
  },
  maxSets: {
    type: Number,
    default: 3
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/60"></div>
    <div class="absolute inset-0 flex items-end sm:items-center justify-center p-4">
      <div class="w-full sm:max-w-md rounded-xl bg-[#0f1115] ring-1 ring-white/10 p-5">
        <div class="flex items-center justify-between mb-3">
          <div class="text-[18px] font-semibold tracking-tight text-white/90">
            Ajustes do jogo
          </div>
          <button
            class="h-8 w-8 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 flex items-center justify-center"
            @click="emit('close')"
          >
            <lucide-icon name="x" :size="16" :stroke-width="1.5" />
          </button>
        </div>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-white/80">Melhor de</div>
              <div class="text-xs text-white/50">Padrão: {{ maxSets }} sets</div>
            </div>
            <div class="px-3 py-1.5 rounded-md bg-white/5 ring-1 ring-white/10 text-sm">
              {{ maxSets }}
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg bg-white/5 ring-1 ring-white/10 p-3">
              <div class="text-xs text-white/60 mb-1">Pontos set 1/2</div>
              <div class="text-[20px] font-semibold tracking-tight">
                {{ earlyTarget }}
              </div>
            </div>
            <div class="rounded-lg bg-white/5 ring-1 ring-white/10 p-3">
              <div class="text-xs text-white/60 mb-1">Pontos set 3</div>
              <div class="text-[20px] font-semibold tracking-tight">
                {{ thirdTarget }}
              </div>
            </div>
          </div>
          <div class="text-xs text-white/50">
            As alterações podem ser feitas também no card principal.
          </div>
          <div class="flex justify-end">
            <button
              class="h-9 px-4 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-500/30 hover:ring-emerald-500/40 transition text-sm"
              @click="emit('close')"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

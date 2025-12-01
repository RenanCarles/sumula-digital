<script setup>
import { computed } from 'vue'

const props = defineProps({
  log: {
    type: Array,
    default: () => []
  },
  teams: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['clear'])

const renderRow = (item) => {
  const { type, payload } = item
  const t = props.teams

  if (type === 'point') {
    const teamName = t[payload.team]?.name || (payload.team === 0 ? 'Equipe A' : 'Equipe B')
    return {
      icon: 'plus',
      classes: 'text-emerald-300',
      text: `${teamName} ponto`,
      extra: `(${payload.scoreA}-${payload.scoreB})`
    }
  }

  if (type === 'timeout') {
    const teamName = t[payload.team]?.name || ''
    return {
      icon: 'clock',
      classes: 'text-white/80',
      text: `Tempo pedido • ${teamName}`
    }
  }

  if (type === 'serve') {
    const teamName = t[payload.team]?.name || ''
    return {
      icon: 'circle-dot',
      classes: 'text-white/80',
      text: `Saque: ${teamName}`
    }
  }

  if (type === 'switch') {
    return {
      icon: 'rotate-cw',
      classes: 'text-white/80',
      text: 'Troca de lado'
    }
  }

  if (type === 'card') {
    const teamName = t[payload.team]?.name || ''
    const colorClass = payload.card === 'yellow' ? 'text-amber-300' : 'text-rose-300'
    const label = payload.card === 'yellow' ? 'Cartão amarelo' : 'Cartão vermelho'
    return {
      icon: 'square',
      classes: colorClass,
      text: `${label} • ${teamName}`
    }
  }

  if (type === 'setEnd') {
    const teamName = t[payload.winner]?.name || ''
    return {
      icon: 'flag',
      classes: 'text-emerald-300',
      text: `Set ${payload.set} para ${teamName} (${payload.scoreA}-${payload.scoreB})`
    }
  }

  if (type === 'matchEnd') {
    const teamName = t[payload.winner]?.name || ''
    return {
      icon: 'flag-triangle-right',
      classes: 'text-emerald-300',
      text: `Partida para ${teamName} • ${t[0]?.sets ?? 0}-${t[1]?.sets ?? 0}`
    }
  }

  return null
}
</script>

<template>
  <section class="rounded-xl bg-white/5 ring-1 ring-white/10 p-4 sm:p-6">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-[18px] sm:text-[20px] font-semibold tracking-tight text-white/90">
        Registro
      </h2>
      <button
        class="h-8 px-3 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition text-xs text-white/70 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
        @click="emit('clear')"
      >
        Limpar
      </button>
    </div>
    <div class="max-h-80 sm:max-h-96 overflow-auto space-y-2 pr-1">
      <div
        v-for="(item, index) in log"
        :key="index"
        class="w-full rounded-md bg-white/5 ring-1 ring-white/10 px-3 py-2 flex items-center justify-between"
      >
        <div v-if="renderRow(item)" class="flex items-center gap-2">
          <lucide-icon 
            :name="renderRow(item).icon" 
            :size="16" 
            :stroke-width="1.5"
            :class="renderRow(item).classes"
          />
          <span class="text-sm">{{ renderRow(item).text }}</span>
          <span
            v-if="renderRow(item).extra"
            class="text-xs text-white/50"
          >
            {{ renderRow(item).extra }}
          </span>
        </div>
        <div class="text-xs text-white/40">
          {{ item.time }} • Set {{ item.set }}
        </div>
      </div>
      <div
        v-if="!log.length"
        class="text-xs text-white/40 text-center py-6"
      >
        Sem eventos ainda.
      </div>
    </div>
  </section>
</template>

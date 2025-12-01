<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import EventLog from './EventLog.vue'
import SettingsModal from './SettingsModal.vue'
import Toast from './Toast.vue'

const emit = defineEmits(['update-subtitle'])

// State
const teams = ref([
  {
    name: 'Equipe A',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    score: 0,
    sets: 0,
    timeouts: 1,
    timeoutRunning: 0,
    cards: { yellow: 0, red: 0 }
  },
  {
    name: 'Equipe B',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop',
    score: 0,
    sets: 0,
    timeouts: 1,
    timeoutRunning: 0,
    cards: { yellow: 0, red: 0 }
  }
])

const currentSet = ref(1)
const maxSets = ref(3)
const targets = ref([21, 21, 15])
const serving = ref(0)
const sideFlipped = ref(false)
const ralliesInSet = ref(0)
const log = ref([])
const history = ref([])
const future = ref([])
const players = ref([
  [{ number: '1' }, { number: '2' }],
  [{ number: '1' }, { number: '2' }]
])
const currentServer = ref([0, 0])
const lastServer = ref([null, null])
const timers = ref([null, null])
const settingsOpen = ref(false)
const toastMessage = ref('')
const showToast = ref(false)

// Computed
const leftIdx = computed(() => sideFlipped.value ? 1 : 0)
const rightIdx = computed(() => sideFlipped.value ? 0 : 1)
const leftTeam = computed(() => teams.value[leftIdx.value])
const rightTeam = computed(() => teams.value[rightIdx.value])
const earlyTarget = computed(() => targets.value[0])
const thirdTarget = computed(() => targets.value[2])

const subtitleText = () => `Jogo • Melhor de ${maxSets.value} sets`

const currentTarget = () => targets.value[currentSet.value - 1]

const shouldShowSideHint = () => {
  const interval = currentSet.value === 3 ? 5 : 7
  return ralliesInSet.value > 0 && ralliesInSet.value % interval === 0
}

const setChips = () => Array.from({ length: maxSets.value }, (_, i) => i + 1)

// Watch
watch(maxSets, () => {
  emit('update-subtitle', subtitleText())
})

// Lifecycle
onMounted(() => {
  emit('update-subtitle', subtitleText())
})

// Methods
const clone = (obj) => JSON.parse(JSON.stringify(obj))

const pushHistory = () => {
  future.value = []
  history.value.push(clone({
    teams: teams.value,
    currentSet: currentSet.value,
    targets: targets.value,
    serving: serving.value,
    sideFlipped: sideFlipped.value,
    ralliesInSet: ralliesInSet.value,
    log: log.value,
    players: players.value,
    currentServer: currentServer.value,
    lastServer: lastServer.value
  }))
  if (history.value.length > 200) history.value.shift()
}

const undo = () => {
  if (!history.value.length) return
  future.value.push(clone({
    teams: teams.value,
    currentSet: currentSet.value,
    targets: targets.value,
    serving: serving.value,
    sideFlipped: sideFlipped.value,
    ralliesInSet: ralliesInSet.value,
    log: log.value,
    players: players.value,
    currentServer: currentServer.value,
    lastServer: lastServer.value
  }))
  const prev = history.value.pop()
  teams.value = clone(prev.teams)
  currentSet.value = prev.currentSet
  targets.value = prev.targets
  serving.value = prev.serving
  sideFlipped.value = prev.sideFlipped
  ralliesInSet.value = prev.ralliesInSet
  log.value = prev.log
  players.value = clone(prev.players)
  currentServer.value = prev.currentServer.slice()
  lastServer.value = prev.lastServer.slice()
}

const redo = () => {
  if (!future.value.length) return
  history.value.push(clone({
    teams: teams.value,
    currentSet: currentSet.value,
    targets: targets.value,
    serving: serving.value,
    sideFlipped: sideFlipped.value,
    ralliesInSet: ralliesInSet.value,
    log: log.value,
    players: players.value,
    currentServer: currentServer.value,
    lastServer: lastServer.value
  }))
  const next = future.value.pop()
  teams.value = clone(next.teams)
  currentSet.value = next.currentSet
  targets.value = next.targets
  serving.value = next.serving
  sideFlipped.value = next.sideFlipped
  ralliesInSet.value = next.ralliesInSet
  log.value = next.log
  players.value = clone(next.players)
  currentServer.value = next.currentServer.slice()
  lastServer.value = next.lastServer.slice()
}

const teamIdxFromPos = (pos) => pos === 'left' ? leftIdx.value : rightIdx.value

const addLog = (type, payload = {}) => {
  const ts = new Date()
  const time = ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  log.value.unshift({ type, payload, time, set: currentSet.value })
}

const toast = (msg) => {
  toastMessage.value = msg
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 1600)
}

const addPoint = (teamIdx) => {
  pushHistory()
  const prevServing = serving.value
  const prevServerIdx = currentServer.value[prevServing]

  teams.value[teamIdx].score += 1
  ralliesInSet.value += 1

  if (teamIdx !== prevServing) {
    lastServer.value[prevServing] = prevServerIdx
    const last = lastServer.value[teamIdx]
    currentServer.value[teamIdx] = last === 0 ? 1 : 0
  }

  serving.value = teamIdx
  addLog('point', {
    team: teamIdx,
    scoreA: teams.value[0].score,
    scoreB: teams.value[1].score
  })
  checkSetCompletion()
}

const removePoint = (teamIdx) => {
  pushHistory()
  teams.value[teamIdx].score = Math.max(0, teams.value[teamIdx].score - 1)
  addLog('point', {
    team: teamIdx,
    scoreA: teams.value[0].score,
    scoreB: teams.value[1].score
  })
}

const endSet = (force = false) => {
  const target = currentTarget()
  const a = teams.value[0].score
  const b = teams.value[1].score
  const lead = Math.abs(a - b)
  const reached = (a >= target || b >= target) && lead >= 2
  
  if (!reached && !force) {
    toast('Condição de set não atingida')
    return
  }

  const winner = a > b ? 0 : 1
  teams.value[winner].sets += 1
  addLog('setEnd', { set: currentSet.value, winner, scoreA: a, scoreB: b })

  currentSet.value += 1
  teams.value[0].score = 0
  teams.value[1].score = 0
  teams.value[0].timeouts = 1
  teams.value[1].timeouts = 1
  ralliesInSet.value = 0
  lastServer.value = [null, null]

  if (teams.value[winner].sets === Math.ceil(maxSets.value / 2)) {
    addLog('matchEnd', { winner })
    toast(`Partida encerrada: ${teams.value[winner].name}`)
  }
}

const checkSetCompletion = () => {
  const target = currentTarget()
  const a = teams.value[0].score
  const b = teams.value[1].score
  if ((a >= target || b >= target) && Math.abs(a - b) >= 2) {
    endSet(true)
  }
}

const switchSides = () => {
  pushHistory()
  sideFlipped.value = !sideFlipped.value
  addLog('switch')
}

const requestTimeout = (teamIdx) => {
  if (teams.value[teamIdx].timeouts <= 0) {
    toast('Sem tempos disponíveis')
    return
  }
  pushHistory()
  teams.value[teamIdx].timeouts -= 1
  teams.value[teamIdx].timeoutRunning = 30
  addLog('timeout', { team: teamIdx })

  if (timers.value[teamIdx]) clearInterval(timers.value[teamIdx])
  timers.value[teamIdx] = setInterval(() => {
    teams.value[teamIdx].timeoutRunning -= 1
    if (teams.value[teamIdx].timeoutRunning <= 0) {
      clearInterval(timers.value[teamIdx])
      timers.value[teamIdx] = null
      teams.value[teamIdx].timeoutRunning = 0
      toast('Tempo encerrado')
    }
  }, 1000)
}

const timeoutText = (idx) => {
  const v = teams.value[idx].timeoutRunning
  return v ? `:${String(v).padStart(2, '0')}` : ''
}

const giveCard = (teamIdx, type) => {
  pushHistory()
  if (type === 'yellow') {
    teams.value[teamIdx].cards.yellow += 1
  } else {
    teams.value[teamIdx].cards.red += 1
  }
  addLog('card', { team: teamIdx, card: type })
}

const setServeBySide = (side) => {
  pushHistory()
  const idx = teamIdxFromPos(side)
  serving.value = idx
  addLog('serve', { team: idx })
}

const rotationChipClass = (teamIdx, playerIdx) => {
  const isServingTeam = serving.value === teamIdx
  const isServer = isServingTeam && currentServer.value[teamIdx] === playerIdx
  const base = 'h-8 w-8 rounded-full text-xs flex items-center justify-center ring-1 transition outline-none'
  const style = isServer
    ? 'bg-emerald-500/15 ring-emerald-500/30 text-emerald-300'
    : 'bg-white/5 ring-white/10 text-white/80 hover:bg-white/10'
  return base + ' ' + style
}

const selectServer = (teamIdx, playerIdx) => {
  pushHistory()
  currentServer.value[teamIdx] = playerIdx
  if (serving.value === teamIdx) {
    addLog('serve', { team: teamIdx })
  }
}

const incEarly = () => {
  pushHistory()
  targets.value[0] += 1
  targets.value[1] = targets.value[0]
}

const decEarly = () => {
  pushHistory()
  targets.value[0] = Math.max(11, targets.value[0] - 1)
  targets.value[1] = targets.value[0]
}

const incThird = () => {
  pushHistory()
  targets.value[2] += 1
}

const decThird = () => {
  pushHistory()
  targets.value[2] = Math.max(11, targets.value[2] - 1)
}

const endMatchManual = () => {
  const winner = teams.value[0].sets === teams.value[1].sets
    ? (teams.value[0].score > teams.value[1].score ? 0 : 1)
    : (teams.value[0].sets > teams.value[1].sets ? 0 : 1)
  addLog('matchEnd', { winner })
  toast('Partida encerrada')
}

const newMatch = () => {
  pushHistory()
  currentSet.value = 1
  teams.value.forEach(t => {
    t.score = 0
    t.sets = 0
    t.timeouts = 1
    t.timeoutRunning = 0
    t.cards = { yellow: 0, red: 0 }
  })
  players.value = [
    [{ number: '1' }, { number: '2' }],
    [{ number: '1' }, { number: '2' }]
  ]
  currentServer.value = [0, 0]
  lastServer.value = [null, null]
  serving.value = 0
  sideFlipped.value = false
  ralliesInSet.value = 0
  log.value = []
  toast('Novo jogo iniciado')
}

const exportSummary = () => {
  const lines = []
  lines.push(`Súmula • ${new Date().toLocaleString()}`)
  lines.push(`Formato: MD${maxSets.value} | Alvos: ${targets.value[0]}/${targets.value[1]}/${targets.value[2]}`)
  lines.push(`Equipes: ${teams.value[0].name} vs ${teams.value[1].name}`)
  lines.push(`Cartões: ${teams.value[0].name} Y${teams.value[0].cards.yellow}/R${teams.value[0].cards.red} • ${teams.value[1].name} Y${teams.value[1].cards.yellow}/R${teams.value[1].cards.red}`)
  const serverNumber = players.value[serving.value][currentServer.value[serving.value]].number
  lines.push(`Saque atual: ${teams.value[serving.value].name} #${serverNumber}`)
  lines.push('---')
  
  log.value.slice().reverse().forEach(item => {
    if (item.type === 'point') {
      lines.push(`[${item.time}] Set ${item.set} • Ponto ${teams.value[item.payload.team].name} (${item.payload.scoreA}-${item.payload.scoreB})`)
    } else if (item.type === 'timeout') {
      lines.push(`[${item.time}] Set ${item.set} • Tempo • ${teams.value[item.payload.team].name}`)
    } else if (item.type === 'switch') {
      lines.push(`[${item.time}] Set ${item.set} • Troca de lado`)
    } else if (item.type === 'serve') {
      lines.push(`[${item.time}] Set ${item.set} • Saque • ${teams.value[item.payload.team].name}`)
    } else if (item.type === 'card') {
      const label = item.payload.card === 'yellow' ? 'Cartão amarelo' : 'Cartão vermelho'
      lines.push(`[${item.time}] Set ${item.set} • ${label} • ${teams.value[item.payload.team].name}`)
    } else if (item.type === 'setEnd') {
      lines.push(`[${item.time}] Set ${item.payload.set} encerrado • ${teams.value[item.payload.winner].name} (${item.payload.scoreA}-${item.payload.scoreB})`)
    } else if (item.type === 'matchEnd') {
      lines.push(`[${item.time}] Partida encerrada • ${teams.value[item.payload.winner].name}`)
    }
  })
  
  navigator.clipboard.writeText(lines.join('\n'))
    .then(() => toast('Súmula copiada'))
}

const clearLog = () => {
  pushHistory()
  log.value = []
}

// Expose methods for parent component
defineExpose({
  newMatch,
  exportSummary,
  settingsOpen
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <section class="flex flex-col gap-6">
      <div class="rounded-xl bg-white/5 ring-1 ring-white/10 p-4 sm:p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="text-[15px] text-white/70">Sets</span>
            <div class="flex items-center gap-1.5">
              <div
                v-for="s in setChips()"
                :key="s"
                class="px-2.5 h-7 rounded-md text-xs flex items-center gap-1 ring-1"
                :class="[
                  s === currentSet
                    ? 'bg-white/10 ring-white/20 text-white/90'
                    : 'bg-white/5 ring-white/10 text-white/70'
                ]"
              >
                <span>Set {{ s }}</span>
                <span
                  v-if="teams[0].sets > (s-1) || teams[1].sets > (s-1)"
                  class="text-[10px] px-1 rounded bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                >
                  ok
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="h-9 px-3 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition text-white/90 text-sm flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
              @click="switchSides"
            >
              <lucide-icon name="rotate-cw" :size="16" :stroke-width="1.5" />
              Trocar lados
            </button>
            <button
              class="h-9 px-3 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition text-white/90 text-sm flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
              @click="endSet(false)"
            >
              <lucide-icon name="flag" :size="16" :stroke-width="1.5" />
              Encerrar set
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          <!-- Team Left -->
          <div class="flex flex-col justify-between rounded-lg bg-black/20 ring-1 ring-white/10 p-4">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3 min-w-0">
                <div class="min-w-0">
                  <input
                    v-model="leftTeam.name"
                    class="bg-transparent text-white/90 text-[15px] font-medium tracking-tight outline-none w-full placeholder-white/40"
                    placeholder="Equipe A"
                  />
                  <div class="text-xs text-white/40">
                    Tempo: <span>{{ leftTeam.timeouts }}</span>
                    <span class="mx-1">•</span>
                    <span class="inline-flex items-center gap-1">
                      <span class="h-3 w-2.5 rounded-[2px] bg-amber-400/90 ring-1 ring-amber-300/60"></span>
                      <span>{{ leftTeam.cards.yellow }}</span>
                    </span>
                    <span class="inline-flex items-center gap-1 ml-2">
                      <span class="h-3 w-2.5 rounded-[2px] bg-rose-500/90 ring-1 ring-rose-400/60"></span>
                      <span>{{ leftTeam.cards.red }}</span>
                    </span>
                  </div>
                </div>
              </div>
              <button
                class="h-8 w-8 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                :class="serving === leftIdx ? 'bg-emerald-500/15 ring-emerald-500/30' : ''"
                @click="setServeBySide('left')"
              >
                <lucide-icon name="circle-dot" :size="16" :stroke-width="1.5" />
              </button>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <button
                  class="h-12 w-12 rounded-md bg-white/5 hover:bg-white/10 active:bg-white/15 ring-1 ring-white/10 hover:ring-white/20 transition flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                  @click="removePoint(leftIdx)"
                >
                  <lucide-icon name="minus" :size="20" :stroke-width="1.5" />
                </button>
                <button
                  class="h-12 w-12 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 active:bg-emerald-500/30 text-emerald-300 ring-1 ring-emerald-500/30 hover:ring-emerald-500/40 transition flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                  @click="addPoint(leftIdx)"
                >
                  <lucide-icon name="plus" :size="20" :stroke-width="1.5" />
                </button>
              </div>
              <div class="text-[56px] leading-none font-semibold tracking-tight tabular-nums text-white">
                {{ leftTeam.score }}
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between gap-2">
              <div class="flex items-center gap-1.5">
                <button
                  class="h-9 px-3 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition text-white/90 text-sm flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                  @click="requestTimeout(leftIdx)"
                >
                  <lucide-icon name="clock" :size="16" :stroke-width="1.5" />
                  Tempo
                </button>
                <button
                  class="h-9 w-9 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                  @click="giveCard(leftIdx, 'yellow')"
                >
                  <lucide-icon name="square" :size="16" :stroke-width="1.5" class="text-amber-300" />
                </button>
                <button
                  class="h-9 w-9 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                  @click="giveCard(leftIdx, 'red')"
                >
                  <lucide-icon name="square" :size="16" :stroke-width="1.5" class="text-rose-300" />
                </button>
              </div>
              <span class="text-sm text-white/60">{{ timeoutText(leftIdx) }}</span>
            </div>
          </div>

          <!-- Center info -->
          <div class="rounded-lg bg-gradient-to-b from-white/5 to-transparent ring-1 ring-white/10 p-4 sm:p-6 flex flex-col items-center justify-center gap-3">
            <div class="text-xs text-white/50">Set atual</div>
            <div class="text-[28px] sm:text-[32px] font-semibold tracking-tight">
              Set {{ currentSet }}
            </div>
            <div class="text-xs text-white/50">
              Alvo • <span>{{ currentTarget() }}</span> pts | Dif. 2
            </div>
            <div
              v-if="shouldShowSideHint()"
              class="mt-2 text-amber-300/90 text-sm px-2 py-1 rounded-md bg-amber-500/10 ring-1 ring-amber-500/20"
            >
              Sugestão: trocar de lado
            </div>
            <div class="mt-2 flex items-center gap-2">
              <button
                class="h-9 w-9 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                @click="undo"
              >
                <lucide-icon name="undo-2" :size="16" :stroke-width="1.5" />
              </button>
              <button
                class="h-9 w-9 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                @click="redo"
              >
                <lucide-icon name="redo-2" :size="16" :stroke-width="1.5" />
              </button>
            </div>
          </div>

          <!-- Team Right -->
          <div class="flex flex-col justify-between rounded-lg bg-black/20 ring-1 ring-white/10 p-4">
            <div class="flex items-center justify-between gap-3">
              <button
                class="h-8 w-8 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition flex items-center justify-center order-2 sm:order-1 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                :class="serving === rightIdx ? 'bg-emerald-500/15 ring-emerald-500/30' : ''"
                @click="setServeBySide('right')"
              >
                <lucide-icon name="circle-dot" :size="16" :stroke-width="1.5" />
              </button>
              <div class="flex items-center gap-3 min-w-0 order-1 sm:order-2">
                <div class="min-w-0">
                  <input
                    v-model="rightTeam.name"
                    class="bg-transparent text-white/90 text-[15px] font-medium tracking-tight outline-none w-full placeholder-white/40 text-right sm:text-left"
                    placeholder="Equipe B"
                  />
                  <div class="text-xs text-white/40 text-right sm:text-left">
                    Tempo: <span>{{ rightTeam.timeouts }}</span>
                    <span class="mx-1">•</span>
                    <span class="inline-flex items-center gap-1">
                      <span class="h-3 w-2.5 rounded-[2px] bg-amber-400/90 ring-1 ring-amber-300/60"></span>
                      <span>{{ rightTeam.cards.yellow }}</span>
                    </span>
                    <span class="inline-flex items-center gap-1 ml-2">
                      <span class="h-3 w-2.5 rounded-[2px] bg-rose-500/90 ring-1 ring-rose-400/60"></span>
                      <span>{{ rightTeam.cards.red }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <div class="text-[56px] leading-none font-semibold tracking-tight tabular-nums text-white">
                {{ rightTeam.score }}
              </div>
              <div class="flex items-center gap-2">
                <button
                  class="h-12 w-12 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 active:bg-emerald-500/30 text-emerald-300 ring-1 ring-emerald-500/30 hover:ring-emerald-500/40 transition flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                  @click="addPoint(rightIdx)"
                >
                  <lucide-icon name="plus" :size="20" :stroke-width="1.5" />
                </button>
                <button
                  class="h-12 w-12 rounded-md bg-white/5 hover:bg-white/10 active:bg-white/15 ring-1 ring-white/10 hover:ring-white/20 transition flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                  @click="removePoint(rightIdx)"
                >
                  <lucide-icon name="minus" :size="20" :stroke-width="1.5" />
                </button>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between gap-2">
              <span class="text-sm text-white/60">{{ timeoutText(rightIdx) }}</span>
              <div class="flex items-center gap-1.5">
                <button
                  class="h-9 w-9 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                  @click="giveCard(rightIdx, 'yellow')"
                >
                  <lucide-icon name="square" :size="16" :stroke-width="1.5" class="text-amber-300" />
                </button>
                <button
                  class="h-9 w-9 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                  @click="giveCard(rightIdx, 'red')"
                >
                  <lucide-icon name="square" :size="16" :stroke-width="1.5" class="text-rose-300" />
                </button>
                <button
                  class="h-9 px-3 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition text-white/90 text-sm flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                  @click="requestTimeout(rightIdx)"
                >
                  <lucide-icon name="clock" :size="16" :stroke-width="1.5" />
                  Tempo
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Set targets and meta -->
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="rounded-lg bg-white/5 ring-1 ring-white/10 p-3 flex items-center justify-between">
            <div class="text-sm text-white/60">Formato</div>
            <div class="text-sm text-white/90 font-medium tracking-tight">
              Melhor de {{ maxSets }}
            </div>
          </div>
          <div class="rounded-lg bg-white/5 ring-1 ring-white/10 p-3 flex items-center justify-between">
            <div class="text-sm text-white/60">Pontos set 1/2</div>
            <div class="flex items-center gap-2">
              <button
                class="h-7 w-7 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 flex items-center justify-center"
                @click="decEarly"
              >
                <lucide-icon name="minus" :size="16" :stroke-width="1.5" />
              </button>
              <span class="text-sm font-medium tracking-tight">{{ targets[0] }}</span>
              <button
                class="h-7 w-7 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 flex items-center justify-center"
                @click="incEarly"
              >
                <lucide-icon name="plus" :size="16" :stroke-width="1.5" />
              </button>
            </div>
          </div>
          <div class="rounded-lg bg-white/5 ring-1 ring-white/10 p-3 flex items-center justify-between">
            <div class="text-sm text-white/60">Pontos set 3</div>
            <div class="flex items-center gap-2">
              <button
                class="h-7 w-7 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 flex items-center justify-center"
                @click="decThird"
              >
                <lucide-icon name="minus" :size="16" :stroke-width="1.5" />
              </button>
              <span class="text-sm font-medium tracking-tight">{{ targets[2] }}</span>
              <button
                class="h-7 w-7 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 flex items-center justify-center"
                @click="incThird"
              >
                <lucide-icon name="plus" :size="16" :stroke-width="1.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom actions -->
        <div class="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="text-sm text-white/50">
            Diferença mínima: 2 pontos • Troca de lado: 7/7/5
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-2 rounded-md bg-white/5 ring-1 ring-white/10 px-2 py-1.5">
              <span class="text-xs text-white/60">Rotação</span>
              <div class="flex items-center gap-1">
                <button
                  v-for="(p, idx) in players[leftIdx]"
                  :key="'L'+idx"
                  :class="rotationChipClass(leftIdx, idx)"
                  @click="selectServer(leftIdx, idx)"
                >
                  {{ p.number }}
                </button>
              </div>
              <span class="text-xs text-white/40">•</span>
              <div class="flex items-center gap-1">
                <button
                  v-for="(p, idx) in players[rightIdx]"
                  :key="'R'+idx"
                  :class="rotationChipClass(rightIdx, idx)"
                  @click="selectServer(rightIdx, idx)"
                >
                  {{ p.number }}
                </button>
              </div>
            </div>
            <button
              class="h-10 px-4 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 ring-1 ring-emerald-500/30 hover:ring-emerald-500/40 transition text-sm flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
              @click="endMatchManual"
            >
              <lucide-icon name="flag-triangle-right" :size="16" :stroke-width="1.5" />
              Encerrar partida
            </button>
          </div>
        </div>
      </div>
    </section>

    <EventLog :log="log" :teams="teams" @clear="clearLog" />

    <SettingsModal
      :open="settingsOpen"
      :early-target="earlyTarget"
      :third-target="thirdTarget"
      :max-sets="maxSets"
      @close="settingsOpen = false"
    />

    <Toast :message="toastMessage" :show="showToast" />
  </div>
</template>

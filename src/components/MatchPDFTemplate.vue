<template>
  <div class="pdf-template" ref="pdfContent" style="width: 100%; max-width: 1024px; margin: 0 auto; background-color: #020617; color: #f1f5f9;">
    <!-- "Página" do PDF -->
    <section style="width: 100%; background-color: #020617; color: #f1f5f9; display: flex; flex-direction: column; padding: 2rem;">
      <!-- Header / Identificação -->
      <header class="flex items-start justify-between border-b border-slate-800 pb-6 mb-8">
        <div class="flex flex-col gap-1">
          <div class="inline-flex items-center gap-2">
            <span class="text-base font-semibold tracking-tight uppercase">
              Registro de Partida
            </span>
            <span class="h-5 w-px bg-slate-700"></span>
            <!-- Data da Partida -->
            <span class="text-sm font-medium text-slate-400">
              {{ formatDate(match.createdAt) }}
            </span>
          </div>

          <!-- Nome do campeonato / torneio (opcional) -->
          <p class="text-base font-medium text-slate-300">
            {{ match.tournament || 'Partida amistosa' }}
          </p>
        </div>

        <!-- Bloco com logo / marca do app -->
        <div class="flex flex-col items-end gap-1">
          <span class="text-sm font-semibold tracking-tight uppercase text-slate-200">
            VB
          </span>
          <span class="text-xs font-medium text-slate-500">
            Controle de Partidas
          </span>
        </div>
      </header>

      <!-- Placar Principal -->
      <section class="border border-slate-800 rounded-xl p-5 mb-8 bg-slate-900/60">
        <div class="flex items-start justify-between gap-6">
          <!-- Equipe A -->
          <div class="flex-1 flex flex-col gap-2">
            <p class="text-xs font-medium uppercase tracking-tight text-slate-400">
              Equipe A
            </p>
            <p class="text-xl font-semibold tracking-tight text-slate-50">
              {{ match.teamA.name }}
            </p>
            <p class="text-sm font-medium text-amber-400">
              {{ match.teamA.sets }} {{ match.teamA.sets === 1 ? 'set vencido' : 'sets vencidos' }}
            </p>
          </div>

          <!-- Resultado geral -->
          <div class="flex flex-col items-center justify-center min-w-[5rem]">
            <p class="text-xs font-medium uppercase text-slate-500">
              Placar Geral
            </p>
            <div class="inline-flex items-baseline gap-2 mt-1">
              <span class="text-3xl font-semibold tracking-tight text-slate-50">
                {{ match.teamA.sets }}
              </span>
              <span class="text-lg font-semibold tracking-tight text-slate-500">
                x
              </span>
              <span class="text-3xl font-semibold tracking-tight text-slate-50">
                {{ match.teamB.sets }}
              </span>
            </div>
            <p class="text-xs font-medium mt-1 text-slate-500">
              Melhor de
              <span class="font-semibold text-slate-300">
                {{ match.rules?.maxSets || 5 }}
              </span>
              sets
            </p>
          </div>

          <!-- Equipe B -->
          <div class="flex-1 flex flex-col gap-2 items-end text-right">
            <p class="text-xs font-medium uppercase tracking-tight text-slate-400">
              Equipe B
            </p>
            <p class="text-xl font-semibold tracking-tight text-slate-50">
              {{ match.teamB.name }}
            </p>
            <p class="text-sm font-medium text-amber-400">
              {{ match.teamB.sets }} {{ match.teamB.sets === 1 ? 'set vencido' : 'sets vencidos' }}
            </p>
          </div>
        </div>

        <!-- Vencedor -->
        <div v-if="match.winner !== undefined" class="mt-4 border border-emerald-600/60 rounded-lg bg-emerald-500/10 px-3 py-2 inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M8 21h8"></path>
            <path d="M12 17v4"></path>
            <path d="M7 4h10v5a5 5 0 1 1-10 0V4Z"></path>
            <path d="M5 9.5 4 9a3 3 0 0 1-1-4l1-2h3v5"></path>
            <path d="m19 9.5 1-0.5a3 3 0 0 0 1-4l-1-2h-3v5"></path>
          </svg>
          <p class="text-sm font-medium text-emerald-300">
            Vencedor:
            <span class="font-semibold text-emerald-200">
              {{ match.winner === 0 ? match.teamA.name : match.teamB.name }}
            </span>
          </p>
        </div>
      </section>

      <!-- Dados Gerais da Partida -->
      <section class="mb-8">
        <h2 class="text-base font-semibold tracking-tight text-slate-100 mb-3">
          Dados da partida
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 border border-slate-800 rounded-xl p-4 bg-slate-900/40">
          <!-- Início -->
          <div class="flex flex-col gap-1">
            <span class="text-xs font-medium uppercase tracking-tight text-slate-500">
              Início
            </span>
            <span class="text-base font-medium text-slate-100">
              {{ formatTime(match.startTime) }}
            </span>
          </div>

          <!-- Término -->
          <div class="flex flex-col gap-1">
            <span class="text-xs font-medium uppercase tracking-tight text-slate-500">
              Término
            </span>
            <span class="text-base font-medium text-slate-100">
              {{ formatTime(match.endTime) }}
            </span>
          </div>

          <!-- Duração -->
          <div class="flex flex-col gap-1">
            <span class="text-xs font-medium uppercase tracking-tight text-slate-500">
              Duração
            </span>
            <span class="text-base font-medium text-slate-100">
              {{ calculateDuration(match.startTime, match.endTime) }}
            </span>
          </div>

          <!-- Data -->
          <div class="flex flex-col gap-1">
            <span class="text-xs font-medium uppercase tracking-tight text-slate-500">
              Data
            </span>
            <span class="text-base font-medium text-slate-100">
              {{ formatDate(match.createdAt) }}
            </span>
          </div>
        </div>
      </section>

      <!-- Detalhamento dos Sets -->
      <section v-if="match.setsHistory && match.setsHistory.length > 0" class="mb-8">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-semibold tracking-tight text-slate-100">
            Detalhamento dos sets
          </h2>
          <span class="text-xs font-medium text-slate-500">
            {{ match.setsHistory.length }} {{ match.setsHistory.length === 1 ? 'set disputado' : 'sets disputados' }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article v-for="set in match.setsHistory" :key="set.setNumber" class="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
            <div class="flex items-center justify-between mb-3">
              <div class="inline-flex items-center gap-2">
                <span class="text-xs font-semibold uppercase tracking-tight text-slate-400">
                  Set
                </span>
                <span class="text-sm font-semibold tracking-tight text-slate-100">
                  {{ set.setNumber }}
                </span>
              </div>
              <span v-if="set.winner !== undefined" class="text-xs font-medium text-emerald-300">
                Vencedor: {{ set.winner === 0 ? set.teamA.name : set.teamB.name }}
              </span>
            </div>

            <div class="flex items-center justify-between gap-4">
              <!-- Time A -->
              <div class="flex-1 flex flex-col gap-1">
                <span class="text-xs font-medium uppercase tracking-tight text-slate-500">
                  {{ set.teamA.name }}
                </span>
                <span class="text-xl font-semibold tracking-tight text-slate-50">
                  {{ set.teamA.score }}
                </span>
              </div>

              <span class="text-base font-semibold tracking-tight text-slate-500">
                x
              </span>

              <!-- Time B -->
              <div class="flex-1 flex flex-col gap-1 items-end text-right">
                <span class="text-xs font-medium uppercase tracking-tight text-slate-500">
                  {{ set.teamB.name }}
                </span>
                <span class="text-xl font-semibold tracking-tight text-slate-50">
                  {{ set.teamB.score }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Somatória de Pontos -->
      <section class="mb-8">
        <h2 class="text-base font-semibold tracking-tight text-slate-100 mb-3">
          Somatória total de pontos
        </h2>

        <div class="border border-slate-800 rounded-xl p-4 bg-slate-900/40 flex items-center justify-between gap-6">
          <!-- Time A total -->
          <div class="flex-1 flex flex-col gap-1">
            <span class="text-xs font-medium uppercase tracking-tight text-slate-500">
              {{ match.teamA.name }}
            </span>
            <div class="inline-flex items-baseline gap-2">
              <span class="text-2xl font-semibold tracking-tight text-slate-50">
                {{ match.teamA.totalPoints || 0 }}
              </span>
              <span class="text-xs font-medium uppercase tracking-tight text-slate-500">
                pontos
              </span>
            </div>
          </div>

          <span class="text-base font-semibold tracking-tight text-slate-500">
            x
          </span>

          <!-- Time B total -->
          <div class="flex-1 flex flex-col gap-1 items-end text-right">
            <span class="text-xs font-medium uppercase tracking-tight text-slate-500">
              {{ match.teamB.name }}
            </span>
            <div class="inline-flex items-baseline gap-2">
              <span class="text-2xl font-semibold tracking-tight text-slate-50">
                {{ match.teamB.totalPoints || 0 }}
              </span>
              <span class="text-xs font-medium uppercase tracking-tight text-slate-500">
                pontos
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Estatísticas (Cartões / Tempos Técnicos) -->
      <section class="mb-8">
        <h2 class="text-base font-semibold tracking-tight text-slate-100 mb-3">
          Estatísticas disciplinares e técnicas
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Time A -->
          <article class="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
            <h3 class="text-sm font-semibold tracking-tight text-slate-100 mb-3">
              {{ match.teamA.name }}
            </h3>

            <dl class="space-y-2">
              <div class="flex items-center justify-between">
                <dt class="text-sm font-medium text-slate-400">
                  Cartões amarelos
                </dt>
                <dd class="text-base font-medium text-slate-100">
                  {{ match.teamA.yellowCards || 0 }}
                </dd>
              </div>

              <div class="flex items-center justify-between">
                <dt class="text-sm font-medium text-slate-400">
                  Cartões vermelhos
                </dt>
                <dd class="text-base font-medium text-slate-100">
                  {{ match.teamA.redCards || 0 }}
                </dd>
              </div>

              <div class="flex items-center justify-between">
                <dt class="text-sm font-medium text-slate-400">
                  Tempos técnicos
                </dt>
                <dd class="text-base font-medium text-slate-100">
                  {{ match.teamA.timeoutsUsed || 0 }}
                </dd>
              </div>
            </dl>
          </article>

          <!-- Time B -->
          <article class="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
            <h3 class="text-sm font-semibold tracking-tight text-slate-100 mb-3">
              {{ match.teamB.name }}
            </h3>

            <dl class="space-y-2">
              <div class="flex items-center justify-between">
                <dt class="text-sm font-medium text-slate-400">
                  Cartões amarelos
                </dt>
                <dd class="text-base font-medium text-slate-100">
                  {{ match.teamB.yellowCards || 0 }}
                </dd>
              </div>

              <div class="flex items-center justify-between">
                <dt class="text-sm font-medium text-slate-400">
                  Cartões vermelhos
                </dt>
                <dd class="text-base font-medium text-slate-100">
                  {{ match.teamB.redCards || 0 }}
                </dd>
              </div>

              <div class="flex items-center justify-between">
                <dt class="text-sm font-medium text-slate-400">
                  Tempos técnicos
                </dt>
                <dd class="text-base font-medium text-slate-100">
                  {{ match.teamB.timeoutsUsed || 0 }}
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      <!-- Registro Cronológico da Partida -->
      <section v-if="match.matchLog && match.matchLog.length > 0" class="mb-8">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-semibold tracking-tight text-slate-100">
            Registro da partida
          </h2>
          <span class="text-xs font-medium text-slate-500">
            {{ match.matchLog.length }} {{ match.matchLog.length === 1 ? 'evento' : 'eventos' }}
          </span>
        </div>

        <div class="border border-slate-800 rounded-xl bg-slate-900/40">
          <ol class="divide-y divide-slate-800">
            <li v-for="(entry, index) in match.matchLog" :key="index" class="flex items-start gap-3 px-4 py-2">
              <span class="text-xs font-medium text-slate-500 mt-0.5">
                {{ formatLogTime(entry.timestamp) }}
              </span>
              <p class="text-sm font-medium text-slate-100">
                {{ formatLogEntry(entry) }}
              </p>
            </li>
          </ol>
        </div>
      </section>

      <!-- Rodapé / Assinaturas -->
      <footer class="mt-6 pt-4 border-t border-slate-800 flex flex-col gap-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Assinatura 1 -->
          <div class="flex flex-col gap-2">
            <div class="h-px bg-slate-700"></div>
            <p class="text-xs font-medium text-slate-400">
              Árbitro(a)
            </p>
          </div>

          <!-- Assinatura 2 -->
          <div class="flex flex-col gap-2">
            <div class="h-px bg-slate-700"></div>
            <p class="text-xs font-medium text-slate-400">
              Representante {{ match.teamA.name }}
            </p>
          </div>

          <!-- Assinatura 3 -->
          <div class="flex flex-col gap-2">
            <div class="h-px bg-slate-700"></div>
            <p class="text-xs font-medium text-slate-400">
              Representante {{ match.teamB.name }}
            </p>
          </div>
        </div>

        <p class="text-xs font-medium text-slate-500 text-right">
          Documento gerado automaticamente em
          <span class="text-slate-300">
            {{ new Date().toLocaleString('pt-BR') }}
          </span>
        </p>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  match: {
    type: Object,
    required: true
  }
})

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatTime = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
}

const formatLogTime = (timestamp) => {
  if (!timestamp) return '--:--'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
}

const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return 'N/A'
  
  let start, end
  
  if (startTime.toDate) {
    start = startTime.toDate()
  } else {
    start = new Date(startTime)
  }
  
  if (endTime.toDate) {
    end = endTime.toDate()
  } else {
    end = new Date(endTime)
  }
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 'N/A'
  
  const durationMs = end - start
  const hours = Math.floor(durationMs / (1000 * 60 * 60))
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 0) {
    return `${hours}h ${minutes}min`
  } else {
    return `${minutes}min`
  }
}

const formatLogEntry = (entry) => {
  const timestamp = entry.timestamp ? formatLogTime(entry.timestamp) : ''
  
  switch (entry.type) {
    case 'point':
      return `${entry.team} marcou ponto - Placar: ${entry.scoreA} x ${entry.scoreB}`
    case 'set_end':
      return `Fim do Set ${entry.setNumber} - Vencedor: ${entry.winner}`
    case 'timeout':
      return `${entry.team} solicitou tempo técnico`
    case 'yellow_card':
      return `Cartão Amarelo aplicado a ${entry.team}`
    case 'red_card':
      return `Cartão Vermelho aplicado a ${entry.team}`
    case 'substitution':
      return `Substituição realizada por ${entry.team}`
    case 'match_end':
      return `Fim da Partida - Vencedor: ${entry.winner}`
    default:
      return entry.description || JSON.stringify(entry)
  }
}
</script>

<style>
.pdf-template * {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
  color-adjust: exact !important;
}
</style>

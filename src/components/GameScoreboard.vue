<script setup>
import { ref } from 'vue'
import TopBar from './TopBar.vue'
import ScoreboardGame from './ScoreboardGame.vue'

const subtitle = ref('Jogo • Melhor de 3 sets')
const scoreboardRef = ref(null)

const handleSubtitleUpdate = (text) => {
  if (typeof text === 'string') {
    subtitle.value = text
  }
}

const handleNewMatch = () => {
  if (scoreboardRef.value) {
    scoreboardRef.value.newMatch()
  }
}

const handleExport = () => {
  if (scoreboardRef.value) {
    scoreboardRef.value.exportSummary()
  }
}

const handleOpenSettings = () => {
  if (scoreboardRef.value) {
    scoreboardRef.value.settingsOpen = true
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#0b0b0f] text-white/90">
    <TopBar
      :subtitle="subtitle"
      @new-match="handleNewMatch"
      @export="handleExport"
      @open-settings="handleOpenSettings"
    />
    <main class="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col gap-6">
      <ScoreboardGame
        ref="scoreboardRef"
        @update-subtitle="handleSubtitleUpdate"
      />
    </main>
  </div>
</template>

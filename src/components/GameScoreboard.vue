<script setup>
import { ref } from 'vue'
import ScoreboardGame from './ScoreboardGame.vue'

const scoreboardRef = ref(null)
</script>

<template>
  <ScoreboardGame ref="scoreboardRef" />
</template>

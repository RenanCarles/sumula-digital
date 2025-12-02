<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="trophy-icon">🏆</div>
      
      <h1 class="modal-title">PARTIDA ENCERRADA</h1>
      
      <div class="teams-result">
        <div class="team-result" :class="{ winner: winnerTeam === 0 }">
          <div class="team-name">{{ teamA.name }}</div>
          <div class="team-sets">{{ teamA.sets }} sets</div>
          <div v-if="winnerTeam === 0" class="winner-badge">VENCEDOR</div>
        </div>

        <div class="vs-divider">X</div>

        <div class="team-result" :class="{ winner: winnerTeam === 1 }">
          <div class="team-name">{{ teamB.name }}</div>
          <div class="team-sets">{{ teamB.sets }} sets</div>
          <div v-if="winnerTeam === 1" class="winner-badge">VENCEDOR</div>
        </div>
      </div>

      <div class="modal-actions">
        <button class="modal-button secondary" @click="closeModal">
          FECHAR
        </button>
        <button class="modal-button primary" @click="goToHistory">
          VER HISTÓRICO
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  show: Boolean,
  teamA: Object,
  teamB: Object,
  winnerTeam: Number
})

const emit = defineEmits(['close'])
const router = useRouter()

const closeModal = () => {
  emit('close')
}

const goToHistory = () => {
  emit('close')
  router.push({ name: 'History' })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 3rem 2rem;
  max-width: 600px;
  width: 100%;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.trophy-icon {
  font-size: 4rem;
  text-align: center;
  margin-bottom: 1rem;
  animation: bounce 1s ease infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.modal-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0 0 2rem;
}

.teams-result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.team-result {
  flex: 1;
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.team-result.winner {
  background: rgba(255, 215, 0, 0.15);
  border-color: #ffd700;
  transform: scale(1.05);
}

.team-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.team-sets {
  font-size: 1.75rem;
  font-weight: 800;
  color: #ffd700;
  margin-bottom: 0.25rem;
}

.team-total-points {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.winner-badge {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #1a2a6c;
  font-weight: 800;
  font-size: 0.875rem;
  border-radius: 20px;
  display: inline-block;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
}

.vs-divider {
  font-size: 2rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.modal-button {
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
}

.modal-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.modal-button.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-button.primary {
  background: linear-gradient(90deg, #139428, #0fa03f);
  color: white;
  box-shadow: 0 4px 14px rgba(19, 148, 40, 0.4);
}

.modal-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(19, 148, 40, 0.5);
}

@media (max-width: 640px) {
  .teams-result {
    flex-direction: column;
    gap: 1rem;
  }

  .vs-divider {
    transform: rotate(90deg);
  }

  .modal-actions {
    flex-direction: column;
  }

  .modal-button {
    width: 100%;
  }
}
</style>

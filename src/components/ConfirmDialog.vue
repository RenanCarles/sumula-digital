<template>
  <div v-if="show" class="modal-overlay" @click="cancel">
    <div class="modal-content" @click.stop>
      <div class="warning-icon">⚠️</div>
      
      <h2 class="modal-title">Confirmar Exclusão</h2>
      
      <p class="modal-message">
        Tem certeza que deseja excluir esta partida?<br>
        <strong>Esta ação não pode ser desfeita.</strong>
      </p>

      <div class="modal-actions">
        <button class="modal-button secondary" @click="cancel">
          CANCELAR
        </button>
        <button class="modal-button danger" @click="confirm">
          SIM, EXCLUIR
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean
})

const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => {
  emit('confirm')
}

const cancel = () => {
  emit('cancel')
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
  animation: fadeIn 0.2s ease;
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
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  animation: slideUp 0.2s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.warning-icon {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
}

.modal-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.modal-message {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 2rem;
  line-height: 1.6;
}

.modal-message strong {
  color: #ff3b30;
  font-weight: 700;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.modal-button {
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  flex: 1;
}

.modal-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.modal-button.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.modal-button.danger {
  background: linear-gradient(135deg, #ff3b30 0%, #ff6b6b 100%);
  color: white;
  box-shadow: 0 4px 14px rgba(255, 59, 48, 0.4);
}

.modal-button.danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 59, 48, 0.5);
}

@media (max-width: 640px) {
  .modal-actions {
    flex-direction: column;
  }
}
</style>

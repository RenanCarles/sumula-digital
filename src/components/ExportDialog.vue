<template>
  <div v-if="show" class="dialog-overlay" @click.self="closeDialog">
    <div class="dialog-container">
      <div class="dialog-header">
        <h2 class="dialog-title">{{ selectedOption ? 'Informações de Contato' : 'Exportar Súmula' }}</h2>
        <button class="close-button" @click="closeDialog" title="Fechar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="dialog-content">
        <!-- Tela de seleção de opções -->
        <div v-if="!selectedOption">
          <p class="dialog-description">Escolha como deseja exportar a súmula desta partida:</p>

          <div class="export-options">
            <button class="export-option pdf-option" @click="handleExport('pdf')">
              <div class="option-icon pdf-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <path d="M12 18v-6"/>
                  <path d="M9 15l3 3 3-3"/>
                </svg>
              </div>
              <div class="option-content">
                <h3 class="option-title">Baixar PDF</h3>
                <p class="option-description">Salvar súmula completa em arquivo PDF</p>
              </div>
            </button>

            <button class="export-option whatsapp-option" @click="selectOption('whatsapp')">
              <div class="option-icon whatsapp-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div class="option-content">
                <h3 class="option-title">WhatsApp</h3>
                <p class="option-description">Compartilhar resumo via WhatsApp</p>
              </div>
            </button>

            <button class="export-option email-option" @click="selectOption('email')">
              <div class="option-icon email-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div class="option-content">
                <h3 class="option-title">Email</h3>
                <p class="option-description">Enviar súmula por email</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Formulário WhatsApp -->
        <div v-else-if="selectedOption === 'whatsapp'" class="contact-form">
          <button class="back-btn" @click="goBack">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Voltar
          </button>
          
          <div class="form-icon whatsapp-icon-large">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          
          <p class="form-description">Digite o número de telefone com DDD para enviar via WhatsApp:</p>
          
          <div class="input-group">
            <label for="phone" class="input-label">Número de Telefone</label>
            <input
              id="phone"
              v-model="phoneNumber"
              type="tel"
              class="input-field"
              placeholder="(11) 99999-9999"
              @input="formatPhone"
              maxlength="15"
            />
            <span class="input-hint">Exemplo: (11) 98765-4321</span>
          </div>

          <button 
            class="submit-btn whatsapp-btn-submit" 
            @click="handleExport('whatsapp')"
            :disabled="!isPhoneValid"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Enviar via WhatsApp
          </button>
        </div>

        <!-- Formulário Email -->
        <div v-else-if="selectedOption === 'email'" class="contact-form">
          <button class="back-btn" @click="goBack">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Voltar
          </button>
          
          <div class="form-icon email-icon-large">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          
          <p class="form-description">Digite o endereço de email para enviar a súmula:</p>
          
          <div class="input-group">
            <label for="email" class="input-label">Endereço de Email</label>
            <input
              id="email"
              v-model="emailAddress"
              type="email"
              class="input-field"
              placeholder="exemplo@email.com"
            />
            <span class="input-hint">Exemplo: contato@exemplo.com.br</span>
          </div>

          <button 
            class="submit-btn email-btn-submit" 
            @click="handleExport('email')"
            :disabled="!isEmailValid"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Enviar por Email
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'export'])

const selectedOption = ref(null)
const phoneNumber = ref('')
const emailAddress = ref('')

const isPhoneValid = computed(() => {
  const digitsOnly = phoneNumber.value.replace(/\D/g, '')
  return digitsOnly.length >= 10
})

const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(emailAddress.value)
})

const formatPhone = () => {
  let value = phoneNumber.value.replace(/\D/g, '')
  
  if (value.length <= 10) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  } else {
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  }
  
  phoneNumber.value = value
}

const closeDialog = () => {
  selectedOption.value = null
  phoneNumber.value = ''
  emailAddress.value = ''
  emit('close')
}

const selectOption = (type) => {
  selectedOption.value = type
}

const goBack = () => {
  selectedOption.value = null
  phoneNumber.value = ''
  emailAddress.value = ''
}

const handleExport = (type) => {
  if (type === 'pdf') {
    emit('export', { type: 'pdf' })
    closeDialog()
  } else if (type === 'whatsapp') {
    if (isPhoneValid.value) {
      const phone = phoneNumber.value.replace(/\D/g, '')
      emit('export', { type: 'whatsapp', phone })
      closeDialog()
    }
  } else if (type === 'email') {
    if (isEmailValid.value) {
      emit('export', { type: 'email', email: emailAddress.value })
      closeDialog()
    }
  }
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.dialog-container {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.dialog-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;
}

.close-button:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.dialog-content {
  padding: 1.5rem;
}

.dialog-description {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.export-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.export-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
}

.export-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.option-icon {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.pdf-icon {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #dc2626;
}

.pdf-option:hover {
  border-color: #dc2626;
}

.pdf-option:hover .pdf-icon {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  transform: scale(1.1);
}

.whatsapp-icon {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #059669;
}

.whatsapp-option:hover {
  border-color: #25D366;
}

.whatsapp-option:hover .whatsapp-icon {
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  color: white;
  transform: scale(1.1);
}

.email-icon {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #2563eb;
}

.email-option:hover {
  border-color: #2563eb;
}

.email-option:hover .email-icon {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  transform: scale(1.1);
}

.option-content {
  flex: 1;
}

.option-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.option-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

/* Formulário de Contato */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: -0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
  width: fit-content;
}

.back-btn:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.form-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 20px;
}

.whatsapp-icon-large {
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  color: white;
}

.email-icon-large {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
}

.form-description {
  text-align: center;
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
}

.input-field {
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  outline: none;
}

.input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-field::placeholder {
  color: #9ca3af;
}

.input-hint {
  font-size: 0.8rem;
  color: #9ca3af;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.submit-btn:not(:disabled):active {
  transform: translateY(0);
}

.whatsapp-btn-submit {
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
}

.whatsapp-btn-submit:not(:disabled):hover {
  background: linear-gradient(135deg, #1da851 0%, #0d7a68 100%);
}

.email-btn-submit {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
}

.email-btn-submit:not(:disabled):hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
}

@media (max-width: 640px) {
  .dialog-container {
    margin: 0 1rem;
  }

  .dialog-header {
    padding: 1.25rem;
  }

  .dialog-title {
    font-size: 1.25rem;
  }

  .dialog-content {
    padding: 1.25rem;
  }

  .export-option {
    padding: 1rem;
  }

  .option-icon {
    width: 48px;
    height: 48px;
  }

  .option-icon svg {
    width: 24px;
    height: 24px;
  }

  .option-title {
    font-size: 1rem;
  }

  .option-description {
    font-size: 0.8rem;
  }

  .form-icon {
    width: 64px;
    height: 64px;
  }

  .form-icon svg {
    width: 36px;
    height: 36px;
  }
}
</style>

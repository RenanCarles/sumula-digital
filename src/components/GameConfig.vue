<template>
  <div class="config-container">
    <div class="config-card">

      <!-- Botão voltar -->
      <button class="back-button" @click="router.push('/home')" type="button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>

      <h1 class="config-title">Configuração da Partida</h1>

      <form class="config-form" @submit.prevent="save">

        <!-- Nome das equipes -->
        <div class="section">
            <h2>Equipes</h2>

            <div class="players">
                <!-- Coluna Equipe A -->
                <div class="team">
                <h3>Equipe A</h3>

                <div class="field">
                    <label>Nome da Equipe A <span class="required">*</span></label>
                    <input v-model="teamA.name" placeholder="Equipe A" class="input" :class="{ 'error-input': errors.teamAName }" />
                    <span v-if="errors.teamAName" class="error-message">Este campo é obrigatório</span>
                </div>
                </div>

                <!-- Coluna Equipe B -->
                <div class="team">
                <h3>Equipe B</h3>

                <div class="field">
                    <label>Nome da Equipe B <span class="required">*</span></label>
                    <input v-model="teamB.name" placeholder="Equipe B" class="input" :class="{ 'error-input': errors.teamBName }" />
                    <span v-if="errors.teamBName" class="error-message">Este campo é obrigatório</span>
                </div>
                </div>
            </div>
        </div>

        <!-- Jogadores -->
        <div class="section">
          <h2>Jogadores</h2>

          <div class="players">

            <!-- Equipe A -->
            <div class="team">
              <h3>Equipe A</h3>

              <div class="field">
                <label>Jogador 1 <span class="required">*</span></label>

                <div class="dual-input">
                    <input
                    v-model="teamA.player1.name"
                    placeholder="Nome"
                    class="input"
                    :class="{ 'error-input': errors.teamAPlayer1 }"
                    />

                    <input
                    v-model="teamA.player1.number"
                    placeholder="N° da camisa"
                    class="input small-input"
                    type="number"
                    :class="{ 'error-input': errors.teamAPlayer1 }"
                    />
                </div>
                <span v-if="errors.teamAPlayer1" class="error-message">Nome e número são obrigatórios</span>
              </div>

              <label>Jogador 2 <span class="required">*</span></label>
              <div class="field">

                <div class="dual-input">
                    <input
                    v-model="teamA.player2.name"
                    placeholder="Nome"
                    class="input"
                    :class="{ 'error-input': errors.teamAPlayer2 }"
                    />

                    <input
                    v-model="teamA.player2.number"
                    placeholder="N° da camisa"
                    class="input small-input"
                    type="number"
                    :class="{ 'error-input': errors.teamAPlayer2 }"
                    />
                </div>
                <span v-if="errors.teamAPlayer2" class="error-message">Nome e número são obrigatórios</span>
              </div>

              <label>Técnico (opcional)</label>
              <input v-model="teamA.coach" placeholder="Técnico" class="input" />
            </div>

            <!-- Equipe B -->
            <div class="team">
              <h3>Equipe B</h3>

              <div class="field">

                <label>Jogador 1 <span class="required">*</span></label>

                <div class="dual-input">
                    <input
                    v-model="teamB.player1.name"
                    placeholder="Nome"
                    class="input"
                    :class="{ 'error-input': errors.teamBPlayer1 }"
                    />

                    <input
                    v-model="teamB.player1.number"
                    placeholder="N° da camisa"
                    class="input small-input"
                    type="number"
                    :class="{ 'error-input': errors.teamBPlayer1 }"
                    />
                </div>
                <span v-if="errors.teamBPlayer1" class="error-message">Nome e número são obrigatórios</span>
              </div>

              <label>Jogador 2 <span class="required">*</span></label>
              <div class="field">

                <div class="dual-input">
                    <input
                    v-model="teamB.player2.name"
                    placeholder="Nome"
                    class="input"
                    :class="{ 'error-input': errors.teamBPlayer2 }"
                    />

                    <input
                    v-model="teamB.player2.number"
                    placeholder="N° da camisa"
                    class="input small-input"
                    type="number"
                    :class="{ 'error-input': errors.teamBPlayer2 }"
                    />
                </div>
                <span v-if="errors.teamBPlayer2" class="error-message">Nome e número são obrigatórios</span>
              </div>

              <label>Técnico (opcional)</label>
              <input v-model="teamB.coach" placeholder="Técnico" class="input" />
            </div>

          </div>
        </div>

        <!-- Configurações da partida -->
        <div class="section">
          <h2>Regras da Partida</h2>

          <div class="grid">

            <div class="field">
              <label>Número de sets <span class="required">*</span></label>
              <input v-model="rules.sets" type="number" placeholder="3" class="input" :class="{ 'error-input': errors.rulesSets }" />
              <span v-if="errors.rulesSets" class="error-message">Este campo é obrigatório</span>
            </div>

            <div class="field">
              <label>Sets para vencer <span class="required">*</span></label>
              <input v-model="rules.setsToWin" type="number" placeholder="2" class="input" :class="{ 'error-input': errors.rulesSetsToWin }" />
              <span v-if="errors.rulesSetsToWin" class="error-message">Este campo é obrigatório</span>
            </div>

            <div class="field">
              <label>Pontos por set <span class="required">*</span></label>
              <input v-model="rules.pointsPerSet" type="number" placeholder="21" class="input" :class="{ 'error-input': errors.rulesPointsPerSet }" />
              <span v-if="errors.rulesPointsPerSet" class="error-message">Este campo é obrigatório</span>
            </div>

            <div class="field">
              <label>Tempos por equipe <span class="required">*</span></label>
              <input v-model="rules.timeouts" type="number" placeholder="2" class="input" :class="{ 'error-input': errors.rulesTimeouts }" />
              <span v-if="errors.rulesTimeouts" class="error-message">Este campo é obrigatório</span>
            </div>

            <div class="field">
              <label>Duração do tempo (s) <span class="required">*</span></label>
              <input v-model="rules.timeoutDuration" type="number" placeholder="30" class="input" :class="{ 'error-input': errors.rulesTimeoutDuration }" />
              <span v-if="errors.rulesTimeoutDuration" class="error-message">Este campo é obrigatório</span>
            </div>

            <div class="field">
              <label>Pontos para troca de lado <span class="required">*</span></label>
              <input v-model="rules.sideSwitch" type="number" placeholder="7" class="input" :class="{ 'error-input': errors.rulesSideSwitch }" />
              <span v-if="errors.rulesSideSwitch" class="error-message">Este campo é obrigatório</span>
            </div>

            <div class="field">
              <label>Pontos do tiebreak <span class="required">*</span></label>
              <input v-model="rules.tieBreak" type="number" placeholder="15" class="input" :class="{ 'error-input': errors.rulesTieBreak }" />
              <span v-if="errors.rulesTieBreak" class="error-message">Este campo é obrigatório</span>
            </div>

            <div class="field">
              <label>Pontos para troca de lado tiebreak <span class="required">*</span></label>
              <input v-model="rules.sideSwitchTiebreak" type="number" placeholder="5" class="input" :class="{ 'error-input': errors.rulesSideSwitchTiebreak }" />
              <span v-if="errors.rulesSideSwitchTiebreak" class="error-message">Este campo é obrigatório</span>
            </div>

          </div>
        </div>

        <button type="submit" class="save-button">Salvar Configurações</button>
      </form>

    </div>

    <!-- Toast -->
    <div v-if="showToast" class="toast" :class="toastType">
      <svg v-if="toastType === 'success'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <svg v-if="toastType === 'error'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const router = useRouter()

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const errors = ref({
  teamAName: false,
  teamBName: false,
  teamAPlayer1: false,
  teamAPlayer2: false,
  teamBPlayer1: false,
  teamBPlayer2: false,
  rulesSets: false,
  rulesSetsToWin: false,
  rulesPointsPerSet: false,
  rulesTimeouts: false,
  rulesTimeoutDuration: false,
  rulesSideSwitch: false,
  rulesTieBreak: false,
  rulesSideSwitchTiebreak: false
})

const toast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const teamA = ref({
  name: '',
  player1: { name: '', number: '' },
  player2: { name: '', number: '' },
  coach: ''
})

const teamB = ref({
  name: '',
  player1: { name: '', number: '' },
  player2: { name: '', number: '' },
  coach: ''
})

const rules = ref({
  sets: 3,
  setsToWin: 2,
  pointsPerSet: 21,
  timeouts: 1,
  timeoutDuration: 30,
  sideSwitch: 7,
  tieBreak: 15,
  sideSwitchTiebreak: 5
})

const save = async () => {
  // Resetar erros
  Object.keys(errors.value).forEach(key => errors.value[key] = false)

  // Validar campos obrigatórios
  let hasErrors = false

  if (!teamA.value.name.trim()) {
    errors.value.teamAName = true
    hasErrors = true
  }

  if (!teamB.value.name.trim()) {
    errors.value.teamBName = true
    hasErrors = true
  }

  if (!teamA.value.player1.name.trim() || !teamA.value.player1.number) {
    errors.value.teamAPlayer1 = true
    hasErrors = true
  }

  if (!teamA.value.player2.name.trim() || !teamA.value.player2.number) {
    errors.value.teamAPlayer2 = true
    hasErrors = true
  }

  if (!teamB.value.player1.name.trim() || !teamB.value.player1.number) {
    errors.value.teamBPlayer1 = true
    hasErrors = true
  }

  if (!teamB.value.player2.name.trim() || !teamB.value.player2.number) {
    errors.value.teamBPlayer2 = true
    hasErrors = true
  }

  if (!rules.value.sets || rules.value.sets < 1) {
    errors.value.rulesSets = true
    hasErrors = true
  }

  if (!rules.value.setsToWin || rules.value.setsToWin < 1) {
    errors.value.rulesSetsToWin = true
    hasErrors = true
  }

  if (!rules.value.pointsPerSet || rules.value.pointsPerSet < 1) {
    errors.value.rulesPointsPerSet = true
    hasErrors = true
  }

  if (rules.value.timeouts === null || rules.value.timeouts === undefined || rules.value.timeouts < 0) {
    errors.value.rulesTimeouts = true
    hasErrors = true
  }

  if (!rules.value.timeoutDuration || rules.value.timeoutDuration < 1) {
    errors.value.rulesTimeoutDuration = true
    hasErrors = true
  }

  if (!rules.value.sideSwitch || rules.value.sideSwitch < 1) {
    errors.value.rulesSideSwitch = true
    hasErrors = true
  }

  if (!rules.value.tieBreak || rules.value.tieBreak < 1) {
    errors.value.rulesTieBreak = true
    hasErrors = true
  }

  if (!rules.value.sideSwitchTiebreak || rules.value.sideSwitchTiebreak < 1) {
    errors.value.rulesSideSwitchTiebreak = true
    hasErrors = true
  }

  if (hasErrors) {
    toast('Por favor, preencha todos os campos obrigatórios', 'error')
    return
  }

  try {
    const user = auth.currentUser
    if (!user) {
      toast('Você precisa estar logado para salvar configurações', 'error')
      return
    }

    console.log('Usuário autenticado:', user.uid, user.email)

    const gameConfig = {
      userId: user.uid,
      userEmail: user.email,
      teamA: teamA.value,
      teamB: teamB.value,
      rules: rules.value,
      status: 'configured',
      createdAt: serverTimestamp()
    }
    
    console.log('Tentando salvar configuração:', gameConfig)

    const docRef = await addDoc(collection(db, 'gameConfigs'), gameConfig)
    
    console.log('Configuração salva com ID:', docRef.id)
    toast('Configurações salvas com sucesso!')
    
    // Redirecionar após 1.5 segundos
    setTimeout(() => {
      router.push('/home')
    }, 1500)
  } catch (error) {
    console.error('Erro detalhado:', error)
    console.error('Código do erro:', error.code)
    console.error('Mensagem:', error.message)
    
    if (error.code === 'permission-denied') {
      toast('Erro de permissão no Firebase. Verifique as regras do Firestore.', 'error')
    } else {
      toast(`Erro ao salvar: ${error.message}`, 'error')
    }
  }
}
</script>

<style scoped>
/* === PLACEHOLDERS BRANCOS E VISÍVEIS === */
input::placeholder,
select::placeholder,
textarea::placeholder {
  color: #ffffff;
  opacity: 0.85;
}

input,
select,
textarea {
  color: #fff;
}

.v-field__input {
  color: rgba(255, 255, 255, 0.8); /* ou o tom que você quiser */
}

.config-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #1a2a6c, #2b5876, #4e79a6);
}

.config-card {
  width: 100%;
  max-width: 900px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateX(-3px);
}

.back-button svg {
  transition: transform 0.3s ease;
}

.back-button:hover svg {
  transform: translateX(-3px);
}

.config-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 2rem;
}

.section h2 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
}

.row {
  display: flex;
  gap: 1rem;
}

.players {
  display: flex;
  gap: 2rem;
}

.team {
  flex: 1;
}

.input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.8rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.field label {
  font-size: 0.85rem;
  margin-bottom: 4px;
  display: block;
  opacity: 0.85;
}

.required {
  color: #ef4444;
  font-weight: bold;
  margin-left: 2px;
}

.error-input {
  border: 2px solid #ef4444 !important;
  background: rgba(239, 68, 68, 0.1) !important;
}

.error-message {
  display: block;
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 4px;
  margin-bottom: 8px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.dual-input {
  display: flex;
  gap: 0.5rem;
}

.small-input {
  max-width: 120px;
}

/* === SELECT MAIS VISÍVEL E BONITO === */
.select-input {
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='none' stroke='white' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 18px;
  cursor: pointer;
}

.save-button {
  width: 100%;
  padding: 1rem;
  background: #4a90e2;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1rem;
}

.save-button:hover {
  background: #357abd;
}

.toast {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: slideDown 0.3s ease-out;
}

.toast.success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.toast.error {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>

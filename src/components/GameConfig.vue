<template>
  <div class="config-container">
    <div class="config-card">

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
                    <label>Nome da Equipe A</label>
                    <input v-model="teamA.name" placeholder="Equipe A" class="input" />
                </div>
                </div>

                <!-- Coluna Equipe B -->
                <div class="team">
                <h3>Equipe B</h3>

                <div class="field">
                    <label>Nome da Equipe B</label>
                    <input v-model="teamB.name" placeholder="Equipe B" class="input" />
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
                <label>Jogador 1</label>

                <div class="dual-input">
                    <input
                    v-model="teamA.player1.name"
                    placeholder="Nome"
                    class="input"
                    />

                    <input
                    v-model="teamA.player1.number"
                    placeholder="N° da camisa"
                    class="input small-input"
                    type="number"
                    />
                </div>
              </div>

              <label>Jogador 2</label>
              <div class="field">

                <div class="dual-input">
                    <input
                    v-model="teamA.player1.name"
                    placeholder="Nome"
                    class="input"
                    />

                    <input
                    v-model="teamA.player1.number"
                    placeholder="N° da camisa"
                    class="input small-input"
                    type="number"
                    />
                </div>
              </div>

              <label>Técnico (opcional)</label>
              <input v-model="teamA.coach" placeholder="Técnico" class="input" />
            </div>

            <!-- Equipe B -->
            <div class="team">
              <h3>Equipe B</h3>

              <div class="field">

                <label>Jogador 1</label>

                <div class="dual-input">
                    <input
                    v-model="teamA.player1.name"
                    placeholder="Nome"
                    class="input"
                    />

                    <input
                    v-model="teamA.player1.number"
                    placeholder="N° da camisa"
                    class="input small-input"
                    type="number"
                    />
                </div>
              </div>

              <label>Jogador 2</label>
              <div class="field">

                <div class="dual-input">
                    <input
                    v-model="teamA.player1.name"
                    placeholder="Nome"
                    class="input"
                    />

                    <input
                    v-model="teamA.player1.number"
                    placeholder="N° da camisa"
                    class="input small-input"
                    type="number"
                    />
                </div>
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
              <label>Número de sets</label>
              <input v-model="rules.sets" type="number" placeholder="3" class="input" />
            </div>

            <div class="field">
              <label>Sets para vencer</label>
              <input v-model="rules.setsToWin" type="number" placeholder="2" class="input" />
            </div>

            <div class="field">
              <label>Pontos por set</label>
              <input v-model="rules.pointsPerSet" type="number" placeholder="21" class="input" />
            </div>

            <div class="field">
              <label>Tempos por equipe</label>
              <input v-model="rules.timeouts" type="number" placeholder="2" class="input" />
            </div>

            <div class="field">
              <label>Duração do tempo (s)</label>
              <input v-model="rules.timeoutDuration" type="number" placeholder="30" class="input" />
            </div>

            <div class="field">
              <label>Pontos para troca de lado</label>
              <input v-model="rules.sideSwitch" type="number" placeholder="7" class="input" />
            </div>

            <div class="field">
              <label>Pontos do tiebreak</label>
              <input v-model="rules.tieBreak" type="number" placeholder="15" class="input" />
            </div>

            <div class="field">
              <label>Pontos para troca de lado tiebreak</label>
              <input v-model="rules.sideSwitchTiebreak" type="number" placeholder="5" class="input" />
            </div>

          </div>
        </div>

        <button type="submit" class="save-button">Salvar Configurações</button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const teamA = ref({
  name: '',
  player1: '',
  player2: '',
  coach: ''
})

const teamB = ref({
  name: '',
  player1: '',
  player2: '',
  coach: ''
})

const rules = ref({
  sets: 3,
  setsToWin: 2,
  pointsPerSet: 21,
  timeouts: 2,
  timeoutDuration: 30,
  sideSwitch: 7,
  tieBreak: 15
})

const winner = ref('')

const save = () => {
  console.log("Configurações salvas:", {
    teamA: teamA.value,
    teamB: teamB.value,
    rules: rules.value,
    winner: winner.value
  })
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

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
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
</style>

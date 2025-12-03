<template>
  <div class="detail-container">
    <div class="detail-card" v-if="match">
      <button class="back-button" @click="$router.push({ name: 'History' })">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>

      <h1 class="detail-title">DETALHES DA PARTIDA</h1>

      <div class="match-header">
        <div class="team-info">
          <div class="team-name">{{ match.teamA.name }}</div>
          <div class="team-sets">{{ match.teamA.sets }} sets</div>
        </div>
        
        <div class="vs">X</div>
        
        <div class="team-info">
          <div class="team-name">{{ match.teamB.name }}</div>
          <div class="team-sets">{{ match.teamB.sets }} sets</div>
        </div>
      </div>

      <div class="winner-banner" v-if="match.winner !== undefined">
        🏆 Vencedor: {{ match.winner === 0 ? match.teamA.name : match.teamB.name }}
      </div>

      <div class="sets-detail" v-if="match.setsHistory && match.setsHistory.length > 0">
        <h2 class="section-title">DETALHAMENTO DOS SETS</h2>
        <div class="sets-grid">
          <div v-for="set in match.setsHistory" :key="set.setNumber" class="set-card">
            <div class="set-number">SET {{ set.setNumber }}</div>
            <div class="set-scores">
              <div class="set-team">
                <span class="team-label">{{ set.teamA.name }}</span>
                <div class="team-points">
                  <span class="set-score">{{ set.teamA.score }}</span>
                </div>
              </div>
              <div class="vs-separator">x</div>
              <div class="set-team">
                <span class="team-label">{{ set.teamB.name }}</span>
                <div class="team-points">
                  <span class="set-score">{{ set.teamB.score }}</span>
                </div>
              </div>
            </div>
            <div class="set-winner" v-if="set.winner !== undefined">
              🏆 {{ set.winner === 0 ? set.teamA.name : set.teamB.name }}
            </div>
          </div>
        </div>
        
        <div class="total-points-section">
          <h3 class="total-title">SOMATÓRIA TOTAL DE PONTOS</h3>
          <div class="total-scores">
            <div class="total-team">
              <span class="total-team-name">{{ match.teamA.name }}</span>
              <span class="total-team-score">{{ match.teamA.totalPoints }}</span>
              <span class="total-label">pontos</span>
            </div>
            <div class="vs-separator">x</div>
            <div class="total-team">
              <span class="total-team-name">{{ match.teamB.name }}</span>
              <span class="total-team-score">{{ match.teamB.totalPoints }}</span>
              <span class="total-label">pontos</span>
            </div>
          </div>
        </div>
      </div>

      <div class="match-info">
        <div class="info-item">
          <span class="info-label">Horário de Início:</span>
          <span class="info-value">{{ formatTime(match.startTime) }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Horário de Término:</span>
          <span class="info-value">{{ formatTime(match.endTime) }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Duração:</span>
          <span class="info-value">{{ calculateDuration(match.startTime, match.endTime) }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Data:</span>
          <span class="info-value">{{ formatDate(match.createdAt) }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Sets:</span>
          <span class="info-value">Melhor de {{ match.rules.maxSets }}</span>
        </div>
        
      </div>

      <div class="stats-section">
        <h2 class="section-title">ESTATÍSTICAS</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-team">{{ match.teamA.name }}</div>
            <div class="stat-items">
              <div class="stat-item">
                <span class="stat-label">Cartões Amarelos:</span>
                <span class="stat-value">{{ match.teamA.yellowCards || 0 }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Cartões Vermelhos:</span>
                <span class="stat-value">{{ match.teamA.redCards || 0 }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Tempos Técnicos:</span>
                <span class="stat-value">{{ match.teamA.timeoutsUsed || 0 }}</span>
              </div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-team">{{ match.teamB.name }}</div>
            <div class="stat-items">
              <div class="stat-item">
                <span class="stat-label">Cartões Amarelos:</span>
                <span class="stat-value">{{ match.teamB.yellowCards || 0 }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Cartões Vermelhos:</span>
                <span class="stat-value">{{ match.teamB.redCards || 0 }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Tempos Técnicos:</span>
                <span class="stat-value">{{ match.teamB.timeoutsUsed || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="log-section">
        <h2 class="section-title">REGISTRO DA PARTIDA</h2>
        <div class="log-list">
          <div 
            v-for="(entry, index) in match.matchLog" 
            :key="index"
            class="log-entry"
          >
            <span class="log-text">{{ formatLogEntry(entry) }}</span>
          </div>
        </div>
      </div>

      <!-- Botão Baixar PDF -->
      <div class="export-section">
        <button class="export-main-button" @click="handleDownloadPDF">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <path d="M12 18v-6"/>
            <path d="M9 15l3 3 3-3"/>
          </svg>
          <span>BAIXAR PDF</span>
        </button>
      </div>

      <button class="back-home-button" @click="$router.push({ name: 'Home' })">
        VOLTAR PARA O MENU
      </button>
    </div>

    <div class="detail-card" v-else-if="loading">
      <div class="loading">Carregando detalhes...</div>
    </div>

    <div class="detail-card" v-else>
      <div class="error">Partida não encontrada</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { downloadMatchPDF } from '../utils/pdfExport'

const router = useRouter()
const route = useRoute()
const loading = ref(true)
const match = ref(null)

const loadMatch = async () => {
  loading.value = true
  try {
    const matchId = route.params.id
    const docRef = doc(db, 'history', matchId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      match.value = { id: docSnap.id, ...docSnap.data() }
    }
  } catch (error) {
    console.error('Erro ao carregar partida:', error)
    alert('Erro ao carregar detalhes da partida')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMatch()
})

const formatDate = (timestamp) => {
  if (!timestamp) return 'Data não disponível'
  const date = timestamp.toDate()
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatTime = (timestamp) => {
  if (!timestamp) return 'N/A'
  
  // Se for um Timestamp do Firebase
  if (timestamp.toDate) {
    const date = timestamp.toDate()
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit'
    })
  }
  
  // Se for um Date object
  const date = new Date(timestamp)
  if (isNaN(date.getTime())) return 'N/A'
  
  return date.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
}

const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return 'N/A'
  
  let start, end
  
  // Converter Timestamp do Firebase para Date
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
  const seconds = Math.floor((durationMs % (1000 * 60)) / 1000)
  
  if (hours > 0) {
    return `${hours}h ${minutes}min ${seconds}s`
  } else if (minutes > 0) {
    return `${minutes}min ${seconds}s`
  } else {
    return `${seconds}s`
  }
}

const handleDownloadPDF = async () => {
  try {
    await downloadMatchPDF(match.value)
  } catch (error) {
    console.error('Erro ao baixar PDF:', error)
    alert('Erro ao gerar PDF. Tente novamente.')
  }
}

const formatLogEntry = (entry) => {
  // Obter o team correto do payload
  const teamIdx = entry.payload?.team
  const teamName = teamIdx !== undefined 
    ? match.value[`team${teamIdx === 0 ? 'A' : 'B'}`]?.name 
    : null
  
  switch (entry.type) {
    case 'point':
      return `${teamName || 'Equipe'} marcou ponto`
    case 'timeout':
      return `${teamName || 'Equipe'} solicitou tempo técnico`
    case 'card':
      const cardType = entry.payload?.card === 'yellow' ? 'amarelo' : 'vermelho'
      return `${teamName || 'Equipe'} recebeu cartão ${cardType}`
    case 'setEnd':
      const setNum = entry.payload?.set || entry.set || ''
      const scoreA = entry.payload?.scoreA || 0
      const scoreB = entry.payload?.scoreB || 0
      return `Fim do set ${setNum} - ${match.value.teamA.name} ${scoreA} x ${scoreB} ${match.value.teamB.name}`
    case 'switch':
      return `Troca de lado`
    case 'matchEnd':
      const winnerIdx = entry.payload?.winner
      const winner = winnerIdx === 0 ? match.value.teamA.name : match.value.teamB.name
      return `🏆 Fim da partida - Vencedor: ${winner}`
    case 'serve':
      return `${teamName || 'Equipe'} vai sacar`
    default:
      return entry.type
  }
}
</script>

<style scoped>
.detail-container {
  min-height: 100vh;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #1a2a6c 0%, #2b5876 50%, #4e79a6 100%);
}

/* Seção de Exportação */
.export-section {
  margin-top: 2rem;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
}

.export-main-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #1a2a6c;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.export-main-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.6);
  background: linear-gradient(135deg, #ffed4e 0%, #ffd700 100%);
}

.export-main-button:active {
  transform: translateY(-1px);
}

.export-main-button svg {
  flex-shrink: 0;
  stroke-width: 2.5;
}

@media (max-width: 640px) {
  .export-main-button {
    width: 100%;
    justify-content: center;
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}

.back-home-button {
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #1a2a6c;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
}

.sets-detail {
  margin: 2rem 0;
}

.sets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.set-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.set-number {
  font-size: 1.25rem;
  font-weight: bold;
  color: #ffd700;
  text-align: center;
  margin-bottom: 1rem;
}

.set-scores {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.set-team {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.team-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
}

.team-points {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.set-score {
  font-size: 2rem;
  font-weight: bold;
  color: white;
}

.total-points-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.total-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #ffd700;
  text-align: center;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
}

.total-scores {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
}

.total-team {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.total-team-name {
  font-size: 1.1rem;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
}

.total-team-score {
  font-size: 3rem;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}

.total-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.vs-separator {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: bold;
}

.set-winner {
  text-align: center;
  margin-top: 1rem;
  padding: 0.5rem;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #1a2a6c;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
}

.detail-card {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.back-button {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-4px);
}

.detail-title {
  margin: 0 0 2rem;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.match-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

.team-info {
  flex: 1;
  text-align: center;
  color: white;
}

.team-name {
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.team-sets {
  font-size: 1.25rem;
  color: #ffd700;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.team-score {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.vs {
  font-size: 2rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.5);
}

.winner-banner {
  padding: 1rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #1a2a6c;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  border-radius: 12px;
}

.match-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

.info-item {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.info-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
}

.section-title {
  margin: 2rem 0 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-team {
  font-size: 1.125rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.stat-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.log-section {
  margin-top: 2rem;
}

.log-list {
  max-height: 400px;
  overflow-y: auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.log-list::-webkit-scrollbar {
  width: 6px;
}

.log-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.log-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.log-entry {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: white;
  font-size: 0.875rem;
}

.log-time {
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.5);
  font-family: monospace;
}

.log-text {
  flex: 1;
}

.loading, .error {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
}

.error {
  color: #ff6b6b;
}
</style>

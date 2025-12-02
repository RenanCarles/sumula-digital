<template>
  <div class="history-container">
    <div class="history-card">
      <button class="back-button" @click="$router.push({ name: 'Home' })">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>

      <h1 class="history-title">HISTÓRICO DE PARTIDAS</h1>

      <div v-if="loading" class="loading">Carregando...</div>

      <div v-else-if="matches.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M3 3v5h5M3.05 13A9 9 0 1 0 5 5.27L3 8M12 7v5l3 3"/>
        </svg>
        <p>Nenhuma partida encontrada</p>
        <button class="home-button primary" @click="$router.push({ name: 'Home' })">
          INICIAR PARTIDA
        </button>
      </div>

      <div v-else class="matches-list">
        <div 
          v-for="match in matches" 
          :key="match.id"
          class="match-item"
        >
          <button 
            class="match-button"
            @click="viewMatch(match.id)"
          >
            <div class="match-teams">
              {{ match.teamA.name }} x {{ match.teamB.name }}
            </div>
            <div class="match-score">
              {{ match.teamA.sets }} - {{ match.teamB.sets }}
            </div>
            <div class="match-points" v-if="match.setsHistory && match.setsHistory.length > 0">
              <div v-for="set in match.setsHistory" :key="set.setNumber" class="set-points">
                Set {{ set.setNumber }}: {{ set.teamA.score }} - {{ set.teamB.score }}
              </div>
              <div class="total-points">
                Total: {{ match.teamA.totalPoints }} - {{ match.teamB.totalPoints }}
              </div>
            </div>
            <div class="match-date">
              {{ formatDate(match.createdAt) }}
            </div>
          </button>
          <button 
            class="delete-button"
            @click.stop="deleteMatch(match.id)"
            title="Excluir partida"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
            </svg>
          </button>
        </div>
      </div>

      <ConfirmDialog 
        :show="showConfirmDialog"
        @confirm="confirmDelete"
        @cancel="cancelDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '../firebase/config'
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore'
import ConfirmDialog from './ConfirmDialog.vue'

const router = useRouter()
const loading = ref(true)
const matches = ref([])
const showConfirmDialog = ref(false)
const matchToDelete = ref(null)

onMounted(async () => {
  await loadMatches()
})

const loadMatches = async () => {
  loading.value = true
  try {
    const user = auth.currentUser
    if (!user) {
      router.push({ name: 'Login' })
      return
    }

    const historyRef = collection(db, 'history')
    const q = query(
      historyRef,
      where('userId', '==', user.uid)
    )
    
    const querySnapshot = await getDocs(q)
    const matchesList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Ordenar no lado do cliente por createdAt (mais recente primeiro)
    matchesList.sort((a, b) => {
      const timeA = a.createdAt?.seconds || 0
      const timeB = b.createdAt?.seconds || 0
      return timeB - timeA
    })

    matches.value = matchesList
  } catch (error) {
    console.error('Erro ao carregar histórico:', error)
    // Se houver erro de permissões ou collection não existe, apenas mostrar vazio
    matches.value = []
  } finally {
    loading.value = false
  }
}

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

const viewMatch = (matchId) => {
  router.push({ name: 'MatchDetail', params: { id: matchId } })
}

const deleteMatch = (matchId) => {
  matchToDelete.value = matchId
  showConfirmDialog.value = true
}

const confirmDelete = async () => {
  try {
    console.log('Tentando excluir partida:', matchToDelete.value)
    const matchRef = doc(db, 'history', matchToDelete.value)
    await deleteDoc(matchRef)
    console.log('Partida excluída com sucesso do Firebase')
    
    // Remover da lista local
    matches.value = matches.value.filter(match => match.id !== matchToDelete.value)
    
    showConfirmDialog.value = false
    matchToDelete.value = null
  } catch (error) {
    console.error('Erro ao excluir partida:', error)
    alert(`Erro ao excluir partida: ${error.message}`)
    showConfirmDialog.value = false
    matchToDelete.value = null
  }
}

const cancelDelete = () => {
  showConfirmDialog.value = false
  matchToDelete.value = null
}
</script>

<style scoped>
.history-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #1a2a6c 0%, #2b5876 50%, #4e79a6 100%);
}

.history-card {
  position: relative;
  width: 100%;
  max-width: 600px;
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

.history-title {
  margin: 0 0 2rem;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.empty-state svg {
  opacity: 0.5;
}

.empty-state p {
  font-size: 1.1rem;
  margin: 0;
}

.matches-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.matches-list::-webkit-scrollbar {
  width: 6px;
}

.matches-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.matches-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.matches-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.match-item {
  display: flex;
  gap: 0.75rem;
  align-items: stretch;
}

.match-button {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.match-button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(8px);
  border-color: rgba(255, 255, 255, 0.3);
}

.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.3);
  border-radius: 12px;
  color: #ff3b30;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.delete-button:hover {
  background: rgba(255, 59, 48, 0.2);
  border-color: rgba(255, 59, 48, 0.5);
  transform: scale(1.1);
}

.delete-button svg {
  transition: transform 0.2s ease;
}

.delete-button:hover svg {
  transform: rotate(10deg);
}

.match-teams {
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.match-score {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffd700;
}

.match-points {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0.5rem 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
}

.set-points {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.total-points {
  background: rgba(255, 215, 0, 0.15);
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-weight: bold;
  color: #ffd700;
  margin-top: 0.25rem;
}

.match-date {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.home-button.primary {
  margin-top: 1rem;
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1.05rem;
  border-radius: 12px;
  border: 1px solid transparent;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: 0.3s ease;
  background: linear-gradient(90deg, #139428, #0fa03f);
  color: white;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
}

.home-button.primary:hover {
  transform: translateY(-2px);
}
</style>

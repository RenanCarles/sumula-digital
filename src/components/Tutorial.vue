<template>
  <div class="tutorial-container">
    <div class="tutorial-card">
      <button class="back-button" @click="$router.push({ name: 'Home' })">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>

      <h1 class="tutorial-title">COMO UTILIZAR</h1>
      <p class="tutorial-subtitle">Guia rápido das funcionalidades</p>

      <div class="tutorial-content">
        
        <!-- Passo 1: Configuração -->
        <div class="tutorial-section highlight">
          <div class="section-header">
            <div class="step-number">1</div>
            <h2>ANTES DE COMEÇAR</h2>
          </div>
          <div class="section-content">
            <div class="info-box">
              <p><strong>Importante:</strong> Antes de iniciar uma partida, você deve configurá-la na tela <strong>"CONFIGURAR PARTIDA"</strong>. Defina os nomes das equipes, jogadores e regras do jogo.</p>
            </div>
          </div>
        </div>

        <!-- Passo 2: Tela Principal -->
        <div class="tutorial-section">
          <div class="section-header">
            <div class="step-number">2</div>
            <h2>TELA DO PLACAR</h2>
          </div>
          <div class="section-content">
            <p class="section-intro">Durante a partida, você terá acesso aos seguintes controles:</p>

            <!-- Controles de Pontuação -->
            <div class="feature-group">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                Pontuação
              </h3>
              
              <div class="feature-item">
                <div class="icon-demo plus">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </div>
                <div class="feature-text">
                  <strong>Adicionar Ponto</strong>
                  <span>Clique para adicionar 1 ponto à equipe</span>
                </div>
              </div>

              <div class="feature-item">
                <div class="icon-demo minus">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </div>
                <div class="feature-text">
                  <strong>Remover Ponto</strong>
                  <span>Clique para remover 1 ponto da equipe</span>
                </div>
              </div>
            </div>

            <!-- Controles de Saque -->
            <div class="feature-group">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                Saque
              </h3>
              
              <div class="feature-item">
                <div class="icon-demo serve">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </div>
                <div class="feature-text">
                  <strong>Indicador de Saque</strong>
                  <span>Mostra qual equipe está sacando no momento. Clique no ícone para alternar o saque manualmente</span>
                </div>
              </div>
            </div>

            <!-- Controles de Tempo -->
            <div class="feature-group">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Tempos Técnicos
              </h3>
              
              <div class="feature-item">
                <div class="icon-demo timeout">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div class="feature-text">
                  <strong>Tempo Técnico</strong>
                  <span>Solicita tempo técnico para a equipe. Um cronômetro de 30 segundos será iniciado automaticamente</span>
                </div>
              </div>
            </div>

            <!-- Controles de Cartões -->
            <div class="feature-group">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                </svg>
                Cartões
              </h3>
              
              <div class="feature-item">
                <div class="icon-demo yellow-card">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  </svg>
                </div>
                <div class="feature-text">
                  <strong>Cartão Amarelo</strong>
                  <span>Registra advertência à equipe</span>
                </div>
              </div>

              <div class="feature-item">
                <div class="icon-demo red-card">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  </svg>
                </div>
                <div class="feature-text">
                  <strong>Cartão Vermelho</strong>
                  <span>Registra penalidade grave à equipe</span>
                </div>
              </div>
            </div>

            <!-- Controles de Undo/Redo -->
            <div class="feature-group">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 7v6h6"/>
                  <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/>
                </svg>
                Histórico
              </h3>
              
              <div class="feature-item">
                <div class="icon-demo undo">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 7v6h6"/>
                    <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/>
                  </svg>
                </div>
                <div class="feature-text">
                  <strong>Desfazer (Undo)</strong>
                  <span>Desfaz a última ação realizada no placar</span>
                </div>
              </div>

              <div class="feature-item">
                <div class="icon-demo redo">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 7v6h-6"/>
                    <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7"/>
                  </svg>
                </div>
                <div class="feature-text">
                  <strong>Refazer (Redo)</strong>
                  <span>Refaz uma ação que foi desfeita</span>
                </div>
              </div>
            </div>

            <!-- Troca de Lado -->
            <div class="feature-group">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="23 4 23 10 17 10"/>
                  <polyline points="1 20 1 14 7 14"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
                Outros Controles
              </h3>
              
              <div class="feature-item">
                <div class="icon-demo switch">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="23 4 23 10 17 10"/>
                    <polyline points="1 20 1 14 7 14"/>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                  </svg>
                </div>
                <div class="feature-text">
                  <strong>Trocar Lado</strong>
                  <span>Inverte a posição das equipes no placar (visual). Útil quando as equipes trocam de lado na quadra</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Passo 3: Registro -->
        <div class="tutorial-section">
          <div class="section-header">
            <div class="step-number">3</div>
            <h2>REGISTRO DA PARTIDA</h2>
          </div>
          <div class="section-content">
            <div class="info-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <div>
                <p><strong>Todas as ações são registradas automaticamente</strong></p>
                <p>Durante a partida, um log abaixo do placar registra todos os eventos: pontos, cartões, tempos técnicos, trocas de lado e fim de sets.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Passo 4: Fim da Partida -->
        <div class="tutorial-section">
          <div class="section-header">
            <div class="step-number">4</div>
            <h2>AO FINALIZAR</h2>
          </div>
          <div class="section-content">
            <div class="info-box success">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <div>
                <p><strong>Quando uma equipe vencer o número necessário de sets</strong>, a partida será automaticamente finalizada e salva no histórico.</p>
                <p>Você poderá:</p>
                <ul>
                  <li>Ver detalhes completos da partida</li>
                  <li>Baixar a súmula em PDF</li>
                  <li>Consultar no menu "Partidas Anteriores"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Dicas Extras -->
        <div class="tutorial-section tips">
          <div class="section-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            <h2>DICAS ÚTEIS</h2>
          </div>
          <div class="section-content">
            <ul class="tips-list">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 11 12 14 22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                A troca de lado é sugerida baseada nas regras configuradas, sendo assim clique no botão amarelo Trocar Lados
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 11 12 14 22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                Use Desfazer se cometer algum erro ao registrar pontos
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 11 12 14 22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                O sistema salva automaticamente o progresso da partida
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 11 12 14 22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                Consulte o registro da partida para acompanhar todos os eventos em tempo real
              </li>
            </ul>
          </div>
        </div>

      </div>

      <button class="back-home-button" @click="$router.push({ name: 'Home' })">
        VOLTAR PARA O MENU
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tutorial'
}
</script>

<style scoped>
.tutorial-container {
  min-height: 100vh;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #1a2a6c 0%, #2b5876 50%, #4e79a6 100%);
}

.tutorial-card {
  position: relative;
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

.tutorial-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.tutorial-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.tutorial-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tutorial-section {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.tutorial-section.highlight {
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid rgba(255, 215, 0, 0.3);
}

.tutorial-section.tips {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.section-header svg {
  color: #ffd700;
  flex-shrink: 0;
}

.step-number {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #1a2a6c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.section-header h2 {
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.section-content {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
}

.section-intro {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
}

.info-box {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  align-items: flex-start;
}

.info-box svg {
  flex-shrink: 0;
  color: #ffd700;
}

.info-box.success {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
}

.info-box.success svg {
  color: #4ade80;
}

.info-box p {
  margin: 0 0 0.75rem 0;
}

.info-box p:last-child {
  margin-bottom: 0;
}

.info-box ul {
  margin: 0.5rem 0 0 1.5rem;
  padding: 0;
}

.info-box li {
  margin: 0.5rem 0;
}

.feature-group {
  margin: 1.5rem 0;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.feature-group h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #ffd700;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.feature-group h3 svg {
  flex-shrink: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
}

.feature-item:last-child {
  margin-bottom: 0;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}

.icon-demo {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid;
  transition: all 0.3s ease;
}

.icon-demo.plus {
  background: rgba(34, 197, 94, 0.15);
  border-color: rgba(34, 197, 94, 0.4);
  color: #4ade80;
}

.icon-demo.minus {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.4);
  color: #f87171;
}

.icon-demo.serve {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.4);
  color: #60a5fa;
}

.icon-demo.timeout {
  background: rgba(146, 146, 146, 0.15);
  border-color: rgba(207, 207, 207, 0.705);
  color: #ffffff;
}

.icon-demo.yellow-card {
  background: rgba(251, 191, 36, 0.15);
  border-color: rgba(251, 191, 36, 0.4);
  color: #fbbf24;
}

.icon-demo.red-card {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.4);
  color: #f87171;
}

.icon-demo.undo,
.icon-demo.redo {
  background: rgba(156, 163, 175, 0.15);
  border-color: rgba(156, 163, 175, 0.4);
  color: #d1d5db;
}

.icon-demo.switch {
  background: rgba(251, 191, 36, 0.15);
  border-color: rgba(251, 191, 36, 0.4);
  color: #fbbf24;
}

.feature-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.feature-text strong {
  color: white;
  font-size: 1rem;
  font-weight: 600;
}

.feature-text span {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  line-height: 1.5;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
}

.tips-list li:last-child {
  margin-bottom: 0;
}

.tips-list svg {
  flex-shrink: 0;
  color: #60a5fa;
  margin-top: 2px;
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

@media (max-width: 640px) {
  .tutorial-card {
    padding: 1.5rem;
  }

  .tutorial-title {
    font-size: 1.5rem;
  }

  .feature-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .icon-demo {
    align-self: center;
  }
}
</style>

<template>
  <div class="scoreboard-preview">
    <!-- Header -->
    <div class="preview-header">
      <div class="sets-indicator">
        <span class="set-active">Set 1</span>
        <span class="set-inactive">Set 2</span>
        <span class="set-inactive">Set 3</span>
      </div>
      <button class="switch-button">
        Trocar lados
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10"/>
          <polyline points="1 20 1 14 7 14"/>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
        </svg>
      </button>
    </div>

    <!-- Scoreboard Body -->
    <div class="scoreboard-body">
      <!-- Team A -->
      <div class="team-card">
        <div class="team-header">
          <div>
            <p class="team-name">Equipe A</p>
            <p class="team-info">
              Tempo: 1
              <span class="cards-indicator">
                <span class="card yellow"></span>
                <span class="card yellow"></span>
                <span class="card red"></span>
              </span>
            </p>
          </div>
        </div>

        <div class="score-controls">
          <div class="control-buttons">
            <button class="btn-score minus">-</button>
            <button class="btn-score plus">+</button>
          </div>
          <span class="score">17</span>
        </div>

        <div class="team-footer">
          <button class="timeout-button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Tempo
          </button>
          <div class="cards-slots">
            <span class="card-slot"></span>
            <span class="card-slot"></span>
          </div>
        </div>
      </div>

      <!-- Center Info -->
      <div class="center-info">
        <div class="set-info">
          <p class="label">Set atual</p>
          <p class="set-number">Set 1</p>
          <p class="target">Alvo • 21 pts | Dif. 2</p>
        </div>

        <div class="center-buttons">
          <button class="center-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="17 1 21 5 17 9"/>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
              <polyline points="7 23 3 19 7 15"/>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
          </button>
          <button class="center-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 7v6h6"/>
              <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Team B -->
      <div class="team-card">
        <div class="team-header">
          <div class="text-right">
            <p class="team-name">Equipe B</p>
            <p class="team-info">
              Tempo: 1
              <span class="cards-indicator">
                <span class="card yellow"></span>
                <span class="card yellow"></span>
                <span class="card red"></span>
              </span>
            </p>
          </div>
        </div>

        <div class="score-controls reverse">
          <span class="score">19</span>
          <div class="control-buttons">
            <button class="btn-score plus">+</button>
            <button class="btn-score minus">-</button>
          </div>
        </div>

        <div class="team-footer reverse">
          <div class="cards-slots">
            <span class="card-slot"></span>
            <span class="card-slot"></span>
          </div>
          <button class="timeout-button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Tempo
          </button>
        </div>
      </div>
    </div>

    <!-- Footer Info -->
    <div class="preview-footer">
      <p class="log-text">
        Registro em tempo real • Sem eventos ainda. Inicie o set para
        começar a registrar pontos, tempos e cartões.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreboardPreview'
}
</script>

<style scoped>
.scoreboard-preview {
  width: 100%;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 1.25rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.sets-indicator {
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.set-active {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.375rem 0.75rem;
  border-radius: 12px;
  color: white;
}

.set-inactive {
  color: rgba(255, 255, 255, 0.5);
  padding: 0.375rem 0.75rem;
}

.switch-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border: none;
  border-radius: 12px;
  color: #1a2a6c;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
}

.scoreboard-body {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}

.team-card {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1rem;
}

.team-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.team-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.25rem 0;
}

.team-info {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cards-indicator {
  display: inline-flex;
  gap: 0.25rem;
  align-items: center;
}

.card {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.card.yellow {
  background: #fbbf24;
}

.card.red {
  background: #f87171;
}

.score-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.score-controls.reverse {
  flex-direction: row-reverse;
}

.control-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-score {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-score.plus {
  background: #34d399;
  color: #1a2a6c;
  box-shadow: 0 4px 12px rgba(52, 211, 153, 0.4);
}

.btn-score.minus {
  background: #f87171;
  color: white;
  box-shadow: 0 4px 12px rgba(248, 113, 113, 0.4);
}

.score {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
}

.team-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.team-footer.reverse {
  flex-direction: row-reverse;
}

.timeout-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.cards-slots {
  display: flex;
  gap: 0.5rem;
}

.card-slot {
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
}

.center-info {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.set-info {
  text-align: center;
}

.label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 0.5rem 0;
}

.set-number {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
}

.target {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.center-buttons {
  display: flex;
  gap: 0.75rem;
}

.center-btn {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.center-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: white;
}

.preview-footer {
  background: rgba(2, 6, 23, 0.6);
  border-radius: 12px;
  padding: 0.75rem 1rem;
}

.log-text {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  text-align: center;
}

.text-right {
  text-align: right;
}

@media (min-width: 768px) {
  .scoreboard-body {
    grid-template-columns: 1.1fr 0.9fr 1.1fr;
  }

  .preview-header {
    flex-wrap: nowrap;
  }
}
</style>

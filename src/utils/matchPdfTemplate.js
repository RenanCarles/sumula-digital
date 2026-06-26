/**
 * Gera um template HTML para exportação da súmula
 * @param {Object} match - Dados da partida
 * @returns {string} - HTML da súmula
 */
export const generateMatchHTML = (match) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 'N/A'
    const start = startTime.toDate ? startTime.toDate() : new Date(startTime)
    const end = endTime.toDate ? endTime.toDate() : new Date(endTime)

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

  const matchDate = formatDate(match.createdAt)
  const startTime = formatTime(match.startTime)
  const endTime = formatTime(match.endTime)
  const duration = calculateDuration(match.startTime, match.endTime)
  const winnerIdx = match.winner !== undefined ? match.winner : null
  const winner = winnerIdx !== null ? (winnerIdx === 0 ? match.teamA.name : match.teamB.name) : null

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Súmula da Partida</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, Helvetica, sans-serif;
      background: #f4f6fb;
      padding: 24px;
      color: #1e293b;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }

    /* ---------- HEADER ---------- */
    .header {
      background: linear-gradient(135deg, #1a2a6c 0%, #2b5876 50%, #4e79a6 100%);
      padding: 28px 32px;
      color: white;
    }

    .title {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .date {
      font-size: 12.5px;
      color: rgba(255, 255, 255, 0.75);
      font-weight: 500;
    }

    /* ---------- MATCH HEADER (placar geral) ---------- */
    .match-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: -1px 32px 0;
      transform: translateY(-18px);
      padding: 18px 20px;
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 6px 18px rgba(26, 42, 108, 0.12);
    }

    .team {
      flex: 1;
      text-align: center;
    }

    .team-name {
      font-size: 16px;
      font-weight: 700;
      color: #1a2a6c;
      margin-bottom: 4px;
    }

    .team-sets {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12.5px;
      color: #059669;
      font-weight: 700;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.35);
      border-radius: 999px;
      padding: 3px 10px;
    }

    .vs {
      font-size: 14px;
      font-weight: 700;
      color: #94a3b8;
      margin: 0 14px;
    }

    .winner-banner {
      margin: 0 32px 24px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #059669;
      padding: 10px 16px;
      border-radius: 10px;
      text-align: center;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.02em;
    }

    .body-content {
      padding: 4px 32px 32px;
    }

    .section {
      margin-bottom: 22px;
    }

    .section-title {
      font-size: 12px;
      font-weight: 700;
      color: #1a2a6c;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-title::before {
      content: '';
      width: 4px;
      height: 14px;
      border-radius: 2px;
      background: linear-gradient(180deg, #1a2a6c, #4e79a6);
      display: inline-block;
    }

    /* ---------- SETS ---------- */
    .sets-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 12px;
    }

    .set-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px;
      width: 100%;
    }

    .set-card:last-child:nth-child(odd) {
      grid-column: 1 / -1;
      width: calc(50% - 5px);
      justify-self: center;
    }

    .set-number {
      font-size: 11px;
      font-weight: 700;
      color: #2b5876;
      margin-bottom: 8px;
      text-align: center;
      letter-spacing: 0.04em;
    }

    .set-scores {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .set-team {
      flex: 1;
      text-align: center;
    }

    .set-team-name {
      font-size: 10.5px;
      color: #64748b;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .set-score {
      font-size: 20px;
      font-weight: 700;
      color: #1a2a6c;
    }

    .set-vs {
      font-size: 13px;
      color: #94a3b8;
      font-weight: 700;
    }

    .set-winner {
      text-align: center;
      margin-top: 8px;
      padding: 4px;
      background: rgba(16, 185, 129, 0.1);
      border-radius: 6px;
      font-size: 10.5px;
      color: #059669;
      font-weight: 700;
    }

    .total-points {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 14px;
    }

    .total-team {
      flex: 1;
      text-align: center;
    }

    .total-team-name {
      font-size: 11.5px;
      font-weight: 700;
      color: #1a2a6c;
      margin-bottom: 4px;
    }

    .total-score {
      font-size: 26px;
      font-weight: 700;
      color: #2b5876;
      margin-bottom: 2px;
    }

    .total-label {
      font-size: 10.5px;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* ---------- INFO ---------- */
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 12px;
    }

    .info-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 10px 12px;
    }

    .info-label {
      font-size: 10.5px;
      color: #94a3b8;
      font-weight: 700;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .info-value {
      font-size: 13.5px;
      color: #1a2a6c;
      font-weight: 700;
    }

    /* ---------- STATS ---------- */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .stat-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px;
    }

    .stat-team-name {
      font-size: 12px;
      font-weight: 700;
      color: #1a2a6c;
      margin-bottom: 8px;
      text-align: center;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      font-size: 11.5px;
    }

    .stat-row-label {
      color: #64748b;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .stat-dot {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      display: inline-block;
    }

    .stat-dot-yellow {
      background: #f59e0b;
    }

    .stat-dot-red {
      background: #ef4444;
    }

    .stat-dot-timeout {
      background: #2b5876;
    }

    .stat-row-value {
      color: #1a2a6c;
      font-weight: 700;
    }

    .vs-separator {
      font-size: 12px;
      color: #94a3b8;
      font-weight: 700;
    }

    .footer {
      margin-top: 8px;
      padding-top: 14px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      font-size: 10px;
      color: #94a3b8;
      font-weight: 500;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }

      .container {
        box-shadow: none;
        border-radius: 0;
        border: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="title">Súmula da Partida</div>
      <div class="date">${matchDate}</div>
    </div>

    <div class="match-header">
      <div class="team">
        <div class="team-name">${match.teamA.name}</div>
        <div class="team-sets">${match.teamA.sets} sets</div>
      </div>
      <div class="vs">X</div>
      <div class="team">
        <div class="team-name">${match.teamB.name}</div>
        <div class="team-sets">${match.teamB.sets} sets</div>
      </div>
    </div>

    <div class="body-content">
      ${winner ? `
      <div class="winner-banner">
        🏆 Vencedor: ${winner}
      </div>
      ` : ''}

      ${match.setsHistory && match.setsHistory.length > 0 ? `
      <div class="section">
        <div class="section-title">Detalhamento dos Sets</div>
        <div class="sets-grid">
          ${match.setsHistory.map(set => `
          <div class="set-card">
            <div class="set-number">SET ${set.setNumber}</div>
            <div class="set-scores">
              <div class="set-team">
                <div class="set-team-name">${set.teamA.name}</div>
                <div class="set-score">${set.teamA.score}</div>
              </div>
              <div class="set-vs">x</div>
              <div class="set-team">
                <div class="set-team-name">${set.teamB.name}</div>
                <div class="set-score">${set.teamB.score}</div>
              </div>
            </div>
            ${set.winner !== undefined ? `
            <div class="set-winner">
              Vencedor: ${set.winner === 0 ? set.teamA.name : set.teamB.name}
            </div>
            ` : ''}
          </div>
          `).join('')}
        </div>

        <div class="total-points">
          <div class="total-team">
            <div class="total-team-name">${match.teamA.name}</div>
            <div class="total-score">${match.teamA.totalPoints || 0}</div>
            <div class="total-label">Pontos</div>
          </div>
          <div class="vs-separator">x</div>
          <div class="total-team">
            <div class="total-team-name">${match.teamB.name}</div>
            <div class="total-score">${match.teamB.totalPoints || 0}</div>
            <div class="total-label">Pontos</div>
          </div>
        </div>
      </div>
      ` : ''}

      <div class="section">
        <div class="section-title">Informações da Partida</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Início</div>
            <div class="info-value">${startTime}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Término</div>
            <div class="info-value">${endTime}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Duração</div>
            <div class="info-value">${duration}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Sets</div>
            <div class="info-value">Melhor de ${match.rules?.maxSets || 'N/A'}</div>
          </div>
        </div>
      </div>

      ${match.arbitration ? `
      <div class="section">
        <div class="section-title">Arbitragem</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Primeiro Árbitro</div>
            <div class="info-value">${match.arbitration.firstReferee || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Segundo Árbitro</div>
            <div class="info-value">${match.arbitration.secondReferee || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Apontador</div>
            <div class="info-value">${match.arbitration.scorer || 'N/A'}</div>
          </div>
        </div>
      </div>
      ` : ''}

      <div class="section">
        <div class="section-title">Estatísticas</div>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-team-name">${match.teamA.name}</div>
            <div class="stat-row">
              <span class="stat-row-label"><span class="stat-dot stat-dot-yellow"></span>Cartões Amarelos</span>
              <span class="stat-row-value">${match.teamA.yellowCards || 0}</span>
            </div>
            <div class="stat-row">
              <span class="stat-row-label"><span class="stat-dot stat-dot-red"></span>Cartões Vermelhos</span>
              <span class="stat-row-value">${match.teamA.redCards || 0}</span>
            </div>
            <div class="stat-row">
              <span class="stat-row-label"><span class="stat-dot stat-dot-timeout"></span>Tempos Técnicos</span>
              <span class="stat-row-value">${match.teamA.timeoutsUsed || 0}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-team-name">${match.teamB.name}</div>
            <div class="stat-row">
              <span class="stat-row-label"><span class="stat-dot stat-dot-yellow"></span>Cartões Amarelos</span>
              <span class="stat-row-value">${match.teamB.yellowCards || 0}</span>
            </div>
            <div class="stat-row">
              <span class="stat-row-label"><span class="stat-dot stat-dot-red"></span>Cartões Vermelhos</span>
              <span class="stat-row-value">${match.teamB.redCards || 0}</span>
            </div>
            <div class="stat-row">
              <span class="stat-row-label"><span class="stat-dot stat-dot-timeout"></span>Tempos Técnicos</span>
              <span class="stat-row-value">${match.teamB.timeoutsUsed || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">Súmula gerada automaticamente</div>
    </div>
  </div>
</body>
</html>
  `.trim()
}
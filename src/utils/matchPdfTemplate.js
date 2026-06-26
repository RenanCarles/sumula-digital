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
  const winner = match.winner !== undefined ? (match.winner === 0 ? match.teamA.name : match.teamB.name) : null

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
      font-family: Arial, Helvetica, sans-serif;
      background: white;
      padding: 20px;
      color: #333;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
    }

    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 15px;
      border-bottom: 2px solid #1a2a6c;
    }

    .title {
      font-size: 24px;
      font-weight: bold;
      color: #1a2a6c;
      margin-bottom: 5px;
    }

    .date {
      font-size: 13px;
      color: #666;
    }

    .match-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 5px;
    }

    .team {
      flex: 1;
      text-align: center;
    }

    .team-name {
      font-size: 16px;
      font-weight: bold;
      color: #1a2a6c;
      margin-bottom: 5px;
    }

    .team-sets {
      font-size: 14px;
      color: #2b5876;
      font-weight: 600;
    }

    .vs {
      font-size: 18px;
      font-weight: bold;
      color: #1a2a6c;
      margin: 0 15px;
    }

    .winner-banner {
      background: #1a2a6c;
      color: white;
      padding: 12px;
      border-radius: 5px;
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px;
      font-size: 14px;
    }

    .section {
      margin-bottom: 25px;
    }

    .section-title {
      font-size: 14px;
      font-weight: bold;
      color: white;
      background: #1a2a6c;
      padding: 8px 12px;
      border-radius: 3px;
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    .sets-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 15px;
    }

    .set-card {
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 12px;
    }

    .set-number {
      font-size: 12px;
      font-weight: bold;
      color: #1a2a6c;
      margin-bottom: 8px;
      text-align: center;
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
      font-size: 11px;
      color: #666;
      margin-bottom: 4px;
    }

    .set-score {
      font-size: 20px;
      font-weight: bold;
      color: #1a2a6c;
    }

    .set-vs {
      font-size: 14px;
      color: #999;
      font-weight: bold;
    }

    .set-winner {
      text-align: center;
      margin-top: 8px;
      padding: 5px;
      background: #efefef;
      border-radius: 3px;
      font-size: 11px;
      color: #1a2a6c;
      font-weight: bold;
    }

    .total-points {
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 15px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 15px;
    }

    .total-team {
      flex: 1;
      text-align: center;
    }

    .total-team-name {
      font-size: 12px;
      font-weight: bold;
      color: #1a2a6c;
      margin-bottom: 5px;
    }

    .total-score {
      font-size: 28px;
      font-weight: bold;
      color: #2b5876;
      margin-bottom: 3px;
    }

    .total-label {
      font-size: 11px;
      color: #666;
      font-weight: 600;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 15px;
    }

    .info-item {
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 10px;
    }

    .info-label {
      font-size: 11px;
      color: #666;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .info-value {
      font-size: 14px;
      color: #1a2a6c;
      font-weight: bold;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .stat-card {
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 12px;
    }

    .stat-team-name {
      font-size: 12px;
      font-weight: bold;
      color: #1a2a6c;
      margin-bottom: 10px;
      text-align: center;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 12px;
      border-bottom: 1px solid #eee;
    }

    .stat-row:last-child {
      border-bottom: none;
    }

    .stat-row-label {
      color: #666;
      font-weight: 500;
    }

    .stat-row-value {
      color: #1a2a6c;
      font-weight: bold;
    }

    .vs-separator {
      font-size: 12px;
      color: #999;
      font-weight: bold;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }

      .container {
        box-shadow: none;
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="title">SÚMULA DA PARTIDA</div>
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

    ${winner ? `
    <div class="winner-banner">
      Vencedor: ${winner}
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

    <div class="section">
      <div class="section-title">Estatísticas</div>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-team-name">${match.teamA.name}</div>
          <div class="stat-row">
            <span class="stat-row-label">Cartões Amarelos</span>
            <span class="stat-row-value">${match.teamA.yellowCards || 0}</span>
          </div>
          <div class="stat-row">
            <span class="stat-row-label">Cartões Vermelhos</span>
            <span class="stat-row-value">${match.teamA.redCards || 0}</span>
          </div>
          <div class="stat-row">
            <span class="stat-row-label">Tempos Técnicos</span>
            <span class="stat-row-value">${match.teamA.timeoutsUsed || 0}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-team-name">${match.teamB.name}</div>
          <div class="stat-row">
            <span class="stat-row-label">Cartões Amarelos</span>
            <span class="stat-row-value">${match.teamB.yellowCards || 0}</span>
          </div>
          <div class="stat-row">
            <span class="stat-row-label">Cartões Vermelhos</span>
            <span class="stat-row-value">${match.teamB.redCards || 0}</span>
          </div>
          <div class="stat-row">
            <span class="stat-row-label">Tempos Técnicos</span>
            <span class="stat-row-value">${match.teamB.timeoutsUsed || 0}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim()
}

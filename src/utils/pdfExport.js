import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

/**
 * Gera um PDF da súmula da partida
 * @param {Object} match - Dados da partida
 * @returns {Blob} - PDF em formato Blob
 */
export const generateMatchPDF = async (match) => {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  let yPosition = 20

  // Configurações de fonte
  pdf.setFont('helvetica')

  // Título
  pdf.setFontSize(20)
  pdf.setFont('helvetica', 'bold')
  pdf.text('SÚMULA DA PARTIDA', pageWidth / 2, yPosition, { align: 'center' })
  yPosition += 15

  // Data e horário
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  const matchDate = match.createdAt ? new Date(match.createdAt.toDate()).toLocaleDateString('pt-BR') : 'N/A'
  pdf.text(`Data: ${matchDate}`, 15, yPosition)
  yPosition += 7

  // Times e placar
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  const matchTitle = `${match.teamA.name} ${match.teamA.sets} x ${match.teamB.sets} ${match.teamB.name}`
  pdf.text(matchTitle, pageWidth / 2, yPosition, { align: 'center' })
  yPosition += 10

  // Vencedor
  if (match.winner !== undefined) {
    pdf.setFontSize(12)
    pdf.setTextColor(0, 128, 0)
    const winner = match.winner === 0 ? match.teamA.name : match.teamB.name
    pdf.text(`Vencedor: ${winner}`, pageWidth / 2, yPosition, { align: 'center' })
    pdf.setTextColor(0, 0, 0)
    yPosition += 12
  }

  // Detalhamento dos Sets
  if (match.setsHistory && match.setsHistory.length > 0) {
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('DETALHAMENTO DOS SETS', 15, yPosition)
    yPosition += 8

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    
    match.setsHistory.forEach((set) => {
      const setInfo = `Set ${set.setNumber}: ${set.teamA.name} ${set.teamA.score} x ${set.teamB.score} ${set.teamB.name}`
      pdf.text(setInfo, 20, yPosition)
      yPosition += 6
      
      if (set.winner !== undefined) {
        const setWinner = set.winner === 0 ? set.teamA.name : set.teamB.name
        pdf.text(`   Vencedor: ${setWinner}`, 20, yPosition)
        yPosition += 6
      }
    })

    yPosition += 5
    pdf.setFont('helvetica', 'bold')
    pdf.text(`Total de Pontos: ${match.teamA.name} ${match.teamA.totalPoints || 0} x ${match.teamB.totalPoints || 0} ${match.teamB.name}`, 15, yPosition)
    yPosition += 10
  }

  // Informações da Partida
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('INFORMAÇÕES DA PARTIDA', 15, yPosition)
  yPosition += 8

  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  
  const startTime = match.startTime ? new Date(match.startTime.toDate()).toLocaleTimeString('pt-BR') : 'N/A'
  const endTime = match.endTime ? new Date(match.endTime.toDate()).toLocaleTimeString('pt-BR') : 'N/A'
  
  pdf.text(`Horário de Início: ${startTime}`, 20, yPosition)
  yPosition += 6
  pdf.text(`Horário de Término: ${endTime}`, 20, yPosition)
  yPosition += 6
  
  if (match.startTime && match.endTime) {
    const duration = calculateDuration(match.startTime, match.endTime)
    pdf.text(`Duração: ${duration}`, 20, yPosition)
    yPosition += 6
  }
  
  pdf.text(`Sets: Melhor de ${match.rules?.maxSets || 'N/A'}`, 20, yPosition)
  yPosition += 10

  // Estatísticas
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('ESTATÍSTICAS', 15, yPosition)
  yPosition += 8

  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')

  // Time A
  pdf.setFont('helvetica', 'bold')
  pdf.text(match.teamA.name, 20, yPosition)
  yPosition += 6
  pdf.setFont('helvetica', 'normal')
  pdf.text(`Cartões Amarelos: ${match.teamA.yellowCards || 0}`, 25, yPosition)
  yPosition += 5
  pdf.text(`Cartões Vermelhos: ${match.teamA.redCards || 0}`, 25, yPosition)
  yPosition += 5
  pdf.text(`Tempos Técnicos: ${match.teamA.timeoutsUsed || 0}`, 25, yPosition)
  yPosition += 8

  // Time B
  pdf.setFont('helvetica', 'bold')
  pdf.text(match.teamB.name, 20, yPosition)
  yPosition += 6
  pdf.setFont('helvetica', 'normal')
  pdf.text(`Cartões Amarelos: ${match.teamB.yellowCards || 0}`, 25, yPosition)
  yPosition += 5
  pdf.text(`Cartões Vermelhos: ${match.teamB.redCards || 0}`, 25, yPosition)
  yPosition += 5
  pdf.text(`Tempos Técnicos: ${match.teamB.timeoutsUsed || 0}`, 25, yPosition)
  yPosition += 10

  // Registro da Partida (Log de eventos)
  if (match.matchLog && match.matchLog.length > 0) {
    // Verificar se precisa de nova página
    if (yPosition > pageHeight - 40) {
      pdf.addPage()
      yPosition = 20
    }

    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('REGISTRO DA PARTIDA', 15, yPosition)
    yPosition += 8

    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')

    match.matchLog.forEach((entry, index) => {
      // Verificar se precisa de nova página
      if (yPosition > pageHeight - 15) {
        pdf.addPage()
        yPosition = 20
      }

      const logText = formatLogEntry(entry, match)
      const lines = pdf.splitTextToSize(logText, pageWidth - 40)
      
      lines.forEach(line => {
        if (yPosition > pageHeight - 15) {
          pdf.addPage()
          yPosition = 20
        }
        pdf.text(line, 20, yPosition)
        yPosition += 5
      })
    })
  }

  return pdf
}

/**
 * Faz download do PDF
 * @param {Object} match - Dados da partida
 */
export const downloadMatchPDF = async (match) => {
  try {
    const pdf = await generateMatchPDF(match)
    const teamAName = match.teamA.name.replace(/[^a-zA-Z0-9]/g, '_')
    const teamBName = match.teamB.name.replace(/[^a-zA-Z0-9]/g, '_')
    const filename = `Registro_${teamAName}_vs_${teamBName}.pdf`
    pdf.save(filename)
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
    throw error
  }
}

// Funções auxiliares
function calculateDuration(startTime, endTime) {
  if (!startTime || !endTime) return 'N/A'
  
  const start = startTime.toDate()
  const end = endTime.toDate()
  const diff = end - start
  
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  } else {
    return `${seconds}s`
  }
}

function formatLogEntry(entry, match) {
  // Obter o team correto do payload
  const teamIdx = entry.payload?.team
  const teamName = teamIdx !== undefined 
    ? match[`team${teamIdx === 0 ? 'A' : 'B'}`]?.name 
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
      return `Fim do set ${setNum} - ${match.teamA.name} ${scoreA} x ${scoreB} ${match.teamB.name}`
    case 'switch':
      return `Troca de lado`
    case 'matchEnd':
      const winnerIdx = entry.payload?.winner
      const winner = winnerIdx === 0 ? match.teamA.name : match.teamB.name
      return `Fim da partida - Vencedor: ${winner}`
    case 'serve':
      return `${teamName || 'Equipe'} vai sacar`
    default:
      return entry.type
  }
}





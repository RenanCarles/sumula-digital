# Funcionalidade de Exportação de Súmula

## 📋 O que foi implementado

Foi adicionada a funcionalidade completa de exportação e compartilhamento de súmulas das partidas com as seguintes opções:

1. **Exportar para PDF** - Baixa um arquivo PDF formatado com todos os detalhes da partida
2. **Compartilhar no WhatsApp** - Abre o WhatsApp Web com o resumo da partida formatado
3. **Compartilhar por Email** - Abre o cliente de email padrão com o resumo da partida

## 🚀 Como usar

### 1. Instalar as dependências

Primeiro, você precisa instalar as bibliotecas necessárias:

```bash
npm install jspdf html2canvas
```

### 2. Testar a funcionalidade

1. Acesse o histórico de partidas
2. Clique em uma partida para ver os detalhes
3. Role até o final da página de detalhes
4. Clique no botão **"EXPORTAR"** (botão dourado/amarelo)
5. Um diálogo será aberto com três opções:
   - **Baixar PDF**: Salva a súmula completa em arquivo PDF
   - **WhatsApp**: Compartilha o resumo via WhatsApp Web
   - **Email**: Envia a súmula por email

## 📁 Arquivos criados/modificados

### Novos arquivos criados:
- `src/utils/pdfExport.js` - Funções de exportação (PDF, WhatsApp, Email)
- `src/components/ExportDialog.vue` - Diálogo modal com opções e formulários
- `src/components/MatchPDFTemplate.vue` - Template Vue com design profissional para PDF

### Arquivo modificado:
- `src/components/MatchDetail.vue` - Botão de exportação e integração com o diálogo

## 🎨 Recursos do PDF

O PDF gerado inclui design profissional com:

### Layout Moderno:
- ✅ Design em tema escuro (slate-950) profissional
- ✅ Hierarquia visual clara e organizada
- ✅ Cards com bordas arredondadas e espaçamento adequado
- ✅ Ícones e cores que destacam informações importantes
- ✅ Typography otimizada para leitura

### Conteúdo Completo:
- ✅ Header com identificação da partida e data
- ✅ Placar principal com destaque visual
- ✅ Banner de vencedor com ícone de troféu
- ✅ Dados gerais (início, término, duração, data)
- ✅ Detalhamento de cada set em cards separados
- ✅ Somatória total de pontos
- ✅ Estatísticas disciplinares (cartões amarelos/vermelhos)
- ✅ Estatísticas técnicas (tempos técnicos)
- ✅ Registro cronológico completo da partida
- ✅ Rodapé com espaços para assinaturas
- ✅ Timestamp de geração do documento
- ✅ Paginação automática quando necessário

## 📱 Recursos do WhatsApp

O compartilhamento no WhatsApp inclui:

- ✅ Resumo formatado com emojis
- ✅ Data da partida
- ✅ Placar dos sets
- ✅ Vencedor
- ✅ Total de pontos
- ✅ Abre diretamente no WhatsApp Web

## 📧 Recursos do Email

O compartilhamento por email inclui:

- ✅ Assunto automático com nomes dos times
- ✅ Corpo do email formatado
- ✅ Todas as informações da partida
- ✅ Estatísticas detalhadas
- ✅ Abre no cliente de email padrão

## 🎯 Casos de uso

### Árbitros
- Exportar súmula oficial após a partida
- Enviar relatório por email para organizadores

### Jogadores
- Compartilhar resultado no grupo do WhatsApp
- Guardar registro das partidas em PDF

### Organizadores
- Manter arquivo das súmulas
- Compartilhar resultados oficiais

## 🔧 Personalização

Você pode personalizar facilmente:

1. **Layout do PDF**: Edite `src/utils/pdfExport.js`
2. **Texto do WhatsApp**: Modifique a função `shareMatchWhatsApp()`
3. **Corpo do Email**: Modifique a função `shareMatchEmail()`
4. **Cores dos botões**: Ajuste as classes CSS em `MatchDetail.vue`

## 📊 Exemplo de uso no código

```javascript
import { downloadMatchPDF, shareMatchWhatsApp, shareMatchEmail } from '../utils/pdfExport'

// Baixar PDF
await downloadMatchPDF(matchData)

// Compartilhar WhatsApp
await shareMatchWhatsApp(matchData)

// Compartilhar Email
await shareMatchEmail(matchData)
```

## ⚠️ Observações importantes

1. **WhatsApp Web**: O compartilhamento no WhatsApp requer que o usuário tenha o WhatsApp Web configurado
2. **Email**: O compartilhamento por email usa o cliente padrão do sistema (Gmail, Outlook, etc.)
3. **PDF**: O arquivo é baixado automaticamente para a pasta de Downloads do navegador
4. **Compatibilidade**: Funciona em todos os navegadores modernos (Chrome, Firefox, Safari, Edge)

## 🐛 Possíveis problemas e soluções

### O PDF não está sendo gerado
- Verifique se as dependências foram instaladas corretamente
- Certifique-se de que os dados da partida estão completos

### WhatsApp não abre
- Verifique se você está usando um navegador que suporta WhatsApp Web
- Tente em outro navegador

### Email não abre
- Verifique se você tem um cliente de email configurado no sistema
- Em alguns navegadores, pode ser necessário permitir pop-ups

## 🔄 Próximas melhorias possíveis

- [ ] Adicionar opção de imprimir diretamente
- [ ] Permitir personalizar o template do PDF
- [ ] Adicionar compartilhamento em redes sociais
- [ ] Gerar QR Code para compartilhamento rápido
- [ ] Enviar PDF por email automaticamente via backend
- [ ] Adicionar marca d'água no PDF
- [ ] Gerar estatísticas visuais (gráficos) no PDF

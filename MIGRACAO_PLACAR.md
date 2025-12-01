# Súmula Vôlei de Praia - Migração Vue 3

## 📋 Estrutura dos Componentes

A aplicação foi organizada em componentes modulares usando **Vue 3 Composition API** com `<script setup>`:

### Componentes Criados

```
src/components/
├── TopBar.vue              # Barra superior com logo e ações
├── EventLog.vue            # Registro cronológico de eventos da partida
├── SettingsModal.vue       # Modal de configurações do jogo
├── Toast.vue               # Notificações temporárias
├── ScoreboardGame.vue      # Componente principal com toda lógica do placar
├── GameScoreboard.vue      # Página wrapper que integra todos os componentes
└── LucideIcon.vue          # Componente wrapper para ícones Lucide
```

### Fluxo de Dados

```
GameScoreboard.vue (página principal)
    ├── TopBar.vue (eventos: new-match, export, open-settings)
    └── ScoreboardGame.vue (estado central)
        ├── EventLog.vue (exibe log de eventos)
        ├── SettingsModal.vue (configurações)
        └── Toast.vue (notificações)
```

## 🎨 Tecnologias Utilizadas

- **Vue 3** com Composition API (`<script setup>`)
- **Tailwind CSS** para estilização
- **Lucide Vue Next** para ícones
- **Vue Router** para navegação
- Estado local reativo (sem Vuex/Pinia por enquanto)

## 🚀 Como Usar

### 1. Acessar a Nova Tela

Após fazer login, acesse a rota:
```
/game-scoreboard
```

### 2. Funcionalidades Principais

#### Placar
- ➕ **Adicionar pontos**: Botões verdes (+) para cada equipe
- ➖ **Remover pontos**: Botões brancos (-) para correções
- 🔄 **Trocar lados**: Troca visual das equipes (sugestão automática a cada 7/7/5 pontos)
- 🏁 **Encerrar set**: Finaliza o set atual (valida se atingiu o alvo)

#### Controles de Jogo
- ⏱️ **Tempo técnico**: Cada equipe tem 1 tempo por set (30 segundos)
- 🟨 **Cartão amarelo**: Adiciona advertência
- 🔴 **Cartão vermelho**: Adiciona punição
- 🎯 **Saque**: Indica qual equipe está sacando
- 🔢 **Rotação**: Controla qual jogador está sacando (1 ou 2)

#### Configurações
- 🎲 **Pontos por set**: Ajuste dinâmico (set 1/2 e set 3)
- 📊 **Formato**: Melhor de 3 sets (padrão)
- ⚙️ **Ajustes**: Modal com visão geral das configurações

#### Histórico
- ↩️ **Desfazer**: Volta ação anterior (até 200 ações)
- ↪️ **Refazer**: Refaz ação desfeita
- 📝 **Registro**: Lista completa de eventos com timestamp
- 📤 **Exportar**: Copia súmula formatada para clipboard

### 3. Atalhos e Dicas

- **Set automático**: Quando uma equipe atinge o alvo com diferença mínima de 2 pontos, o set encerra automaticamente
- **Sugestão de troca**: Aparece um aviso amarelo quando é hora de trocar de lado
- **Tempo rodando**: Timer de 30s é exibido ao lado dos controles da equipe
- **Eventos registrados**: Todos os pontos, cartões, tempos e trocas são registrados no log

## 🔧 Personalização

### Modificar Pontos Padrão

Edite em `ScoreboardGame.vue`:
```javascript
const targets = ref([21, 21, 15]) // [set1, set2, set3]
const maxSets = ref(3)            // Melhor de N sets
```

### Ajustar Cores e Estilos

Todos os estilos usam Tailwind CSS. Exemplo de customização:
```html
<!-- Mudar cor do botão de adicionar ponto -->
<button class="bg-emerald-500/15 hover:bg-emerald-500/25">
  <!-- Trocar emerald por outra cor: blue, purple, etc -->
</button>
```

### Adicionar Novos Eventos ao Log

Em `ScoreboardGame.vue`, adicione um novo tipo de evento:
```javascript
// 1. Chamar addLog com novo tipo
addLog('newEventType', { data: 'exemplo' })

// 2. Atualizar renderRow em EventLog.vue
if (type === 'newEventType') {
  return {
    icon: 'star',
    classes: 'text-blue-300',
    text: `Novo evento: ${payload.data}`
  }
}
```

## 📦 Estrutura de Estado

O estado é gerenciado localmente em `ScoreboardGame.vue`:

```javascript
{
  teams: [
    {
      name: String,
      score: Number,
      sets: Number,
      timeouts: Number,
      timeoutRunning: Number,
      cards: { yellow: Number, red: Number }
    }
  ],
  currentSet: Number,
  maxSets: Number,
  targets: [Number, Number, Number],
  serving: Number,
  sideFlipped: Boolean,
  log: Array,
  history: Array,  // Desfazer
  future: Array    // Refazer
}
```

## 🎯 Próximos Passos (Opcionais)

1. **Integrar com Firebase**: Salvar partidas no Firestore
2. **Adicionar Pinia**: Gerenciamento de estado global
3. **PWA**: Tornar a aplicação instalável
4. **Relatórios**: Gerar PDF da súmula
5. **Modo offline**: Trabalhar sem internet e sincronizar depois
6. **Multi-idioma**: i18n para português/inglês/espanhol

## 🐛 Troubleshooting

### Ícones não aparecem
Verifique se o componente `LucideIcon.vue` está registrado globalmente em `main.js`:
```javascript
import LucideIcon from "./components/LucideIcon.vue"
app.component("lucide-icon", LucideIcon)
```

### Tailwind não funciona
1. Certifique-se que `tailwind.css` está importado em `main.js`
2. Verifique se `tailwind.config.js` e `postcss.config.js` existem
3. Reinicie o servidor de desenvolvimento: `npm run dev`

### Componente não atualiza
Use `ref()` ou `reactive()` para dados que mudam:
```javascript
const score = ref(0)  // ✅ Reativo
const score = 0       // ❌ Não reativo
```

## 📝 Notas de Migração

- ✅ Mantive todas as classes Tailwind originais
- ✅ Substituí `data-lucide` por componente `<lucide-icon>`
- ✅ Converti Options API para Composition API
- ✅ Separei responsabilidades em componentes menores
- ✅ Mantive toda a lógica de negócio intacta
- ✅ Adicionei sistema de histórico (undo/redo)

## 📧 Suporte

Para dúvidas ou problemas, verifique:
- Console do navegador (F12) para erros
- Terminal onde roda `npm run dev` para erros de build
- Documentação do Vue 3: https://vuejs.org/
- Documentação do Tailwind: https://tailwindcss.com/

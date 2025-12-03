# Súmula Digital

Sistema de gerenciamento de súmulas esportivas com Vue 3 + Vite + Firebase.

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta no Firebase

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/RenanCarles/sumula-digital.git
cd sumula-digital
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

⚠️ **IMPORTANTE**: Este passo é obrigatório para o funcionamento do app!

Crie um arquivo `.env` na raiz do projeto copiando o arquivo de exemplo:

```bash
cp .env.example .env
```

Depois, edite o arquivo `.env` e preencha com suas credenciais do Firebase:

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain_aqui
VITE_FIREBASE_PROJECT_ID=seu_project_id_aqui
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket_aqui
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id_aqui
VITE_FIREBASE_APP_ID=seu_app_id_aqui
```

💡 **Como obter as credenciais do Firebase:**
- Acesse o [Console do Firebase](https://console.firebase.google.com/)
- Selecione seu projeto (ou crie um novo)
- Vá em Configurações do Projeto > Geral
- Role até "Seus aplicativos" e copie as configurações

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção

## 🔒 Segurança

- O arquivo `.env` contém informações sensíveis e **NÃO** deve ser commitado
- Sempre use o `.env.example` como referência
- Para produção, configure as variáveis de ambiente no seu serviço de hospedagem

## 🛠️ Tecnologias

- Vue 3
- Vite
- Firebase (Authentication & Firestore)
- Vue Router
- Vuetify
- Tailwind CSS
- jsPDF (exportação de PDF)

## 📝 Solução de Problemas

### Tela azul ao rodar o projeto

Se você vê apenas uma tela azul ao rodar o projeto, provavelmente falta configurar o arquivo `.env`. Siga o passo 3 da instalação acima.

### Erros de autenticação

Verifique se:
- O arquivo `.env` está configurado corretamente
- As credenciais do Firebase estão corretas
- O Firebase Authentication está habilitado no console

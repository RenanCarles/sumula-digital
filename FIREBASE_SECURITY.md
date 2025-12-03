# Configuração de Segurança - Firebase

Este projeto agora usa variáveis de ambiente para proteger as credenciais do Firebase.

## Configuração Local

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` e adicione suas credenciais do Firebase

3. O arquivo `.env` está no `.gitignore` e não será commitado

## Variáveis de Ambiente

- `VITE_FIREBASE_API_KEY` - Chave da API do Firebase
- `VITE_FIREBASE_AUTH_DOMAIN` - Domínio de autenticação
- `VITE_FIREBASE_PROJECT_ID` - ID do projeto
- `VITE_FIREBASE_STORAGE_BUCKET` - Bucket de armazenamento
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - ID do remetente de mensagens
- `VITE_FIREBASE_APP_ID` - ID da aplicação

## Deploy

Ao fazer deploy (Vercel, Netlify, etc.), configure as variáveis de ambiente no painel de configuração da plataforma.

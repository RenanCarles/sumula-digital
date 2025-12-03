# 🔒 Guia de Rotação de Credenciais do Firebase

## ⚠️ ATENÇÃO: As credenciais antigas estão expostas no histórico do Git!

Como as credenciais foram commitadas anteriormente, elas estão no histórico público do GitHub. 
A melhor prática é **ROTACIONAR** (trocar) as credenciais no Firebase Console.

## 📋 Passo a Passo para Rotacionar Credenciais

### 1. Acessar o Firebase Console
- Acesse: https://console.firebase.google.com/
- Selecione seu projeto: `sumula-digital-db`

### 2. Rotacionar a API Key

#### Opção A: Restringir a API Key Atual (Mais Rápido)
1. No Firebase Console, vá em **Configurações do Projeto** (ícone de engrenagem)
2. Vá até a aba **Configurações do Projeto**
3. Role até **Suas apps** e clique em **Configurações do app da Web**
4. Anote as novas credenciais (se necessário)

#### Opção B: Criar Nova API Key no Google Cloud (Mais Seguro)
1. Acesse: https://console.cloud.google.com/
2. Selecione o projeto `sumula-digital-db`
3. Vá em **APIs & Services** > **Credentials**
4. Encontre a API Key antiga: `AIzaSyC38k1qE5AEuShOfbCiHD-hN_Sx-bxmVkk`
5. Clique em **DELETE** para remover a chave antiga
6. Clique em **+ CREATE CREDENTIALS** > **API Key**
7. Copie a nova API Key
8. Clique em **RESTRICT KEY** e configure:
   - **Application restrictions**: HTTP referrers (web sites)
   - Adicione seus domínios (localhost, seu domínio de produção)
   - **API restrictions**: Selecione apenas as APIs necessárias
9. Salve as configurações

### 3. Atualizar o arquivo .env LOCAL

Edite o arquivo `.env` na raiz do projeto com as novas credenciais:

```env
VITE_FIREBASE_API_KEY=sua_nova_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=sumula-digital-db.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sumula-digital-db
VITE_FIREBASE_STORAGE_BUCKET=sumula-digital-db.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=431972272159
VITE_FIREBASE_APP_ID=1:431972272159:web:0bd25f09b9e28ae2c7ad2a
```

### 4. Testar Localmente

```bash
# Reiniciar o servidor de desenvolvimento
npm run dev
```

Teste se a aplicação continua funcionando normalmente.

### 5. Atualizar Variáveis no Deploy (se aplicável)

Se você já fez deploy da aplicação (Vercel, Netlify, etc.):

#### Vercel
1. Acesse: https://vercel.com/
2. Selecione seu projeto
3. Vá em **Settings** > **Environment Variables**
4. Atualize `VITE_FIREBASE_API_KEY` com a nova chave
5. Faça um novo deploy

#### Netlify
1. Acesse: https://app.netlify.com/
2. Selecione seu site
3. Vá em **Site settings** > **Environment variables**
4. Atualize `VITE_FIREBASE_API_KEY` com a nova chave
5. Faça um novo deploy

## ✅ Checklist de Segurança

- [ ] API Key antiga deletada no Google Cloud Console
- [ ] Nova API Key criada com restrições adequadas
- [ ] Arquivo `.env` atualizado localmente
- [ ] Aplicação testada localmente
- [ ] Variáveis de ambiente atualizadas no serviço de deploy
- [ ] Novo deploy realizado com sucesso
- [ ] `.env` confirmado no `.gitignore`
- [ ] `.env` NÃO aparece no `git status`

## 🔐 Boas Práticas de Segurança

1. **Nunca commite arquivos `.env`** - Sempre no `.gitignore`
2. **Use restrições de API Key** - Limite por domínio/IP
3. **Ative regras de segurança do Firestore** - Proteja seus dados
4. **Monitore o uso** - Configure alertas de uso suspeito
5. **Rotacione credenciais regularmente** - A cada 90 dias

## 📚 Documentação Útil

- [Firebase Security](https://firebase.google.com/docs/projects/api-keys)
- [API Key Best Practices](https://cloud.google.com/docs/authentication/api-keys)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

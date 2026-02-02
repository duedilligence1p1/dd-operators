# Resolução do Problema de Login - Guia Rápido

## 🔴 Problema
Não consigo fazer login com `duediligence1p1@yahoo.com` na aplicação.

## ✅ Soluções Disponíveis

### Solução 1: Aguardar Deploy do Render (5-10 minutos)

Acabei de fazer push de código que adiciona um endpoint de emergência. Após o Render completar o deploy:

1. **Verificar se admin existe:**
   ```
   https://dd-operatorsdd-operators-api.onrender.com/api/emergency/check-admin
   ```

2. **Resetar senha do admin:**
   ```powershell
   Invoke-RestMethod -Uri "https://dd-operatorsdd-operators-api.onrender.com/api/emergency/reset-admin" -Method Post
   ```

3. **Fazer login:**
   - Email: `duediligence1p1@yahoo.com`
   - Senha: `DD1p1!@#`
   - URL: https://dd-operators.vercel.app

---

### Solução 2: Acessar Console do Neon (Recomendado Agora)

O problema de timeout indica que o banco Neon pode estar pausado ou inacessível.

1. **Acessar:** https://console.neon.tech
2. **Fazer login** com a conta `duediligence1p1@yahoo.com`
3. **Verificar status** do projeto/database
4. **Reativar** se estiver pausado
5. **Verificar** connection string

Após reativar o Neon:
```powershell
cd C:\Users\cadas\Downloads\1pra1_finais\DD\backend
node scripts/reset-admin-password.js
```

---

### Solução 3: Rodar Backend Local

Se o Neon estiver funcionando, você pode rodar o backend localmente:

```powershell
cd C:\Users\cadas\Downloads\1pra1_finais\DD\backend
npm start
```

Em outro terminal, rodar frontend:
```powershell
cd C:\Users\cadas\Downloads\1pra1_finais\DD\frontend  
npm run dev
```

Acessar: http://localhost:5173

---

## 🔧 Scripts Criados

- **check-db-connection.js** - Diagnostica conexão com Neon
- **reset-admin-password.js** - Cria/reseta senha do admin
- **emergency.js** (rota API) - Endpoint de emergência em produção

## ⏰ Próximos Passos

**Recomendo:** Acessar o console do Neon para verificar se o banco está ativo enquanto aguardamos o deploy do Render.

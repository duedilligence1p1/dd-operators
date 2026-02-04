# Documentação Técnica - Sistema de Due Diligence

Este documento descreve o funcionamento, a estrutura e o acesso ao sistema de Due Diligence para Operadores.

## 1. URLs de Acesso

### Produção (Oficial)
- **Frontend (UI):** `https://dd-operators.vercel.app`
- **Backend (API):** `https://dd-operators-api.onrender.com/api`

### Credenciais Administrador
- **Email:** `duediligence1p1@yahoo.com`
- **Senha:** `DD1p1!@#`
- **Função:** Gestão de operadores, visualização de estatísticas, exclusão de registros e visualização detalhada de respostas.

### Operadores
- **Acesso:** Cada operador possui um email e senha criados pelo administrador.
- **Função:** Preenchimento do formulário de conformidade em 9 etapas.

---

## 2. Estrutura do Sistema

O sistema é dividido em dois grandes módulos: **Painel Administrativo** e **Questionário do Operador**.

### 2.1 Painel Administrativo
O administrador possui uma visão macro da conformidade:
- **Estatísticas:** Cards no topo mostrando total de operadores, questionários finalizados e em andamento.
- **Lista de Operadores:** Tabela com status, progresso e ações.
- **Ações Disponíveis:**
    - `➕ Novo Operador`: Abre um modal para cadastrar nova empresa com email e senha.
    - `👁️ Ver`: Abre os detalhes técnicos de todas as respostas do operador, incluindo prazos de implementação.
    - `🔒/🔓`: Ativa ou desativa o acesso de um operador.
    - `🗑️`: Exclui permanentemente um operador e todos os seus dados.
    - `📊 Exportar CSV`: Gera uma planilha com o status de todos os operadores ou as respostas individuais de um específico.

### 2.2 Questionário do Operador (Os 9 Passos)
O questionário é focado em maturidade de compliance (LGPD, Segurança, Integridade).

#### Passo 1: Governança
- **Foco:** Nomeação de DPO, políticas de privacidade e inventário de dados.
- **Opções:** Sim, Não, Parcial, Em Implementação.
- **Destaque:** Se não for "Sim", abre campo para previsão de adequação.

#### Passo 2: Segurança da Informação
- **Foco:** Controles de acesso, MFA (Autenticação de dois fatores), firewalls e backups.

#### Passo 3: Ciclo de Vida dos Dados
- **Foco:** Retenção de dados, descarte seguro e bases legais para tratamento.

#### Passo 4: Resposta a Incidentes
- **Foco:** Planos de resposta, notificações à ANPD e histórico de vazamentos.

#### Passo 5: Apostas e Loterias
- **Foco:** Conformidade específica para o setor de apostas (AML, Jogo Responsável).

#### Passo 6: Desenvolvimento Seguro
- **Foco:** Privacy by Design, segurança no ciclo de vida do software e criptografia.

#### Passo 7: Recursos Humanos (RH)
- **Foco:** Treinamentos de segurança, NDAs, Background checks e conformidade de colaboradores.

#### Passo 8: Integridade e Transparência
- **Foco:** Canais de denúncia, código de ética e transparência com o titular de dados.

#### Passo 9: Upload de Documentos
- **Foco:** Envio da documentação comprobatória (Documento de Identidade do DPO, Políticas em PDF, etc).

---

## 3. Fluxo de Trabalho
1. O **Admin** cria o acesso para o **Operador**.
2. O **Operador** faz login e preenche as 9 etapas.
3. Se o operador marcar "Parcial" ou "Em Implementação", ele deve declarar o **prazo** no campo que aparece automaticamente.
4. Após preencher tudo, o operador clica em **Finalizar**.
5. O **Admin** revisa as respostas unificadas (Resposta + Prazo) no Dashboard.

---

## 4. Tecnologias Utilizadas
- **Frontend:** React.js, Vite, Vanilla CSS (Design Premium/Glassmorphism).
- **Backend:** Node.js, Express.
- **Banco de Dados:** PostgreSQL (Hospedado no Neon).
- **Segurança:** JWT para autenticação e Bcrypt para hashing de senhas.

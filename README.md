\# FitSchedule 🗓️

Sistema full stack de agendamentos com autenticação, dashboard e regras de negócio, desenvolvido para praticar arquitetura web moderna e experiência do usuário.

## 🚀 Funcionalidades
- Autenticação de usuários (login e registro)
- Controle de sessões
- Agendamento de horários
- Dashboard com visualização de dados
- CRUD completo
- Regras de negócio

## 🛠️ Tecnologias
**Front-end**
- React
- Tailwind CSS

**Back-end**
- Node.js
- Prisma
- Sqlite



## ⚙️ Como rodar o projeto
```bash
### Pré-requisitos
- Node.js
- Git

### Passo a passo
```bash
# Clone o repositório
git clone https://github.com/ronizera/fitschedule.git

# Entre na pasta
cd fitschedule

# Instale as dependências
npm install

# Gere o banco de dados SQLite
npx prisma migrate dev

# Rode o projeto
npm run dev

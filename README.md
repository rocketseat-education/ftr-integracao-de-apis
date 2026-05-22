# Integração de APIs

Repositório com projetos práticos de integração de APIs.

---

## Projetos

### ecotrack

Aplicacao web que calcula a pegada de carbono de atividades do dia a dia (transporte, energia) e persiste os registros no Airtable.

**Stack:** Node.js, Express, Axios

**APIs utilizadas:**

| API | Funcao |
|-----|--------|
| [Climatiq](https://www.climatiq.io/) | Calculo de emissao de CO2 com base no tipo de atividade |
| [Airtable](https://airtable.com/) | Persistencia dos registros de atividades |

**Como rodar:**

```bash
cd ecotrack/ecotrack
cp .env.example .env   # preencha com suas chaves
npm install
node src/server.js
```

O servidor sobe em `http://localhost:3000` com um frontend estatico e endpoint `POST /activity`.

---

### projeto-football-analytics

Script CLI que busca resultados da temporada 2025-2026 da Premier League, calcula a tabela de classificacao (pontos, saldo de gols, etc.) e salva no Airtable.

**Stack:** TypeScript, ts-node-dev, Axios, Airtable SDK

**APIs utilizadas:**

| API | Funcao |
|-----|--------|
| [TheSportsDB](https://www.thesportsdb.com/) | Dados de jogos e resultados da temporada |
| [Airtable](https://airtable.com/) | Persistencia da tabela de classificacao |

**Como rodar:**

```bash
cd projeto-football-analytics/football-analytics
cp .env.example .env   # preencha com suas chaves
npm install
npx ts-node-dev src/index.ts
```

A saida exibe a tabela de classificacao no terminal e envia os dados para o Airtable.

---

## Variaveis de ambiente

Cada projeto possui um `.env.example` com as chaves necessarias. Nenhuma chave real esta versionada no repositorio.

import Airtable from "airtable"; 
// Importa SDK do Airtable

import dotenv from "dotenv"; 
// Importa biblioteca para ler variáveis de ambiente

dotenv.config(); 
// Carrega o arquivo .env para process.env

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID as string);
// Inicializa conexão com Airtable
// apiKey → autenticação
// baseId → qual base será usada

export async function salvarTabela(tabela: any[]) {
  // Função que envia os dados para o Airtable

  for (const time of tabela) {
    // Percorre cada item da tabela (cada time)

    await base("Tabela").create({
      pos: time.Pos, 
      // Posição no ranking

      time: time.time, 
      // Nome do time

      pontos: time.P, 
      jogos: time.J, 
      vitorias: time.V, 
      empates: time.E, 
      derrotas: time.D, 

      gols_pro: time.GP, 
      gols_contra: time.GC, 
      saldo: time.SG, 

      data_execucao: new Date().toISOString()
      // Timestamp da execução (importante pra histórico)
    });
  }
}
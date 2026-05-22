
function criarTime() { 
  // Cria a estrutura padrão para armazenar estatísticas de um time
  // Isso evita repetição de código ao inicializar novos times

  return {
    pontos: 0,       // Total de pontos (vitória = 3, empate = 1)
    jogos: 0,        // Quantidade de jogos disputados
    vitorias: 0,     // Número de vitórias
    empates: 0,      // Número de empates
    derrotas: 0,     // Número de derrotas
    golsPro: 0,      // Gols marcados pelo time
    golsContra: 0    // Gols sofridos pelo time
  };
}

export function gerarTabela(jogos: any[]) { 
  // Função principal que transforma uma lista de jogos em uma tabela de classificação

  const finalizados = jogos.filter(
    j => j.status === "Match Finished"
  ); 
  // Filtra apenas jogos finalizados
  // Evita considerar partidas incompletas ou sem placar

  const tabela: any = {}; 
  // Objeto que armazenará os dados dos times
  // Cada chave será o nome do time (ex: "Arsenal")

  finalizados.forEach(jogo => { 
    // Percorre cada jogo finalizado

    const casa = jogo.casa; 
    const fora = jogo.fora; 
    // Identifica os dois times participantes do jogo

    if (!tabela[casa]) tabela[casa] = criarTime(); 
    // Se o time da casa ainda não existe na tabela, inicializa

    if (!tabela[fora]) tabela[fora] = criarTime(); 
    // Mesmo processo para o time visitante

    tabela[casa].jogos++; 
    tabela[fora].jogos++; 
    // Ambos participaram do jogo → incrementa número de jogos

    tabela[casa].golsPro += jogo.golsCasa; 
    tabela[casa].golsContra += jogo.golsFora; 
    // Atualiza estatísticas de gols do time da casa

    tabela[fora].golsPro += jogo.golsFora; 
    tabela[fora].golsContra += jogo.golsCasa; 
    // Atualiza estatísticas de gols do time visitante

    if (jogo.golsCasa > jogo.golsFora) { 
      // Caso vitória do time da casa

      tabela[casa].pontos += 3; 
      tabela[casa].vitorias++; 
      // Vitória vale 3 pontos

      tabela[fora].derrotas++; 
      // Time visitante perde

    } else if (jogo.golsCasa < jogo.golsFora) { 
      // Caso vitória do visitante

      tabela[fora].pontos += 3; 
      tabela[fora].vitorias++; 

      tabela[casa].derrotas++; 
      // Time da casa perde

    } else { 
      // Caso empate

      tabela[casa].pontos += 1; 
      tabela[fora].pontos += 1; 
      // Empate vale 1 ponto para cada

      tabela[casa].empates++; 
      tabela[fora].empates++; 
    }
  });

  let resultado = Object.entries(tabela).map(([time, d]: any) => ({ 
    // Converte o objeto "tabela" em array
    // Isso permite ordenar os dados depois

    Pos: 0, 
    // Placeholder (posição será definida depois)

    time, 
    // Nome do time

    P: d.pontos, 
    J: d.jogos, 
    V: d.vitorias, 
    E: d.empates, 
    D: d.derrotas, 
    GP: d.golsPro, 
    GC: d.golsContra, 

    SG: d.golsPro - d.golsContra 
    // Saldo de gols (dado derivado, não vem da API)
  }));

  resultado.sort((a: any, b: any) => { 
    // Ordena a tabela com base em múltiplos critérios

    if (b.P !== a.P) return b.P - a.P; 
    // 1º critério: pontos (maior primeiro)

    if (b.SG !== a.SG) return b.SG - a.SG; 
    // 2º critério: saldo de gols

    return b.GP - a.GP; 
    // 3º critério: gols marcados
  });

  return resultado.map((t: any, i: number) => ({ 
    ...t, 
    Pos: i + 1 
    // Define a posição final baseada na ordem do array
  }));
}
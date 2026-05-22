export function transformJogos(jogos: any[]) {
    return jogos.map((jogo: any) => ({
        casa: jogo.strHomeTeam,
        fora: jogo.strAwayTeam,
        golsCasa: Number(jogo.intHomeScore),
        golsFora: Number(jogo.intAwayScore),
        status: jogo.strStatus
    }));
}
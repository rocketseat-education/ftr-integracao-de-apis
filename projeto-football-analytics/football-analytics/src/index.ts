import { buscarJogos } from "./api";
import { transformJogos } from "./transform";
import { gerarTabela } from "./analytics";
import { salvarTabela} from "./persist";

async function main() {

    try{
    const jogos = await buscarJogos();
    console.log(`Jogos encontrados: ${jogos.length}`);

    const dados = transformJogos(jogos);
    console.log("Primeiro jogo transformado:", dados[0]);

    const tabela = gerarTabela(dados);

    console.table(tabela);    

    await salvarTabela(tabela);

} catch (error: any) {
    console.error("Erro durante execução:", error.message);
    console.error("Mensagem:", error?.message);
    console.error("Dados:", error?.response?.data);
}
}
main();
import axios from "axios";

export async function buscarJogos(){
    const response = await axios.get("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2025-2026");
    return response.data.events || [];
}
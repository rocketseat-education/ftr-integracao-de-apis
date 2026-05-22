const axios = require('axios')

// Cache em memória — evita chamar a API duas vezes para a mesma atividade
const cache = {}

async function calcularEmissao({ activityId, valor, unidade, region }) {
  const chave = `${activityId}_${valor}_${unidade}`

  if (cache[chave]) {
    console.log('✅ Cache hit — sem chamada à API')
    return cache[chave]
  }

  // Eletricidade usa energy/energy_unit; voo e carro usam distance/distance_unit
  const parameters = unidade === 'kWh'
    ? { energy: valor, energy_unit: 'kWh' }
    : { distance: valor, distance_unit: 'km' }

  // data_version obrigatório na v33+ — sem isso a API retorna invalid_input
  const emissionFactor = {
    activity_id: activityId,
    data_version: '33.33',
    ...(region && { region }) // adiciona region só quando tiver valor (ex: 'BR' p/ eletricidade)
  }

  const response = await axios.post(
    'https://api.climatiq.io/data/v1/estimate',
    { emission_factor: emissionFactor, parameters },
    {
      headers: {
        'Authorization': `Bearer ${process.env.CLIMATIQ_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )

  cache[chave] = response.data
  return response.data
}

module.exports = { calcularEmissao }
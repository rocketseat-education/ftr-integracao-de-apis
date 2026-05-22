const axios = require('axios')

const BASE_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`
const HEADERS  = {
  'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json'
}

async function salvarAtividade({ tipo, distancia, co2e, co2e_unit }) {
  const response = await axios.post(
    `${BASE_URL}/Atividades`,
    {
      records: [{
        fields: {
          tipo,
          distancia,
          co2e,
          co2e_unit,
          data: new Date().toISOString()
        }
      }]
    },
    { headers: HEADERS }
  )
  return response.data.records[0]
}

module.exports = { salvarAtividade }
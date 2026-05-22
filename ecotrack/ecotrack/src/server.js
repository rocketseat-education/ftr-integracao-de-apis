require('dotenv').config();
const express = require('express');
const { calcularEmissao } = require('./climatiq')
const { salvarAtividade } = require('./airtable')

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', message: 'Ecotrack rodando!' });
});

app.post('/activity', async (req, res) => {
  try {
    const { tipo, valor, unidade } = req.body

    if (!tipo || !valor || !unidade) {
      return res.status(400).json({ error: 'Campos tipo, valor e unidade são obrigatórios.' })
    }

    console.log('📥 Recebido:', { tipo, valor, unidade })

    // Eletricidade do Brasil requer region: 'BR' no emission_factor
    const region = tipo.startsWith('electricity-') ? 'BR' : undefined

    // 1. Calcula o CO₂ via Climatiq
    const emissao = await calcularEmissao({ activityId: tipo, valor, unidade, region })
    console.log('🌍 CO₂:', emissao.co2e, emissao.co2e_unit)

    //2. Persiste no Airtable
    const registro = await salvarAtividade({
      tipo, distancia: valor, co2e: emissao.co2e, co2e_unit: emissao.co2e_unit
    })

    res.json({ message: 'Registrado!', co2e: emissao.co2e, co2e_unit: emissao.co2e_unit, id: registro.id })
  } catch (err) {
    console.error('❌ Erro:', err.response?.data || err.message)
    res.status(500).json({ error: 'Algo deu errado. Veja o terminal.' })
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
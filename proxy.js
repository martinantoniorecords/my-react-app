const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/balance', async (req, res) => {
  try {
    const response = await axios.post('https://justanotherpanel.com/api/v2', {
      key: '717ea87ac31b29d1c7212eb6dbf4a407',
      action: 'balance'
    });

    res.json(response.data);
  } catch (error) {
    console.error('API error:', error.message);
    res.status(500).json({ error: 'API error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
// JavaScript source code

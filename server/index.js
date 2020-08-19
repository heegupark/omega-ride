require('dotenv/config');
const axios = require('axios');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const express = require('express');
const app = express();
app.use(staticMiddleware);
app.use(express.json());
// for socket communication
const http = require('http');
const server = http.createServer(app);
// GET ADDRESS
app.get('/api/address/:query', (req, res) => {
  const { query } = req.params;
  try {
    axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&input=${query}`)
      .then(data => {
        return res.status(200).send(data.data);
      })
      .catch(error => res.status(500).send(error.message));
  } catch (e) {
    return res.status(500).send();
  }
});
// GET LATITUDE AND LON
app.get('/api/latlng/:query', (req, res) => {
  const { query } = req.params;
  try {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&address=${query}`)
      .then(data => {
        return res.status(200).send(data.data);
      })
      .catch(error => res.status(500).send(error.message));
  } catch (e) {
    return res.status(500).send();
  }
});
// for error handling
app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});
server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('[http] Server listening on port', process.env.PORT);
});

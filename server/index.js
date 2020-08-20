require('dotenv/config');
const axios = require('axios');
const distance = require('google-distance-matrix');
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
app.get('/api/address/:address', (req, res) => {
  const { address } = req.params;
  try {
    axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&input=${address}`)
      .then(data => {
        return res.status(200).send(data.data);
      })
      .catch(error => res.status(500).send(error.message));
  } catch (e) {
    return res.status(500).send();
  }
});
// GET LATITUDE AND LON
app.get('/api/latlng/:address', (req, res) => {
  const { address } = req.params;
  try {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&address=${address}`)
      .then(data => {
        return res.status(200).send(data.data);
      })
      .catch(error => res.status(500).send(error.message));
  } catch (e) {
    return res.status(500).send();
  }
});
// GET DISTANCE
app.post('/api/distance', (req, res) => {
  const { origin, destination } = req.body;
  const origins = [`${origin.lat},${origin.lng}`];
  const destinations = [`${destination.lat},${destination.lng}`];
  distance.key(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  distance.units('imperial');
  distance.mode('driving');

  distance.matrix(origins, destinations, (error, distances) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    if (!distances) {
      return res.status(500).send({ error, message: 'no distances' });
    }
    if (distances.status === 'OK') {
      for (let i = 0; i < origins.length; i++) {
        for (let j = 0; j < destinations.length; j++) {
          const origin = distances.origin_addresses[i];
          const destination = distances.destination_addresses[j];
          if (distances.rows[0].elements[j].status === 'OK') {
            const distance = distances.rows[i].elements[j].distance.text;
            return res.json({ distance });
          } else {
            return res.status(500).send({ error, message: `${destination} is not reachable by land from ${origin}` });
          }
        }
      }
    }
  });
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

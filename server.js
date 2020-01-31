const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile.js')[environment];
const database = require('knex')(configuration);

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
// app.use(cors());
// // with no params/args given to cors, anyone can access from any domain
// app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Breweries';

// GET ENDPOINTS
app.get('/api/v1/breweries', async (request, response) => {
  try {
    const breweries = await database('breweries').select();
      if (breweries.length) {
        response.status(200).json({breweries});
      } else {
        response.status(404).json({
            error: `Could not find resources at this path`
        })
      }
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.get('/api/v1/breweries/:id', async (request, response) => {
  try {
    const breweries = await database('breweries').where('id', request.params.id).select();
      if (breweries.length) {
        response.status(200).json(breweries[0]);
      } else {
        response.status(404).json({
          error: `Could not find brewery with an id of ${request.params.id}`
        })
      }
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.get('/api/v1/breweries/:id/beers', async (request, response) => {
  try {
    const beers = await database('beers').where('brewery_id', request.params.id).select();
      if (beers.length) {
        response.status(200).json({beers});
      } else {
        response.status(404).json({
          error: `Could not find beers for brewery id ${request.params.id}`
        })
      }
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.get('/api/v1/beers/:id', async (request, response) => {
  try {
    const beers = await database('beers').where('id', request.params.id).select();
      if (beers.length) {
        response.status(200).json(beers[0])
      } else {
        response.status(404).json({
          error: `Could not find beer with an id of ${request.params.id}`
        })
      }
  } catch (error) {
    response.status(500).json({ error });
  }
});

// POST ENDPOINTS
app.post('/api/v1/breweries', async (request, response) => {
  const brewery = request.body;

  for (let requiredParameter of ['name', 'city', 'state', 'country', 'phone', 'website']) {
    if (!brewery[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: {name: <String>, city: <String>, state: <String>, country: <String>, phone: <String>, website: <String>}. You're missing a "${requiredParameter}" property.`});
    }
  }

  try {
    const id = await database('breweries').insert(brewery, 'id');
    response.status(201).json({ id })
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.post('/api/v1/breweries/:id/beers', async (request, response) => {
  const brewery_id = request.params.id;
  const beer = {...request.body, brewery_id: Number(brewery_id)};

  for (let requiredParameter of ['name', 'abv']) {
    if (!beer[requiredParameter]) {
      return response
        .status(422)
        .send({error: `Expected format: {name: <String>, brewery_id: <Number>, abv: <Number>}. You're missing a "${requiredParameter}" property.`})
    }
  }

  try {
    const id = await database('beers').insert(beer, 'id');
    response.status(201).json({ id })
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

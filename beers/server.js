const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const express = require('express');
const cors = require('cors');
const app = express();

// app.use(express.json());
// app.use(cors());
// // with no params/args given to cors, anyone can access from any domain
// app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Breweries';

app.get('/api/v1/breweries', async (request, response) => {
  try {
    const breweries = await database('breweries').select();
    response.status(200).json(breweries);
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

const environment = process.env.NODE_ENV || 'development';
// Assigning environment variable to default to development unless there is another environment running
const configuration = require('./knexfile.js')[environment];
// Assigning configuration variable to the info in the knexfile.js under whichever environment key applies
const database = require('knex')(configuration);
// Assigning database variable to the knex library based on the configuration variable information

const express = require('express');
// Requiring express library
const cors = require('cors');
// Requiring cors
const app = express();
// Giving app access to express library so Posts can be made

app.use(express.json());
// allowing posts by setting express to json
app.use(cors());
// allows public users to access - needed for heroku
// // with no params/args given to cors, anyone can access from any domain
app.use(express.static('public'));
// sets access to public - needed for heroku
app.set('port', process.env.PORT || 3000);
// sets port to default to 3000 unless other port is being used
app.locals.title = 'Breweries';
// sets title of app's locals key

// GET ENDPOINTS
app.get('/api/v1/breweries', async (request, response) => {
  // if user sends GET request to this path, run async action which will...
  try {
    // ...try to...
    const breweries = await database('breweries').select();
    // ...wait until it grabs everything in the breweries database table...
      if (breweries.length) {
        // ...then if it was able to grab anything...
        response.status(200).json({breweries});
        // ...return a 200 status code with the breweries object (which has to be json()'d because its not a string)....
      } else {
        // ...if it wasn't able to grab anything...
        response.status(404).json({
          // ...return a 404 error (which has to be json()'d because its not a string)...
            error: `Could not find resources at this path`
            // ...with an error object that includes the message above
        })
      }
  } catch (error) {
    // if what it tried throws an error or doesn't work...
    response.status(500).json({ error });
    // ...return a 500 status with the error object (which has to be json()'d because its not a string)
  }
});

app.get('/api/v1/breweries/:id', async (request, response) => {
  // if user sends GET request to this path, run async action which will...
  try {
    // ...try to...
    const breweries = await database('breweries').where('id', request.params.id).select();
    // ...wait until it grabs everything in the breweries database table that has an id that matches the id used in the url path...
      if (breweries.length) {
        // ...then if it was able to grab anything...
        response.status(200).json(breweries[0]);
        // ...return a 200 status code with the breweries object (not the whole array, just the single object at index 0)(which has to be json()'d because its not a string)....
      } else {
        // ...if it wasn't able to grab anything...
        response.status(404).json({
          // ...return a 404 error (which has to be json()'d because its not a string)...
          error: `Could not find brewery with an id of ${request.params.id}`
          // ...with an error object that includes the message above
        })
      }
  } catch (error) {
    // if what it tried throws an error or doesn't work...
    response.status(500).json({ error });
    // ...return a 500 status with the error object (which has to be json()'d because its not a string)
  }
});

app.get('/api/v1/breweries/:id/beers', async (request, response) => {
  // if user sends GET request to this path, run async action which will...
  try {
    // ...try to...
    const beers = await database('beers').where('brewery_id', request.params.id).select();
    // ...wait until it grabs everything in the beers database table that has a brewery_id that matches the id used in the url path...
      if (beers.length) {
        // ...then if it was able to grab anything...
        response.status(200).json({beers});
        // ...return a 200 status code with the beers object (which has to be json()'d because its not a string)....
      } else {
        // ...if it wasn't able to grab anything...
        response.status(404).json({
          // ...return a 404 error (which has to be json()'d because its not a string)...
          error: `Could not find beers for brewery id ${request.params.id}`
          // ...with an error object that includes the message above
        })
      }
  } catch (error) {
    // if what it tried throws an error or doesn't work...
    response.status(500).json({ error });
    // ...return a 500 status with the error object (which has to be json()'d because its not a string)

  }
});

app.get('/api/v1/beers/:id', async (request, response) => {
  // if user sends GET request to this path, run async action which will...
  try {
    // ...try to...
    const beers = await database('beers').where('id', request.params.id).select();
    // ...wait until it grabs everything in the beers database table that has an id that matches the id used in the url path...
      if (beers.length) {
        // ...then if it was able to grab anything...
        response.status(200).json(beers[0])
        // ...return a 200 status code with the single beer object (not the whole array, just the single object at index 0)(which has to be json()'d because its not a string)....
      } else {
        // ...if it wasn't able to grab anything...
        response.status(404).json({
          // ...return a 404 error (which has to be json()'d because its not a string)...
          error: `Could not find beer with an id of ${request.params.id}`
          // ...with an error object that includes the message above
        })
      }
  } catch (error) {
    // if what it tried throws an error or doesn't work...
    response.status(500).json({ error });
    // ...return a 500 status with the error object (which has to be json()'d because its not a string)

  }
});

// POST ENDPOINTS
app.post('/api/v1/breweries', async (request, response) => {
  // if user sends POST request to this path with a request body, run async action which will...
  const brewery = request.body;
// assign the request body to a variable
  for (let requiredParameter of ['name', 'city', 'state']) {
    // iterate over request body to ensure that the three required properties above are included (others may exist but these three are required)
    if (!brewery[requiredParameter]) {
      // if one of the required properties is missing...
      return response
      // ...return a...
        .status(422)
        // ...422 status with...
        .send({ error: `Expected format: {name: <String>, city: <String>, state: <String>, country: <String>, phone: <String>, website: <String>}. You're missing a "${requiredParameter}" property.`});
        // ...an error object with the above message
    }
  }

  try {
    // ...try to...
    const id = await database('breweries').insert(brewery, 'id');
    // ...wait until it inserts the new brewery in the breweries database table and returns the new brewery's id...
    response.status(201).json({ id: id[0] })
    // ...return a 201 response status with the new brewery's id (which has to be json()'d because its not a string)
  } catch (error) {
    // if what it tried throws an error or doesn't work...
    response.status(500).json({ error });
    // ...return a 500 status with the error object (which has to be json()'d because its not a string)
  }
});

app.post('/api/v1/breweries/:id/beers', async (request, response) => {
  // if user sends POST request to this path with a request body, run async action which will..
  const brewery_id = request.params.id;
  // assign the id from the url path to a variable
  const beer = {...request.body, brewery_id: Number(brewery_id)};
  // assign the request body and url path id to a variable
  for (let requiredParameter of ['name']) {
    // iterate over request body to ensure that the required name property is included (abv may exist but name is required)
    if (!beer[requiredParameter]) {
      // if the name property is missing...
      return response
      // ...return a...
        .status(422)
        // ...422 status with...
        .send({error: `Expected format: {name: <String>, brewery_id: <Number>, abv: <Number>}. You're missing a "${requiredParameter}" property.`})
        // an error object with the above message
    }
  }

  try {
    // ...try to...
    const id = await database('beers').insert(beer, 'id');
    // ...wait until it inserts the new beer in the beers database table and returns the new beer's id...
    response.status(201).json({ id: id[0] })
    // ...return a 201 response status with the new beer's id (which has to be json()'d because its not a string)
  } catch (error) {
    // if what it tried throws an error or doesn't work...
    response.status(500).json({ error });
    // ...return a 500 status with the error object (which has to be json()'d because its not a string)
  }
});

app.delete('/api/v1/beers/:id', async (request, response) => {
  // if user sends DELETE request to this path, run async action which will..
  const beer_id = Number(request.params.id)
  // assign the id from the url path to a variable
  try {
    // ...try to...
    const found = await database('beers').where('id', beer_id).select();
    // ...wait until it finds/grabs the beer from the beers database table that has an id that matches the url path id variable...
    if (found.length) {
      // if it can find a beer that matchs that id...
      const id = await database('beers').where('id', beer_id).del();
      // it will wait until it deletes that beer and...
      response.status(200).send(`Beer id ${beer_id} has been removed successfully`);
      // return a 200 status with the message above
    } else {
      // if it can't find a beer that matches...
      response.status(404).json({
        // ...it will send a 404 error object...
        error: `Could not find beer with an id of ${request.params.id}`
        // with the above message (which has to be json()'d because its not a string)
      })
    }
  } catch (error) {
    // if what it tried throws an error or doesn't work...
    response.status(500).json({ error });
    // ...return a 500 status with the error object (which has to be json()'d because its not a string)
  }
});

app.listen(app.get('port'), () => {
  // tells the app to listen to the assigned port (set to default 3000 above) and to run a callback function...
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
  // which will console.log the message above when the server is run on that port
});

const cleanedData = require('../../cleanedData');
const createBrewery = async (knex, brewery) => {
  const breweryId = await knex('breweries').insert({
    name: brewery.name,
    city: brewery.city,
    state: brewery.state,
    country: brewery.country,
    phone: brewery.phone,
    website: brewery.website,
  }, 'id');

  let beersPromises = brewery.beers.map(beer => {
    return createBeer(knex, {
      name: beer.name,
      abv: beer.abv,
      brewery_id: breweryId[0]
    })
  });

  return Promise.all(beersPromises);
};

const createBeer = (knex, beer) => {
  return knex('beers').insert(beer);
};

exports.seed = async (knex) => {
  try {
    await knex('beers').del()
    await knex('breweries').del()

    let breweriesPromises = cleanedData.map(brewery => {
      return createBrewery(knex, brewery);
    });

    return Promise.all(breweriesPromises);
  } catch (error) {
    console.log(`Error seeding data: ${error}`)
  }
};

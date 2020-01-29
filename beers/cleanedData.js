const beersData = require('./beersData');
const breweriesData = require('./breweriesData');

let cleanedData = breweriesData.reduce((acc, brewery) => {
  let myBeers = beersData.reduce((acc, beer) => {
    if (beer.brewery_id === brewery.id) {
      let cleanedBeer = {
        name: beer.name,
        abv: beer.abv,
      }
      acc.push(cleanedBeer)
    }
    return acc;
  }, []);

  // console.log("myBeers", myBeers);

   let updatedBrewery = {
      name: brewery.name,
      city: brewery.city,
      state: brewery.state,
      country: brewery.country,
      phone: brewery.phone,
      website: brewery.website,
      beers: myBeers
    }

    if (brewery.country === 'United States' && updatedBrewery.beers.length) {
      acc.push(updatedBrewery)
    }
  return acc;
}, [])


// console.log("CLEAN BREWERY", cleanedData[440]);

module.exports = cleanedData;

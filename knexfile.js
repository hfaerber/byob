// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/beers',
    migrations: {
      directory: './beers/db/migrations'
    },
    seeds: {
      directory: './beers/db/seeds'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './beers/db/migrations'
    },
    seeds: {
      directory: './beers/db/seeds'
    },
    useNullAsDefault: true
  }
};

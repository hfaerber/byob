
exports.up = function(knex) {
  return knex.schema
    .createTable('breweries', table => {
      table.increments('id').primary();
      table.integer('existing_id').unsigned();
      table.string('name');
      table.string('city');
      table.string('state');
      table.string('country');
      table.string('phone');
      table.string('website');
      table.timestamps(true, true);
    })
    .createTable('beers', table => {
      table.increments('id').primary();
      table.string('name');
      table.integer('abv').unsigned();
      table.integer('brewery_existing_id').unsigned();
      table.foreign('brewery_existing_id').references('breweries.id')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('beers')
    .dropTable('breweries')
};

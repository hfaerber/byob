
exports.up = function(knex) {
  return knex.schema.table('beers', table => {
    table.dropColumn('brewery_existing_id');
    table.integer('brewery_id').unsigned();
    table.foreign('brewery_id').references('breweries.id')
  })
};

exports.down = function(knex) {
  return knex.schema.table('beers', table => {
    table.dropColumn('brewery_id');
    table.integer('brewery_existing_id').unsigned();
    table.foreign('brewery_existing_id').references('breweries.id')
  })
};

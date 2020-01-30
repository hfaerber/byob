
exports.up = function(knex) {
  return knex.schema.table('beers', table => {
    table.dropColumn('abv');
  })
};

exports.down = function(knex) {
  return knex.schema.table('beers', table => {
    table.integer('abv').unsigned();
  })
};

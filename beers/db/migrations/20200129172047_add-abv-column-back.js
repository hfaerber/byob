
exports.up = function(knex) {
  return knex.schema.table('beers', table => {
    table.decimal('abv', null);
  })
};

exports.down = function(knex) {
  return knex.schema.table('beers', table => {
    table.dropColumn('abv');
  })
};

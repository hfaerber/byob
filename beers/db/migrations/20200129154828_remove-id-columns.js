
exports.up = function(knex) {
  return knex.schema.table('breweries', table => {
    table.dropColumn('existing_id');
  })
};

exports.down = function(knex) {
  return knex.schema.table('breweries', table => {
    table.integer('existing_id').unsigned();
  })
};

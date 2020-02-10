exports.up = async function(knex) {
  await knex.schema.createTable("users", table => {
    table.increments("id"); // primary key
    table.string("username");
    table.string("password");
    table.string("department");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users");
};

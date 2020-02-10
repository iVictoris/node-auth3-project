exports.up = async function(knex) {
  await knex.schema.createTable("users", table => {
    table.increments("id"); // primary key
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.string("department").notNullable();

    table.unique(["username"]);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users");
};

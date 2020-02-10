exports.up = async function(knex) {
  await knex.schema.createTable("users", table => {});

  await knex.schema.createTable("departments", table => {});
};

exports.down = async function(knex) {};

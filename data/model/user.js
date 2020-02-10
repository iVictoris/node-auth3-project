const db = require("../knex.config");

module.exports = {
  find,
  findById,
  add
};

table = "users";

const find = () => {
  return db(table);
};

const findById = id => {
  return db(table).where({ id });
};

const add = async user => {
  const id = await db(table).insert(user);
  return findById(id);
};

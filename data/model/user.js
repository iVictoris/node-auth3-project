const db = require("../knex.config");

table = "users";

const find = () => {
  return db(table);
};

const findById = id => {
  return db(table).where({ id });
};

const findByUsername = username => {
  return db(table).where({ username });
};

const add = async user => {
  const id = await db(table).insert(user);
  return findById(id);
};

module.exports = {
  find,
  findById,
  findByUsername,
  add
};

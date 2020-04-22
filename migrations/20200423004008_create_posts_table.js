exports.up = function (knex) {
  return knex.schema.createTable("posts", (t) => {
    t.increments("id");
    t.string("title");
    t.string("content");
    t.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};

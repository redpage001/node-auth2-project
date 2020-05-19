
exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
        tbl.increments();

        tbl.text("username", 125).notNullable().unique().index()
        tbl.text("password", 125).notNullable()
        tbl.text("department", 125).notNullable()
    })
};

exports.down = function(knex) {
      return knex.schema.dropTableIfExists("users");
};

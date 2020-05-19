
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: "user1", password: "password1", department: "Finance" },
        { username: "user2", password: "password2", department: "Admin" },
        { username: "user3", password: "password3", department: "Finance" },
        { username: "user4", password: "password4", department: "Human Resources" },
        { username: "user5", password: "password5", department: "Marketing" },
      ]);
    });
};


exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {id: 1, username:'user1', password:'password1'},
        {id: 2, username:'user2', password:'password2'},
        {id: 3, username:'user3', password:'password3'},
        {id: 4, username:'user4', password:'password4'},
        {id: 5, username:'user5', password:'password5'},
      ]);
    });
};

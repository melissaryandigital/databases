var db = require('../db');

module.exports = {
  messages: {
    get: function () {

      // a function which produces all the messages

      // https://expressjs.com/en/guide/database-integration.html#mysql
      // Assuming we need to:
      // Connect to the database - this happens in the db/index.js file
      // Use a SELECT statement to get all the messages from the messages table

      var queryString = 'SELECT * FROM messages';
      var queryArgs = [];

      db.query(queryString, queryArgs, (err, result, fields) => {
        if (err) { throw err; }

        console.log(result);
      });
    },


    post: function () { } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () { },
    post: function () { }
  }
};


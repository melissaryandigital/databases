var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function (sendToClient) {

      // a function which produces all the messages

      // https://expressjs.com/en/guide/database-integration.html#mysql
      // Assuming we need to:
      // Connect to the database - this happens in the db/index.js file
      // Use a SELECT statement to get all the messages from the messages table

      var queryString = 'SELECT * FROM messages INNER JOIN users ON messages.user_id = users.id INNER JOIN rooms ON messages.room_id = rooms.id';
      var queryArgs = [];

      // db.query(queryString, queryArgs, (err, result, fields) => {
      //   if (err) { throw err; }

      //   console.log(result);
      // });
      Promise.promisify(db.query).bind(db)(queryString, queryArgs)
        .then(messages => {
          sendToClient(messages);
        })
        .catch(error => {
          console.log('error grabbing messages from database:', error);
        });


    },


    post: function (messageData) {

      var queryString = `INSERT IGNORE INTO users (username) VALUES ('${messageData.username}'); INSERT IGNORE INTO rooms (roomname) VALUES ('${messageData.roomname}'); INSERT INTO messages (msg, user_id, room_id) VALUES ('${messageData.text}', (SELECT users.id FROM users WHERE users.username = '${messageData.username}'), (SELECT rooms.id FROM rooms WHERE rooms.roomname = '${messageData.roomname}'));`;

      console.log(queryString);

      db.query(queryString, (err) => {
        if (err) {
          console.log('You have a problem in your models post: ' + err);
          return;
        }

        console.log('This should be in your database, hopefully.');

      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () { },
    post: function () { }
  }
};

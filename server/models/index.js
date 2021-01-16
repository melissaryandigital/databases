var db = require('../db');
var Promise = require('bluebird');

function stringScrub(str) {
  str = str.replace(/'/g, "\\'");
  return str;
}

module.exports = {
  messages: {
    get: function (sendToClient) {

      // a function which produces all the messages

      // https://expressjs.com/en/guide/database-integration.html#mysql
      // Assuming we need to:
      // Connect to the database - this happens in the db/index.js file
      // Use a SELECT statement to get all the messages from the messages table

      var queryString = 'SELECT * from (rooms, users) INNER JOIN messages ON messages.user_id = users.id AND messages.room_id = rooms.id;';
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

      messageData.username = stringScrub(messageData.username);
      messageData.roomname = stringScrub(messageData.roomname);
      messageData.text = stringScrub(messageData.text);


      var queryString = `INSERT IGNORE INTO users (username) VALUES ('${messageData.username}'); INSERT IGNORE INTO rooms (roomname) VALUES ('${messageData.roomname}'); INSERT INTO messages (msg, user_id, room_id) VALUES ('${messageData.text}', (SELECT users.id FROM users WHERE users.username = '${messageData.username}'), (SELECT rooms.id FROM rooms WHERE rooms.roomname = '${messageData.roomname}'));`;

      db.query(queryString, (err) => {
        if (err) {
          console.log('You have a problem in your models post messages: ' + err);
          return;
        }
      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (sendToClient) {
      var queryString = 'SELECT * FROM users';
      var queryArgs = [];

      Promise.promisify(db.query).bind(db)(queryString, queryArgs)
        .then(users => {
          sendToClient(users);
        })
        .catch(error => {
          console.log('Error grabbing users from database:', error);
        });

    },
    post: function (userData) {
      userData.username = stringScrub(userData.username);

      var queryString = `INSERT IGNORE INTO users (username) VALUES ('${userData.username}')`;

      db.query(queryString, err => {
        if (err) {
          console.log('error posting user: ' + err)
        }
      });
    }
  },
};

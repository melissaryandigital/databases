//var models = require('../models');
const { User, Message } = require('../db/index.js');

module.exports = {
  messages: {
    get: function (req, res) {
      Message.findAll({ include: [User] })
        .then(function(err, results) {

          var formattedMessages = [];

          results.forEach((each) => {
            formattedMessages.push({
              objectId: each.id,
              text: each.msg,
              username: each.username,
              roomname: each.roomname,
            });

          });
          res.json({ results: formattedMessages });
        });
    }, // a function which handles a get request for all messages


    post: function (req, res) {
      User.findOrCreate({username: req.body.username})
        .then(function(err, user){

          Room.findOrCreate({roomname: req.body.roomname})
            .then(function(err, room){

              var params = {
                msg: request.body.text,
                user_id: user.id,
                roomname: room.roomname
              };
              Message.create(params)
                .then((err, results) => {
                  res.sendStatus(201);
                });
            })
        });
    }
  },
  users: {
    // Ditto as above
    get: function (req, res) {

      User.findAll()
        .then(function({err, results}) {
          formattedUsers = [];
          results.forEach((user) => {
            formattedUsers.push({username: user.username});
          })

          res.json({results: formattedUsers});
        })
    },
    post: function (req, res) {
      User.create({username: req.body.username})
        .then((err, user) => {
          res.sendStatus(201);
        });
    }
  }
};

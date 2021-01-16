var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((data) => {
        //maybe todo:  format data
        var formattedMessages = [];
        data.forEach((each) => {
          formattedMessages.push({
            objectId: each.id,
            text: each.msg,
            username: each.username,
            roomname: each.roomname,
          });
        });
        res.json({ results: formattedMessages });
        //close the response
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {

      console.log("REQUEST TO POST RECEIVED");
      console.log(req.body);

      models.messages.post(req.body);
      res.sendStatus(200);
    }
  },
  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((users) => {
        formattedUsers = [];
        users.forEach((user) => {
          formattedUsers.push({username: user.username});
        })

        res.json({results: formattedUsers});
      })
    },
    post: function (req, res) {
      models.users.post(req.body);
      res.sendStatus(200);
    }
  }
};

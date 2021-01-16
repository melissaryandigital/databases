var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((data) => {
        //maybe todo:  format data
        var formattedMessages = [];
        data.forEach((each) => {
          formattedMessages.push({
            text: each.msg,
            username: each.username,
            roomname: each.roomname
          });
        });

        console.log(formattedMessages);

        res.json( {results: formattedMessages} );
        //close the response
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body);
      res.sendStatus(200);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

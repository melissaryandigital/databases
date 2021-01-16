var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(data => {
        //maybe todo:  format data
        var formattedMessages = data.map((each) => {
          return {
            text: each.msg,
            username: each.username,
            roomname: each.roomname
          };
        });


        //add the data to the repsonse
        res.json( {results: formattedMessages} );
        //close the response
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

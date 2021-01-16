var Sequelize = require('Sequelize');
var orm  = new Sequelize('chat', 'root', '');

var User = orm.define('User', {
  username: Sequelize.STRING
})

var Message = orm.define('Message', {
  msg: Sequelize.STRING,
})

var Room = orm.define('Room', {
  roomname: Sequelize.STRING
})

Room.hasMany(Message);
User.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Room);

User.sync();
Message.sync();
Room.sync();

exports.User = User;
exports.Message = Message;

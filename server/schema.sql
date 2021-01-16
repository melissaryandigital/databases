CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE rooms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  roomname VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  msg VARCHAR(280) NOT NULL,
  user_id INT,
  FOREIGN KEY(user_id) REFERENCES users(id),
  room_id INT,
  FOREIGN KEY(room_id) REFERENCES rooms(id)
);

INSERT INTO users (username) values ('default');
INSERT INTO rooms (roomname) VALUES ('default');
INSERT INTO messages (msg, user_id, room_id)
  VALUES ('default msg', (SELECT id FROM users WHERE users.username = 'default'), (SELECT id FROM rooms WHERE rooms.roomname = 'default'))

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


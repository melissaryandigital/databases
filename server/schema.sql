CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL
);


CREATE TABLE rooms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  roomname VARCHAR(100) NOT NULL
);


CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  msg VARCHAR(280) NOT NULL,
  user_id INT,
  FOREIGN KEY(user_id) REFERENCES users(id),
  room_id INT,
  FOREIGN KEY(room_id) REFERENCES rooms(id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


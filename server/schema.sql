CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id integer primary key,
  msg text not null,
  userId integer,
  FOREIGN KEY(userId) REFERENCES users(id),
  roomId integer,
  FOREIGN KEY(roomId) REFERENCES rooms(id)
);

CREATE TABLE users (
  id integer primary key,
  username text not null
);

CREATE TABLE rooms (
  id integer primary key,
  roomName text not null
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// REFERENCE - https://www.mysqltutorial.org/mysql-nodejs/connect/

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat'
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to the database: ' + err.message);
  }

  console.log('Connected to MySQL database server.');
});

module.exports = connection;
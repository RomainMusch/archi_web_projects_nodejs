//Database connection
var mysql = require("mysql");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'football',
    port     :  3306
    });
connection.connect(function(error) {
   if (error) throw error;
   console.log("Connected!");
});
module.exports = connection;
var mysql = require("mysql");
var connection;

if (process.env.CLEARDB_DATABASE_URL)
{
  connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
} else {
  connection = mysql.createConnection(
  {
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "burgers"
  });
}

connection.connect(function(err)
{
  if (err)
  {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;

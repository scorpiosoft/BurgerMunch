var mysql = require("mysql");
var pool;

if (process.env.CLEARDB_DATABASE_URL)
{
  pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);
} else {
  pool = mysql.createPool(
  {
    connectionLimit: 10,
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "burgers"
  });
}

// Heroku does not support a permanent connection!!!
// connection.connect(function(err)
// {
//   if (err)
//   {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

module.exports = pool;

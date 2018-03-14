var pool = require("../config/connection.js");

//
// utility functions for SQL syntax
//

// outputs 'num' placeholders, e.g. where num==3, returns '?,?,?'
function sql_placeholders(num)
{
  var str = '?';
  for (var i = 1; i < num; i++)
  {
    str += ',?';
  }
  return str;
}

// outputs a single comma-separated string of 'key=val' pairs
function obj2sql(obj)
{
  var arr = [];
  for (var key in obj)
  {
    var value = obj[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(obj, key))
    {
      // add quotes around strings containing space (Cat Burger -> 'Cat Burger')
      if (typeof value === "string" && value.indexOf(" ") >= 0)
      {
        value = "'" + value + "'";
      }
      // ': ' -> '='
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

//
// the ORM object
//
var orm =
{
  all: function(table, cb)
  {
    var query_str = "SELECT * FROM " + table + ";";
    console.log(query_str);

    pool.getConnection(function(err, connection)
    {
      connection.query(query_str, function(err, result)
      {
        cb(result);
        connection.release();

        if (err) throw err;
      });
    });
  },
  insert: function(table, cols, vals, cb)
  {
    var query_str = "INSERT INTO " + table + " (" + cols.toString() + ") ";
    query_str += "VALUES (" + sql_placeholders(vals.length) + ") ";
    console.log(query_str);

    pool.getConnection(function(err, connection)
    {
      connection.query(query_str, vals, function(err, result)
      {
        cb(result);
        connection.release();

        if (err) throw err;
      });
    });
  },
  update: function(table, cols_obj, condition, cb)
  {
    var query_str = "UPDATE " + table + " SET " + obj2sql(cols_obj);
    query_str += " WHERE " + condition;
    console.log(query_str);

    pool.getConnection(function(err, connection)
    {
      connection.query(query_str, function(err, result)
      {
        cb(result);
        connection.release();

        if (err) throw err;
      });
    });
  }
};

module.exports = orm;

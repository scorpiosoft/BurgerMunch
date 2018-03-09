var orm = require("../config/orm.js");

var burger =
{
  all: function(cb)
  {
    orm.all("burgers", function(res)
    {
      cb(res);
    });
  },
  // args cols and vals are arrays
  insert: function(cols, vals, cb) {
    orm.create("burgers", cols, vals, function(res)
    {
      cb(res);
    });
  },
  update: function(cols_obj, condition, cb)
  {
    orm.update("burgers", cols_obj, condition, function(res)
    {
      cb(res);
    });
  }
};

module.exports = burger;

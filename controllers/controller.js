var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function(req, res)
{
  burger.all(function(data)
  {
    var obj =
    {
      burgers: data
    };
    console.log(obj);
    res.render("index", obj);
  });
});

router.post("/api/burgers", function(req, res)
{
  burger.create(["name", "munched"],
    [req.body.name, req.body.munched], function(result)
  {
    // respond with the new ID
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res)
{
  var id = "id = " + req.params.id;

  console.log("id", id);

  burger.update({ munched: req.body.munched }, id,
  function(result)
  {
    if (result.changedRows == 0)
    {
      // ID does not exist
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;

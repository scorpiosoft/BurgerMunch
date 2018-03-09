var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function(req, res)
{
  burger.all(function(data)
  {
    var hbsObject =
    {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res)
{
  burger.create(["name", "sleepy"],
    [req.body.name, req.body.sleepy], function(result)
  {
    // respond with the new ID
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res)
{
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({ sleepy: req.body.sleepy }, condition,
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

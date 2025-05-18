const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi I am Product creation page");
});

module.exports = router;

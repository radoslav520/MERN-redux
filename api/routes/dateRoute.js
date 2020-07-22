const express = require("express");
const Date = require("../models/dateModel");
const router = new express.Router();

router.post("/dates", async (req, res) => {
  const date = new Date(req.body);

  try {
    const existDate = await Date.findOne({ dateString: req.body.dateString });

    if (!existDate) {
      await date.save();
      res.status(201).send(date);
    }
    res.status().send("postoji");
  } catch (error) {
    res.send({ errorMessage: error });
  }
});
router.get("/dates", async (req, res) => {
  try {
    const dates = await Date.find({});
    res.send(dates);
  } catch (error) {
    res.status(400).send({ errorMessage: error });
  }
});

router.get("/dates/:dateString", async (req, res) => {
  try {
    const date = await Date.findOne({
      dateString: req.params.dateString,
    });

    res.send(date);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

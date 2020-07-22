const express = require("express");
const Task = require("../models/taskModel");
const router = new express.Router();

router.post("/tasks/:id", async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.params.id,
  });

  try {
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.params.id });
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

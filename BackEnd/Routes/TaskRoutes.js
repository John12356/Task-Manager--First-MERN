const taskRoutes = require("express").Router();
const dataModel = require("../Models/DataModel");

taskRoutes.get("/getTask", async (req, res) => {
  const { _id } = req.user;
  const newTask = new dataModel({
    _id: _id,
  });
  let task = await dataModel.findById(_id);
  if (!task) task = await newTask.save();
  console.log(task.tasks);
  res.json(task.tasks);
});

taskRoutes.post("/postTask", async (req, res) => {
  const { _id } = req.user;
  const newTask = req.body;
  await dataModel
    .findByIdAndUpdate({ _id: _id }, { $push: { tasks: newTask } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Posted Successfully" });
});

taskRoutes.patch("/updateTask/:id", async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  await dataModel
    .findOneAndUpdate(
      { "tasks.id": id },
      {
        $set: {
          "tasks.$.done": done,
        },
      },
      { new: true }
    )
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Updated successfully" });
});

taskRoutes.delete("/deleteTask/:id", async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  await dataModel
    .findByIdAndUpdate(_id, { $pull: { tasks: { id: id } } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Deleted successfully" });
});

module.exports = taskRoutes;

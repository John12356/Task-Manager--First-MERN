const todoRoutes = require("express").Router();
const dataModel = require("../Models/DataModel");

todoRoutes.get("/getTodo", async (req, res) => {
  const { _id } = req.user;
  // console.log("req.user", req.user);
  const newTodo = new dataModel({
    _id: _id,
  });
  let todo = await dataModel.findById(_id);
  if (!todo) todo = await newTodo.save();
  console.log(todo.todos);
  res.json(todo.todos);
});

todoRoutes.post("/postTodo", async (req, res) => {
  const { _id } = req.user;
  const todo = req.body;
  await dataModel
    .findByIdAndUpdate({ _id: _id }, { $push: { todos: todo } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Posted Successfully" });
});

todoRoutes.patch("/updateTodo/:todoId", async (req, res) => {
  // const { _id } = req.user;
  const { todoId } = req.params;
  const { status } = req.body;
  await dataModel
    .findOneAndUpdate(
      { "todos.todoId": todoId },
      {
        $set: {
          "todos.$.status": status,
        },
      },
      { new: true }
    )
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Updated successfully" });
});

todoRoutes.delete("/deleteTodo/:todoId", async (req, res) => {
  const { _id } = req.user;
  const { todoId } = req.params;
  await dataModel
    .findByIdAndUpdate(_id, { $pull: { todos: { todoId: todoId } } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Deleted successfully" });
});

module.exports = todoRoutes;

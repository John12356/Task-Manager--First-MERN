const noteRoutes = require("express").Router();
const dataModel = require("../Models/DataModel");

noteRoutes.get("/getNote", async (req, res) => {
  const { _id } = req.user;
  const newNote = new dataModel({
    _id: _id,
  });
  let note = await dataModel.findById(_id);
  if (!note) note = await newNote.save();
  console.log(note.notes);
  res.json(note.notes);
});

noteRoutes.post("/postNote", async (req, res) => {
  const { _id } = req.user;
  const note = req.body;
  await dataModel
    .findByIdAndUpdate({ _id: _id }, { $push: { notes: note } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Posted Successfully" });
});

noteRoutes.patch("/updateNote/:id", async (req, res) => {
  const { id } = req.params;
  const { newText } = req.body;
  await dataModel
    .findOneAndUpdate(
      { "notes.id": id },
      {
        $set: {
          "notes.$.noteText": newText,
        },
      },
      { new: true }
    )
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Updated successfully" });
});

noteRoutes.delete("/deleteNote/:id", async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  await dataModel
    .findByIdAndUpdate(_id, { $pull: { notes: { id: id } } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Deleted successfully" });
});

module.exports = noteRoutes;

const JournalModel = require("../models/journalModel");

//Have to add user.ids to each function once we have complete user controllers and middleware

//function to get all the Journals of a user
const getJournals = async (req, res) => {
  try {
    console.log(req.user.userId);
    const journals = await JournalModel.find({ user: req.user.userId });

    res.status(200).send(journals);
    console.log("got them!!");
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const getOneJournal = async (req, res) => {
  try {
    console.log(req.user.userId);
    const journalID = req.params.id;
    const journal = await JournalModel.find({ user: req.user.userId, _id: journalID });
    console.log(req.user.userId)
    res.status(200).send(journal);
    console.log("got it!!");
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

//function to create a new journal
const createNewJournal = async (req, res) => {
  try {
    const newJournal = await JournalModel.create({
      ...req.body,
      user: req.user.userId,
    });

    await newJournal.save();
    res.status(201).send(newJournal);
    console.log("created!!!");
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

//function to do changes in a journal -- we find it by it's id
const updateJournal = async (req, res) => {
  try {
    const updatedJournal = await JournalModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },

      req.body,
      { new: true }
    );
    if (!updatedJournal) {
      return res.status(404).send({ msg: "Journal not found" });
    }
    res.status(200).send(updatedJournal);
    console.log("updated!!!");
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

//function to delete a journal -- we find it by it's id
const deleteJournal = async (req, res) => {
  try {
    const deletedJournal = await JournalModel.findByIdAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deletedJournal) {
      return res.status(404).send({ msg: "Journal not found" });
    }
    res.status(200).send(deletedJournal);

    console.log("deleted!!!");
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

module.exports = {
  getJournals,
  createNewJournal,
  updateJournal,
  deleteJournal,
  getOneJournal,
};

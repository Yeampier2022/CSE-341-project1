const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getUsersAll = async (req, res) => {
  const result = await mongodb.getDb().client.db().collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getUserId = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const result = await mongodb.getDb().client.db().collection("users").find({ _id: id });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

module.exports = {
  getUsersAll,
  getUserId,
};

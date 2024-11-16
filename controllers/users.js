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
  const result = await mongodb
    .getDb()
    .client.db()
    .collection("users")
    .find({ _id: id });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

const createUser = async (req, res) => {
  const user = {
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    ipAddress: req.body.ipAddress,
  }
  const result = await mongodb
    .getDb()
    .client.db()
    .collection("users")
    .insertOne(user);

  if (result.acknowledged) {
    res.status(204).send();
  }
  else {
    res
      .status(500)
      .json(result.error || "An error occurred while creating the user.");
  }
};

const updateUser = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const user = {
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    ipAddress: req.body.ipAddress,
  }
  const result = await mongodb
    .getDb()
    .client.db()
    .collection("users")
    .updateOne({ _id: id }, { $set: user });

  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while updating the user.");
  }
}

const deleteUser = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .client.db()
    .collection("users")
    .deleteOne({ _id: id });

  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while deleting the user.");
  }
};

module.exports = {
  getUsersAll,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
};

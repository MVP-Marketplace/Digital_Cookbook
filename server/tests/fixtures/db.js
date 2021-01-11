const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  User = require("../../db/models/users.models");
require("dotenv").config();

afterAll(async () => {
  await mongoose.connection.close();
});

const userOneId = new mongoose.Types.ObjectId;
const userTwoId = new mongoose.Types.ObjectId;

const userOne = {
  _id: userOneId,
  name: "Sam",
  email: "email@email.com",
  password: "1234567",
  username: "usernamesam",
  tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) }],
};

const userTwo = {
  _id: userTwoId,
  name: "Tristan",
  email: "tristan@email.com",
  password: "1234567",
  username: "usernametristan",
  tokens: [{ token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET) }],
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = { userOne, userTwo, setUpDatabase };

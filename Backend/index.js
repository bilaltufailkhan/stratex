const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

var cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes");
const { getUserData, saveUserData } = require("./utils");

app.use("/", routes);

app.get("/", (req, res) => {
  const users = getUserData();
  res.send(users);
});

app.post("/addusers", (req, res) => {
  const existUser = getUserData();

  const userData = req.body;

  if (
    userData.firstName == null ||
    userData.lastName == null ||
    userData.role == null
  ) {
    return res.status(401).send({ error: true, msg: "User data missing" });
  }

  const findExistUser = existUser.users.find(
    (user) => user.firstName === userData.firstName
  );

  if (findExistUser) {
    return res.status(409).send({ error: true, msg: "User already exist" });
  }

  existUser.users.push(userData);
  saveUserData(existUser);
  res.send({ success: true, msg: "User Added Successfully!" });
});

app.delete("/delete/:firstName", (req, res) => {
  const firstName = req.params.firstName;

  const existUser = getUserData();

  const filterUser = existUser.users.filter(
    (user) => user.firstName !== firstName
  );

  if (existUser.users.length === filterUser.length) {
    return res
      .status(409)
      .send({ error: true, msg: "username does not exist" });
  }

  existUser.users = filterUser;

  saveUserData(existUser);
  res.send({ success: true, msg: "User Deleted Successfully" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("app is running");
});

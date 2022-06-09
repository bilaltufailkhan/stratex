// const dataPath = require("../api/employees.json");
const fs = require("fs");
const path = require("path");

const saveUserData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(path.resolve(__dirname, "../api/data.json"), stringifyData);
};

const getUserData = () => {
  const jsonData = fs.readFileSync(path.resolve(__dirname, "../api/data.json"));
  return JSON.parse(jsonData);
};

module.exports = { saveUserData, getUserData };

const dotenv = require("dotenv").config({ path: "./config.env" });
const app = require("./app.js");
const mongoose = require("mongoose");

const DB = process.env.MONGO_URL;

console.log(DB);

mongoose.connect(DB).then(() => {
  console.log("Database connection succesfully");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

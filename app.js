const express = require("express");
const dotenv = require("dotenv").config({ path: "./config.env" });
const checkoutRoutes = require("./routes/checkoutRoutes");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/checkout", checkoutRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

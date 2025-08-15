require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app.js");

// Load environment variables
// dotenv.config({ path: "/config.env" });

// MongoDB connection
const DB = process.env.MONGO_URL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

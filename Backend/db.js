const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/notify", {
      
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectToMongo;
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  address: String,
  services: String,
});

module.exports = mongoose.model("restaurantSchema", restaurantSchema);

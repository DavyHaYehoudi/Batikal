const mongoose = require("mongoose");

const statusName = mongoose.Schema({
  id: { type: Number },
  name: { type: String },
});

const StatusNameModel = mongoose.model("StatusName", statusName);
module.exports = StatusNameModel;

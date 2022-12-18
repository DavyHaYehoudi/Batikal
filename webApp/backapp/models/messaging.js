const mongoose = require("mongoose");

const messagingSchema = mongoose.Schema({
  postAuthor_id: {
    type: String,
  },
  societyName: {
    type: String,
  },
  logo: { type: String },
  time: {
    type: String,
  },
  content: {
    type: String,
  },
  simulation_FK: {
    type: String,
  },
});

const MessagingModel = mongoose.model("Messaging", messagingSchema);
module.exports = MessagingModel;

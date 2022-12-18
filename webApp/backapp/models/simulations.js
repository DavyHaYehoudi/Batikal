const mongoose = require("mongoose");

const simulationsSchema = mongoose.Schema(
  {
    idFolderEDF: { type: String },
    creationDate: { type: String },
    partner_Name: { type: String },
    client: { type: String },
    foldCEENumber: { type: String },
    siteName: { type: String },
    folderStep: { type: String },
    quoteStatus: { type: String, default: "0" },
    quoteStatusOptions: {
      type: { written: String, signed: String },
      default: { written: "", signed: "" },
    },
    messages: {
      type: [{ read: Boolean, author: String }],
      default: [{ read: true, author: "" }],
    },
    archived: { type: Boolean, default: false },
    archivedBy_id: { type: String, default: "" },
    reasonArchived: { type: String, default: "" },
    deletedByAdmin: { type: Boolean, default: false },
    deletedByUser: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const SimulationsModel = mongoose.model("Simulations", simulationsSchema);
module.exports = SimulationsModel;

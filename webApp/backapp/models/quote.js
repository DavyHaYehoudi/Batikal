const mongoose = require("mongoose");

const quoteSchema = mongoose.Schema(
  {
    id_creator: { type: String },
    partner_Name: { type: String },
    foldCEENumber: { type: String },
    quoteStatus: { type: String },
    quote_FK: { type: String },
    quoteDate: { type: String },
    technicalVisit: { type: String, default: "" },
    rowMessages: { type: Array },
    quoteNumber: { type: String, default: "" },
    recoveryRate: { type: String, default: "6" },
    cumulationTTC: { type: String, default: "" },
    buttons: { type: Array },
    totalTTC: { type: String },
    notes: { type: String, default: "" },
    comments: { type: String, default: "" },
    deleted: { type: Boolean, default: false },

    /*************Données EDF*************/
    siret_Client: { type: String },
    name_Client: { type: String },
    address_Client: { type: String },
    addressAdditional_Client: { type: String },
    postalCode_Client: { type: String },
    city_Client: { type: String },
    contact_Name: { type: String },
    contact_Tel: { type: String },
    contact_Mail: { type: String },
    activityZone: { type: String },
    quoteCumac: { type: String },
    cheets: { type: Array },
    insert: { type: Boolean, default: false },
    address_Site: { type: String },
    addressAdditional_Site: { type: String },
    postalCode_Site: { type: String },
    city_Site: { type: String },
    startWorksDate: { type: String },
    deadlineWorks: { type: String },
    climaticZone: { type: String },
    totalPrimeCEE: { type: String },
  },
  {
    timestamps: true,
  }
);

const QuoteModel = mongoose.model("Quote", quoteSchema);
module.exports = QuoteModel;

const mongoose = require("mongoose");

const accountSocietySchema = mongoose.Schema(
  {
    logo: {
      type: String,
    },
    societyName: {
      type: String,
    },
    address: {
      type: String,
    },
    postalCodeCity: {
      type: String,
    },
    emailSociety: {
      type: String,
    },
    TVA: {
      type: String,
    },
    siret: {
      type: String,
    },
    NAFcode: {
      type: String,
    },
    RCS: {
      type: String,
    },
    decennial_insurance: {
      type: String,
    },
    other_information: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AccountSocietyModel = mongoose.model(
  "AccountSociety",
  accountSocietySchema
);
module.exports = AccountSocietyModel;

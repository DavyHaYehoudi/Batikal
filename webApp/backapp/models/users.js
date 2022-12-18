const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    partner_Name: { type: String },
    email: { type: String },
    isAdmin: { type: Boolean, default: false },
    logo: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/batikal-dev.appspot.com/o/logos%2FdefaultPicture.png?alt=media&token=ff9fb685-a3de-4503-9f19-fcff8ea06f2a",
    },
    societyName: { type: String },
    address: { type: String },
    postalCodeCity: { type: String },
    emailSociety: { type: String },
    TVA: { type: String },
    siret: { type: String },
    NAFcode: { type: String },
    RCS: { type: String },
    decennial_insurance: { type: String },
    other_information: { type: String },
    // token: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;

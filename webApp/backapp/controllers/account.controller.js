const UserModel = require("../models/users");

module.exports.accountFormUpdate = async (req, res) => {
  let id = req.user.id;
  const {
    // id,
    societyName,
    address,
    postalCodeCity,
    emailSociety,
    TVA,
    siret,
    NAFcode,
    RCS,
    decennial_insurance,
    other_information,
  } = req.body;
  try {
    const accountUpdate = await UserModel.findByIdAndUpdate(id, {
      societyName,
      address,
      postalCodeCity,
      emailSociety,
      TVA,
      siret,
      NAFcode,
      RCS,
      decennial_insurance,
      other_information,
    });

    res.status(200).json(accountUpdate);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

module.exports.accountFormGet = async (req, res) => {
  // const { id } = req.query;
  let id = req.user.id;
  const accountGet = await UserModel.findById(id);
  res.status(200).json(accountGet);
};

module.exports.accountUploadLogo = async (req, res) => {
  console.log("req body de accountUploadLogo :", req.body);
  // const { DBuserId, url } = req.body;
  const { url } = req.body;
  let DBuserId = req.user.id;
  try {
    await UserModel.findByIdAndUpdate(DBuserId, {
      logo: url,
    });

    res.status(201).json({
      message: url,
    });
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

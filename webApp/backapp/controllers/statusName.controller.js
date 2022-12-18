const StatusNameModel = require("../models/statusName");

module.exports.getStatusName = async (req, res) => {
  try {
    const getStatusName = await StatusNameModel.find();

    res.status(200).json(getStatusName);
  } catch (err) {
    res
      .status(400)
      .send({ message: err });
  }
};

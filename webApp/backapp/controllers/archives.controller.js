const SimulationsModel = require("../models/simulations");

module.exports.getArchives = async (req, res) => {
  const { archivedBy_id, partner_Name } = req.query;
  let isAdmin = req.user.isAdmin;

  if (isAdmin) {
    try {
      let getArchives = await SimulationsModel.find({
        archived: true,
        deletedByAdmin: false,
      });
      res.status(200).json(getArchives);
    } catch (err) {
      res
        .status(400)
        .send({ message: err });
    }
  } else {
    try {
      let getArchives = await SimulationsModel.find({
        archived: true,
        deletedByAdmin: false,
        deletedByUser: false,
        archivedBy_id,
        partner_Name,
      });
      res.status(200).json(getArchives);
    } catch (err) {
      res
        .status(400)
        .send({ message: err });
    }
  }
};

module.exports.archived = async (req, res) => {
  const { id, reasonArchived, archivedBy_id } = req.body;
  try {
    const archived = await SimulationsModel.findByIdAndUpdate(
      { _id: id },
      {
        archived: true,
        reasonArchived,
        archivedBy_id,
      }
    );
    res.status(200).json(archived);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

module.exports.unarchived = async (req, res) => {
  const { id } = req.body;
  try {
    const unarchived = await SimulationsModel.findByIdAndUpdate(id, {
      archived: false,
      deletedByUser: false,
    });
    res.status(200).json(unarchived);
  } catch (err) {
    res
      .status(400)
      .send({ message: err });
  }
};

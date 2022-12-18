const SimulationsModel = require("../models/simulations");

module.exports.filterSearchFolders = async (req, res) => {
  const { searchValue } = req.body;
  const { isAdmin, partner_Name } = req.user;
  console.log("req.user :", req.user);
  try {
    if (isAdmin) {
      let search = await SimulationsModel.find({
        $and: [
          { deletedByAdmin: false },
          {
            $or: [
              { siteName: { $regex: searchValue } },
              { client: { $regex: searchValue } },
            ],
          },
        ],
      });
      res.status(200).json(search);
    } else {
      let search = await SimulationsModel.find({
        $and: [
          {
            deletedByUser: false,
            deletedByAdmin: false,
            archived: false,
            partner_Name,
          },
          {
            $or: [
              { siteName: { $regex: searchValue } },
              { client: { $regex: searchValue } },
            ],
          },
        ],
      });
      res.status(200).json(search);
    }
  } catch (err) {
    res.status(400).send({ message: err });
  }
};
module.exports.filterSearchArchives = async (req, res) => {
  const { searchValue } = req.body;
  const { isAdmin, partner_Name } = req.user;
  try {
    if (isAdmin) {
      let search = await SimulationsModel.find({
        $and: [
          { deletedByAdmin: false, archived: true },
          {
            $or: [
              { siteName: { $regex: searchValue } },
              { client: { $regex: searchValue } },
            ],
          },
        ],
      });
      res.status(200).json(search);
    } else {
      let search = await SimulationsModel.find({
        $and: [
          {
            deletedByUser: false,
            deletedByAdmin: false,
            archived: true,
            partner_Name,
          },
          {
            $or: [
              { siteName: { $regex: searchValue } },
              { client: { $regex: searchValue } },
            ],
          },
        ],
      });
      res.status(200).json(search);
    }
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

module.exports.filterBlock = async (req, res) => {
  const { data, domain, archivedBy_id } = req.body;
  // console.log("data:",data);
  const { isAdmin, partner_Name } = req.user;
  let fields = [];
  if (isAdmin) {
    if (domain === "archives") {
      fields = [{ deletedByAdmin: false }, { archived: true }];
    } else {
      fields = [{ deletedByAdmin: false }, { archived: false }];
    }
  } else {
    if (domain === "archives") {
      fields = [
        { deletedByUser: false },
        { deletedByAdmin: false },
        { archived: true },
        { archivedBy_id },
        { partner_Name },
      ];
    } else {
      fields = [
        { deletedByUser: false },
        { deletedByAdmin: false },
        { partner_Name },
        { archived: false },
      ];
    }
  }
  let checkboxFieldsWritten = [];
  let checkboxFieldsSigned = [];

  for (let i = 0; i < data.length; i++) {
    switch (data[i].id) {
      case "1":
        fields.push({ creationDate: data[i].value });
        break;
      case "2":
        fields.push({ folderStep: data[i].value });
        break;
      case "3":
      case "4":
        fields.push({ quoteStatus: data[i].value });
        break;
      case "5":
        for (let j = 0; j < data[i].value.length; j++) {
          checkboxFieldsWritten.push(data[i].value[j]);
        }
        break;
      case "6":
        for (let k = 0; k < data[i].value.length; k++) {
          checkboxFieldsSigned.push(data[i].value[k]);
        }
        break;
      case "7":
        fields.push({ foldCEENumber: { $regex: data[i].value } });
        break;
      case "8":
        fields.push({ partner_Name: { $regex: data[i].value } });
        break;
      case "9":
        fields = [];
        if (domain === "archives") {
          fields.push(
            { deletedByUser: true },
            { deletedByAdmin: false },
            { archived: true }
          );
        } else {
          fields.push(
            { deletedByUser: true },
            { deletedByAdmin: false },
            { archived: false }
          );
        }
        break;
      case "10":
        fields.push({ reasonArchived: data[i].value });
        break;
    }
  }

  let queryAnd = [];
  if (fields.length > 0) {
    queryAnd.push({ $and: fields });
  }

  let queryOr = { $or: [] };

  if (checkboxFieldsWritten.length > 0 || checkboxFieldsSigned.length > 0) {
    if (checkboxFieldsWritten.length > 0) {
      queryOr.$or.push({
        "quoteStatusOptions.written": {
          $in: checkboxFieldsWritten,
        },
      });
    }
    if (checkboxFieldsSigned.length > 0) {
      queryOr.$or.push({
        "quoteStatusOptions.signed": {
          $in: checkboxFieldsSigned,
        },
      });
    }

    queryAnd.push(queryOr);
  }

  try {
    let filterBlock = await SimulationsModel.find({
      $and: queryAnd,
    });
    res.status(200).json(filterBlock);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

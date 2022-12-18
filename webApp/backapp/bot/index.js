const SimulationsModel = require("../models/simulations");
const { login } = require("./login");
const { getAllFolders } = require("./tasks/getAllFolders");

module.exports.init = async () => {
  try {
    let page = await login("Jp.george@energhia.fr", "@PaMiNa357");

    let folders = await getAllFolders(page);

    await SimulationsModel.bulkWrite(
      folders.map((folder) => ({
        updateOne: {
          filter: { idFolderEDF: folder.idFolderEDF },
          update: {
            $set: {
              creationDate: folder.creationDate,
              partner_Name: folder.partner_Name,
              client: folder.client,
              foldCEENumber: folder.foldCEENumber,
              siteName: folder.siteName,
              folderStep: folder.folderStep,
            },
          },
          upsert: true,
        },
      }))
    );

    return folders;
  } catch (error) {
    return error;
  }
};

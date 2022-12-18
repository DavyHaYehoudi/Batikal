const QuoteModel = require("../models/quote");
const SimulationsModel = require("../models/simulations");

module.exports.getSimulations = async (req, res) => {
  const { isAdmin, partner_Name } = req.user;

  try {
    //Le query est de type STRING
    if (isAdmin) {
      let simulations = await SimulationsModel.find({
        archived: false,
        deletedByAdmin: false,
      });
      res.status(200).json(simulations);
    } else {
      let simulations = await SimulationsModel.find({
        deletedByUser: false,
        archived: false,
        partner_Name,
      });
      res.status(200).json(simulations);
    }
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

module.exports.deleteSimulations = async (req, res) => {
  let { id } = req.params;
  let isAdmin = req.user.isAdmin;
  try {
    await QuoteModel.findOneAndUpdate({ quote_FK: id }, { deleted: true });
  } catch (err) {
    res.status(400).send({ message: err });
  }

  try {
    if (isAdmin) {
      let deleteSimulations = await SimulationsModel.findByIdAndUpdate(id, {
        deletedByAdmin: true,
        deletedByUser: true,
      });
      res.status(200).json(deleteSimulations);
    } else {
      let deleteSimulations = await SimulationsModel.findByIdAndUpdate(id, {
        deletedByUser: true,
      });
      res.status(200).json(deleteSimulations);
    }
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

module.exports.reactivedSimulations = async (req, res) => {
  const { id } = req.body;
  try {
    await SimulationsModel.findByIdAndUpdate(id, {
      deletedByUser: false,
    });
    const reactivedSimulationsActualised = await SimulationsModel.findById(id);
    res.status(200).json(reactivedSimulationsActualised);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

module.exports.quoteStatusChange = async (req, res) => {
  let { id, number, quoteStatusOptions } = req.body;
 

  // Adaptation du string quoteStatusOptions avec les 3 valeurs attendues en filtre
  if (number === "3" || number === "6") {
    quoteStatusOptions = "En attente de validation";
  } else if (number === "4" || number === "7") {
    quoteStatusOptions = "Anomalie";
  } else if (number === "5" || number === "8") {
    quoteStatusOptions = "Validé";
  }
  try {
    let quoteStatusChange;
    switch (number) {
      case "1":
      case "2":
        //Le bouton modifier du devis a été sélectionné et il faut réinitialiser
        quoteStatusChange = await SimulationsModel.findByIdAndUpdate(id, {
          quoteStatus: number,
          quoteStatusOptions: { written: "", signed: "" },
        });
        break;
      case "3":
      case "4":
      case "5":
        quoteStatusChange = await SimulationsModel.findByIdAndUpdate(id, {
          quoteStatus: number,
          quoteStatusOptions: { written: quoteStatusOptions, signed: "" },
        });
        break;
      case "6":
      case "7":
      case "8":
        quoteStatusChange = await SimulationsModel.findByIdAndUpdate(id, {
          quoteStatus: number,
          quoteStatusOptions: { written: "", signed: quoteStatusOptions },
        });
        break;
      default:
        console.log("I am in the default case module export quoteStatusChange");
    }

    res.status(200).send(quoteStatusChange);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

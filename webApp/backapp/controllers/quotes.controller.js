const { getQuoteData } = require("../bot/tasks/getQuoteData");
const QuoteModel = require("../models/quote");

module.exports.quoteGenerate = async (req, res) => {
  const { isAdmin, partner_Name } = req.user;

  const {
    idFolderEDF,
    id_creator,
    foldCEENumber,
    quoteStatus,
    quote_FK,
    quoteDate,
    rowMessages,
    buttons,
  } = req.body;

  try {
    const dataEDF = await getQuoteData(idFolderEDF);

    const {
      siret_Client,
      name_Client,
      address_Client,
      addressAdditional_Client,
      postalCode_Client,
      city_Client,
      contact_Name,
      contact_Tel,
      contact_Mail,
      activityZone,
      quoteCumac,
      cheets,
      address_Site,
      addressAdditional_Site,
      postalCode_Site,
      city_Site,
      startWorksDate,
      deadlineWorks,
      climaticZone,
      totalPrimeCEE,
    } = dataEDF.quote;

    //Ajout des propriétés par défaut à une cheet
    for (let i = 0; i < cheets.length; i++) {
      cheets[i].id = Math.random();
      cheets[i].TVA = { rate: "0", value: "" };
      // let amountHT = cheets[i].cheetCumac - (cheets[i].cheetCumac * "6") / 100;
      let amountTTC = cheets[i].cheetCumac * "6";
      cheets[i].HT = amountTTC;
      cheets[i].TTC = amountTTC;
      cheets[i].PU = "";
      /*  cheets[i].PU=  unitPrice(
        amountTTC(cheets[i].cheetCumac, "6"),
        cheets[i].quantity
      ) */
      cheets[i].quantity = "";
      cheets[i].unit = "";
      cheets[i].descriptive = [];
    }
    const quote = await QuoteModel.create({
      id_creator,
      partner_Name,
      foldCEENumber,
      quoteStatus,
      quote_FK,
      quoteDate,
      rowMessages,
      buttons,
      siret_Client,
      name_Client,
      address_Client,
      addressAdditional_Client,
      postalCode_Client,
      city_Client,
      contact_Name,
      contact_Tel,
      contact_Mail,
      activityZone,
      quoteCumac,
      cheets,
      address_Site,
      addressAdditional_Site,
      postalCode_Site,
      city_Site,
      startWorksDate,
      deadlineWorks,
      climaticZone,
      totalPrimeCEE,
    });
    res.status(200).json(quote);
  } catch (err) {
    console.log("retour de l'erreur dans le quote controller :",err);
    res.status(400).send({ message: err });
  }
};

module.exports.quoteGetOne = async (req, res) => {
  const { id } = req.params;

  try {
    const quoteGetOne = await QuoteModel.find({
      quote_FK: id,
    });
    res.status(200).json(quoteGetOne);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

module.exports.quoteBtnRegister = async (req, res) => {
  const { isAdmin, partner_Name } = req.user;
  const {
    id_quote,
    id_creator,
    foldCEENumber,
    quoteStatus,
    quoteDate,
    technicalVisit,
    recoveryRate,
    buttons,
    quoteNumber,
    cheets,
    cumulationTTC,
    quote_FK,
    notes,
    comments,
  } = req.body;

  try {
    const quoteRegister = await QuoteModel.findByIdAndUpdate(id_quote, {
      id_creator,
      partner_Name,
      foldCEENumber,
      quoteStatus,
      quoteDate,
      technicalVisit,
      recoveryRate,
      buttons,
      quoteNumber,
      cheets,
      cumulationTTC,
      notes,
      comments,
    });

    const quoteRegisterActually = await QuoteModel.find({ quote_FK });
    res.status(200).json(quoteRegisterActually);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

module.exports.quoteBtnSubmit = async (req, res) => {
  const { isAdmin, partner_Name } = req.user;
  const {
    id_quote,
    id_creator,
    foldCEENumber,
    quoteStatus,
    quoteDate,
    technicalVisit,
    recoveryRate,
    buttons,
    quoteNumber,
    cheets,
    cumulationTTC,
    quote_FK,
    notes,
    comments,
  } = req.body;

  try {
    const quoteSubmit = await QuoteModel.findByIdAndUpdate(id_quote, {
      id_creator,
      partner_Name,
      foldCEENumber,
      quoteStatus,
      quoteDate,
      technicalVisit,
      recoveryRate,
      buttons,
      quoteNumber,
      cheets,
      cumulationTTC,
      notes,
      comments,
    });
    const quoteSubmitActually = await QuoteModel.find({ quote_FK });
    res.status(200).json(quoteSubmitActually);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};
module.exports.quoteBtnModify = async (req, res) => {
  const { quote_FK, buttons, quoteStatus, id_quote } = req.body;
  try {
    const quoteModify = await QuoteModel.findByIdAndUpdate(id_quote, {
      buttons,
      quoteStatus,
    });
    const quoteModifyActually = await QuoteModel.find({ quote_FK });
    res.status(200).json(quoteModifyActually);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};
module.exports.quoteBtnAdminControl = async (req, res) => {
  const { quote_FK, quoteStatus, buttons, id_quote } = req.body;
  let isAdmin = req.user.isAdmin;
  try {
    if (isAdmin) {
      const quoteAnomaly = await QuoteModel.findByIdAndUpdate(id_quote, {
        quoteStatus,
        buttons,
      });

      const quoteAnomalyActually = await QuoteModel.find({ quote_FK });
      res.status(200).json(quoteAnomalyActually);
    } else {
      console.log("admin seul autorisé pour le contrôle du devis");
    }
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

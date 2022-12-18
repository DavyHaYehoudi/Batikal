const express = require("express");
const { getQuoteData } = require("../bot/tasks/getQuoteData");

const router = express.Router();

router.get("/incremental/:id", getQuoteData);

module.exports = router;

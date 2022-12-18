const express = require("express");
const { getStatusName } = require("../controllers/statusName.controller");
const router = express.Router();


router.get("/", getStatusName);
module.exports = router;
const express = require("express");
const { sendMessage, loadMessage, allMessages } = require("../controllers/messaging.controller");
const router = express.Router();


router.post("/send",sendMessage);
router.get("/load",loadMessage);

module.exports = router;
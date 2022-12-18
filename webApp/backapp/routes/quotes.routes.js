const express = require("express");
const {
  quoteGenerate,
  quoteGetOne,
  quoteBtnRegister,
  quoteBtnSubmit,
  quoteBtnModify,
  quoteBtnAdminControl,
} = require("../controllers/quotes.controller");
const router = express.Router();

router.post("/generate", quoteGenerate);
router.get("/:id", quoteGetOne);
router.put("/btn/register", quoteBtnRegister);
router.post("/btn/submit", quoteBtnSubmit);
router.post("/btn/modify", quoteBtnModify);
router.post("/btn/admincontrol", quoteBtnAdminControl);

module.exports = router;

const express = require("express");
const {
  getSimulations,
  deleteSimulations,
  reactivedSimulations,
  quoteStatusChange,
} = require("../controllers/simulations.controller");
const router = express.Router();

router.get("/", getSimulations);
router.delete("/:id", deleteSimulations);
router.put("/reactived", reactivedSimulations);
router.put("/quotestatus", quoteStatusChange);

module.exports = router;

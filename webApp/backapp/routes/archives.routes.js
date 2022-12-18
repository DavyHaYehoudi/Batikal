const express = require("express");
const {
  archived,
  getArchives,
  unarchived,
} = require("../controllers/archives.controller");
const router = express.Router();

router.put("/archived", archived);
router.put("/unarchived", unarchived);
router.get("/", getArchives);

module.exports = router;

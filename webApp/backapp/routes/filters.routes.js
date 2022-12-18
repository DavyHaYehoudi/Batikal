const express = require("express");
const { filterBlock, filterSearchFolders, filterSearchArchives } = require("../controllers/filters.controller");
const router = express.Router();

router.post("/search/folders", filterSearchFolders);
router.post("/search/archives", filterSearchArchives);
router.post("/filterBlock", filterBlock);

module.exports = router;

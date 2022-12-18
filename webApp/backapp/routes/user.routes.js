const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');
const { accountFormUpdate, accountFormGet, accountUploadLogo } = require("../controllers/account.controller");


router.post("/login", userController.login);
router.get("/users", userController.getAllUsers);
router.get("/oneUser", userController.getOneUser);

/* ******************* For the page "Mon Compte" ******************* */
router.put("/account", accountFormUpdate);
router.get("/account", accountFormGet);
router.put("/account/upload", accountUploadLogo);


module.exports = router;

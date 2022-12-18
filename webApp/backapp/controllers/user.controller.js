const { authentication } = require("../bot/tasks/authentication");
const UserModel = require("../models/users");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { init } = require("../bot");

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json(users);
};

module.exports.getOneUser = async (req, res) => {
  // const { id } = req.query;
  const id = req.user.id;
  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Authentification EDF && Timestamp 12h
    let auth = await authentication(email, password);

    if (auth === "ERR_BAD_REQUEST") {
      res.status(400).json({ message: "ERR_BAD_REQUEST" });
    } else {
      const timesTamp = new Date().getTime() + 1 * 12 * 60 * 60 * 1000;
      // Récupération des dossiers
      // await init();

      // Le user existe-t-il déjà dans la DB ?
      let userLogin = await UserModel.findOne({ email });

      if (!userLogin) {
        try {
          userLogin = await UserModel.create({
            partner_Name: auth,
            email,
          });
        } catch (err) {
          console.log("erreur de userLogin", err);
        }
      }

      // Création du token
      let jwtPayload = userLogin._id;
      let token = jwt.sign({ jwtPayload }, process.env.TOKEN_SECRET, {
        expiresIn: timesTamp,
      });

      res.status(200).json({
        DBuserId: userLogin._id,
        timesTamp: timesTamp,
        isAdmin: userLogin.isAdmin,
        partner_Name: userLogin.partner_Name,
        authorizationToken: token,
      });
    }
  } catch (e) {
    console.log("catch de userController :", e);
    res.status(400).json({ message: "ERR_BAD_REQUEST" });
  }
};

module.exports.checkUser = async (req, res) => {
  try {
    // Récupération du token, req.get("authorization") fonctionne aussi bien
    const authHeader = await req.headers["authorization"];

    if (
      authHeader === undefined ||
      typeof authHeader === undefined ||
      authHeader === "undefined"
    ) {
      return undefined;
    } else {
      let userId;
      let invalid_Token = false;

      jwt.verify(authHeader, process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) {
          invalid_Token = true;
        } else {
          userId = decoded.jwtPayload;
        }
      });

      if (invalid_Token) {
        return "invalid_Token";
      } else {
        let userReq = await UserModel.findById(userId);

        return {
          id: userId,
          partner_Name: userReq.partner_Name,
          isAdmin: userReq.isAdmin,
        };
      }
    }
  } catch (error) {
    return error;
  }
};

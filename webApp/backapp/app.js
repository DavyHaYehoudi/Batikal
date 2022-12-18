require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const simulationsRoutes = require("./routes/simulations.routes");
const messagingRoutes = require("./routes/messaging.routes");
const filtersRoutes = require("./routes/filters.routes");
const quotesRoutes = require("./routes/quotes.routes");
const archivesRoutes = require("./routes/archives.routes");
const statusNameRoutes = require("./routes/statusName.routes");
const botRoutes = require("./routes/bot.routes");

//Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier
const path = require("path");

//Protège les headers HTTP
const helmet = require("helmet");

//Désactivation de la mise en cache du navigateur
const nocache = require("nocache");

let cors = require("cors");
const { checkUser } = require("./controllers/user.controller");

mongoose
  .connect(process.env.DB_URL, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Pas de connexion à MongoDB  :(", err));

/* ******************************* APP USE START ******************************* */
app.use((req, res, next) => {
  checkUser(req, res)
    .then((resp) => {
      // console.log("response de app :", resp);
      if (resp === "invalid_Token") {
        res.status(400).json({ message: "invalid_Token" });
      }
      if (resp !== undefined && resp !== "invalid_Token") {
        req.user = {
          id: resp.id,
          partner_Name: resp.partner_Name,
          isAdmin: resp.isAdmin,
        };
      }

      next();
    })
    .catch((err) => console.log("checkUser catch", err));
  //Les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Origin", "*");
  //Entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  //Méthodes autorisées pour les requêtes HTTP
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
});
/* ******************************* APP USE END ******************************* */

//Pour gérer la demande POST provenant de l'application front-end, nous devrons être capables d'extraire l'objet JSON de la demande
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// app.use("/static", express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(helmet());
app.use(nocache());

app.use("/user", userRoutes);
app.use("/archives", archivesRoutes);
app.use("/folders", simulationsRoutes);
app.use("/messaging", messagingRoutes);
app.use("/filters", filtersRoutes);
app.use("/quote", quotesRoutes);
app.use("/statusname", statusNameRoutes);
app.use("/bot", botRoutes);

module.exports = app;

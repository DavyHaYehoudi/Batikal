const functions = require("firebase-functions");
const app = require("./app");
const { init } = require("./bot");
const { authentication } = require("./bot/tasks/authentication");
const { getAllFolders } = require("./bot/tasks/getAllFolders");
const { getQuoteData } = require("./bot/tasks/getQuoteData");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// Définit l'api Batikal
exports.api = functions.https.onRequest(app);

//Pour tester les controllers API
exports.testSynchro = functions.https.onRequest(async (req, res) => {
  
  /*Obtenir l'intégralité des dossiers
  let init_= await init()
  console.log("résultat pour init :",init_);
  res.send(200, {message: "init"});
  */

  /*Obtenir un seul dossier mais en détail
  let quote = await getQuoteData("75137");
  console.log("résultat pour quote :", quote);
  res.send(200, { message: "quote" });
  */

  /*Authentification sur le portail EDF
      let auth = await authentication("direction@batikal.eu", "Batireno26");
      console.log("résultat pour authentication :", auth);
      res.send(200, { message: "authentication" });
  */
});

exports.synchronisation = functions.pubsub
  .schedule("every 1 hours")
  .timeZone("Europe/Paris")
  .onRun(async (context) => {
    // launch the init function from bot index.js
    // ...
  });

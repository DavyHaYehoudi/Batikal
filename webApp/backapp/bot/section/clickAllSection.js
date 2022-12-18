const { config } = require("../config");
const { login } = require("../login");
const { synthSite } = require("./synthSite");
const { clientInfo } = require("./clientInfos");
const { contractDocuments } = require("./section/contractDocuments");
const { detailsSite } = require("./detailsSite");
const { getQuoteData } = require("../tasks/getQuoteData");

(async (req, res) => {
  try {
    const page = await config();
    await login(page);

    //Je récupère l' Id du dossier
    const id = req.params.id;
    //   const id = await getQuoteData();

    const folder = {
      id,
      simulation: "",
      quote: "",
    };

    //Je click sur informations client
    await page.evaluate((id) => {
      appCeeManager.openCreateProject(id, {
        step: "project_step_select_client",
      });
    }, id);
    let dataClientExport = await clientInfo(page);
    folder.simulation = {
      ...folder.simulation,
      ...dataClientExport.simulation,
    };
    folder.quote = { ...folder.quote, ...dataClientExport.quote };

    //Je click sur détails du chantier
    await page.evaluate((id) => {
      appCeeManager.openCreateProject(id, {
        step: "project_step_operations",
      });
    }, id);
    let dataDetailsExport = await detailsSite(page);
    folder.quote = { ...folder.quote, ...dataDetailsExport.quote };

    // Je click sur synthèse
    await page.evaluate((id) => {
      appCeeManager.openCreateProject(id, { step: "project_step_review" });
    }, id);
    let dataSynthExport = await synthSite(page);
    folder.simulation = { ...folder.simulation, ...dataSynthExport.simulation };
    folder.quote = { ...folder.quote, ...dataSynthExport.quote };

    // Je click sur documents contractuels
    await page.evaluate((id) => {
      appCeeManager.openCreateProject(id, { step: "project_step_printing" });
    }, id);
    let dataDocExport = await contractDocuments(page);
    folder.simulation = { ...folder.simulation, ...dataDocExport.simulation };

    console.log("folder :", folder);
  } catch (error) {
    res.status(400).send({ message: error })
  }
})();

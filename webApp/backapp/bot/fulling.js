const { config } = require("./config");
const { login } = require("./login");
// const { idFoldersAdmin } = require("./tasks/idFoldersAdmin");
const { synthSite } = require("./section/synthSite");
const { clientInfo } = require("./section/clientInfos");
const { contractDocuments } = require("./section/contractDocuments");
const { detailsSite } = require("./section/detailsSite");
const DEBUG = true;

let dataExport = [];

(async () => {
  try {
    const page = await config();
    await login(page);
    await browser.close();
    // Récup Ids des dossiers en cours
    // const data = await idFoldersAdmin(page);
    // console.log("data", data);

    for (let i = 0; i < data.length; i++) {
      const folder = {
        id: data[i],
        simulation: "",
        quote: "",
      };

      //Je click sur informations client
      await page.evaluate((id = data[i]) => {
        appCeeManager.openCreateProject(id, {
          step: "project_step_select_client",
        });
      }, data[i]);
      let dataClientExport = await clientInfo(page);
      folder.simulation = {
        ...folder.simulation,
        ...dataClientExport.simulation,
      };
      folder.quote = { ...folder.quote, ...dataClientExport.quote };

      //Je click sur détails du chantier
      await page.evaluate((id = data[i]) => {
        appCeeManager.openCreateProject(id, {
          step: "project_step_operations",
        });
      }, data[i]);
      let dataDetailsExport = await detailsSite(page);
      folder.quote = { ...folder.quote, ...dataDetailsExport.quote };

      // Je click sur synthèse
      await page.evaluate((id = data[i]) => {
        appCeeManager.openCreateProject(id, { step: "project_step_review" });
      }, data[i]);
      let dataSynthExport = await synthSite(page);
      folder.simulation = {
        ...folder.simulation,
        ...dataSynthExport.simulation,
      };
      folder.quote = { ...folder.quote, ...dataSynthExport.quote };

      // Je click sur documents contractuels
      await page.evaluate((id = data[i]) => {
        appCeeManager.openCreateProject(id, { step: "project_step_printing" });
      }, data[i]);
      let dataDocExport = await contractDocuments(page);
      folder.simulation = { ...folder.simulation, ...dataDocExport.simulation };

      dataExport.push(folder);
    }
    // console.log("dataExport :", dataExport);

    if (!DEBUG) await browser.close();
  } catch (error) {
    return error;
  }
})();

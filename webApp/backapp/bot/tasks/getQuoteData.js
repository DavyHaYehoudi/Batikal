const { login } = require("../login");
const { synthSite } = require("../section/synthSite");
const { clientInfo } = require("../section/clientInfos");
const { detailsSite } = require("../section/detailsSite");

module.exports.getQuoteData = async (idFolderEDF) => {
  try {
    let page = await login("Jp.george@energhia.fr", "@PaMiNa357");

    console.log("idFolderEDF :", idFolderEDF);
    await page.goto(
      "https://portail3e.edf.com/?do=showProjectsListing&edd_paging_p=0&numResults=500"
    );
    console.log("franchissement 1");
    await page.waitForSelector("#edd-search-results");
    const quoteData = {
      id: idFolderEDF,
      quote: "",
    };
    console.log("franchissement 2");
    //Je click sur informations client
    await page.evaluate((idFolderEDF) => {
      appCeeManager.openCreateProject(idFolderEDF, {
        step: "project_step_select_client",
      });
    }, idFolderEDF);
    let dataClientExport = await clientInfo(page);
    quoteData.quote = { ...quoteData.quote, ...dataClientExport.quote };
    console.log("franchissement 3");
    //Je click sur détails du chantier
    await page.evaluate((idFolderEDF) => {
      appCeeManager.openCreateProject(idFolderEDF, {
        step: "project_step_operations",
      });
    }, idFolderEDF);
    let dataDetailsExport = await detailsSite(page);
    quoteData.quote = { ...quoteData.quote, ...dataDetailsExport.quote };
    console.log("franchissement 4");
    // Je click sur synthèse
    await page.evaluate((idFolderEDF) => {
      appCeeManager.openCreateProject(idFolderEDF, {
        step: "project_step_review",
      });
    }, idFolderEDF);
    let dataSynthExport = await synthSite(page);
    console.log("franchissement 5");
    quoteData.quote = { ...quoteData.quote, ...dataSynthExport.quote };
    console.log("franchissement 6");
    return quoteData;
  } catch (error) {
    return error;
  }
};

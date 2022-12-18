module.exports.getAllFolders = async (page) => {
  try {
    await page.goto(
      "https://portail3e.edf.com/?do=showProjectsListing&edd_paging_p=0&numResults=500"
    );

    await page.waitForSelector("#edd-search-results");
    const data = await page.evaluate(() => {
      let folders = [];

      $("#edd-search-results table tr.link").each(function () {
        // Représente la ligne tr en cours
        var tr = $(this);

        var id = tr.attr("onclick");
        id = id.replace("appCeeManager.openCreateProject(", "");
        id = id.replace(", {'step':'project_step_printing'})", "");
        id = id.replace(";", "");

        let tds = tr.children();
        let creationDate = $(tds[10]).text().trim();
        let partner_Name = $(tds[0]).text().trim();
        let client = $(tds[3]).text().trim();
        let foldCEENumber = $(tds[1]).text().trim();
        let siteName = $(tds[7]).text().trim();
        let folderStep = $(tds[6]).find("div").text();
        if (folderStep === "Stade 1 : Chantier simulé") {
          folderStep = "simulation";
        } else {
          folderStep = "chantier";
        }

        folders.push({
          idFolderEDF: id,
          creationDate,
          partner_Name,
          client,
          foldCEENumber,
          siteName,
          folderStep,
        });
      });

      return folders;
    });

    return data;
    // Mettre à jour la DB ici
  } catch (error) {
    return error;
  }
};

module.exports.detailsSite = async (page) => {
  try {
    let quote = {
      activityZone: "",
    };

    await page.waitForSelector("#project_step_operation");

    let element1 = await page.$(
      "#project_step_operation > div.project-details.cell.big-form > div.box-content.bg-gradient-default-2 > form.chantier_info_form.padding-default > div.padding-default > div:nth-child(2) > div.col-xs-9 > select"
    );
    let value1 = await page.evaluate((el) => el.value, element1);
    switch (value1) {
      case "agri":
        quote.activityZone = "Agriculture";
        break;
      case "bar":
        quote.activityZone = "Locaux à usage résidentiel";
        break;
      case "bat":
        quote.activityZone = "Locaux à usage tertiaire / professionnel";
        break;
      case "ind":
        quote.activityZone = "Industrie";
        break;
      case "res":
        quote.activityZone = "Réseau";
        break;
      case "tra":
        quote.activityZone = "Transport";
        break;
      default:
        console.log("default case of detailsSite from bot");
    }

    let detailsSiteExport = { quote };

    return detailsSiteExport;
  } catch (error) {
    return error;
  }
};

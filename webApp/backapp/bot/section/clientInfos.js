module.exports.clientInfo = async (page) => {
  try {
    // let simulation = {
    //   siteName: "",
    //   client: "",
    // };
    let quote = {
      siret_Client: "",
      name_Client: "",
      address_Client: "",
      addressAdditional_Client: "",
      postalCode_Client: "",
      city_Client: "",
      contact_Name: "",
      contact_Tel: "",
      contact_Mail: "",
    };

    await page.waitForSelector("#project_step_select_client");

    //Son SIRET
    let element1 = await page.$(
      "#app_cee_client_form > div:nth-child(8) > div.field-cell.value > input"
    );
    let value1 = await page.evaluate((el) => el.value, element1);
    quote.siret_Client = value1;

    //Son nom
    let element8 = await page.$(
      "#app_cee_client_form > div:nth-child(9) > div.field-cell.value > input"
    );
    // #app_cee_client_form > div:nth-child(9) > div.field-cell.value > input
    let value8 = await page.evaluate((el) => el.value, element8);
    quote.name_Client = value8;
    // simulation.client = value8;

    //Son adresse
    let element9 = await page.$(
      "#app_cee_client_form > div:nth-child(15) > div.field-cell.value > input"
    );
    let value9 = await page.evaluate((el) => el.value, element9);
    quote.address_Client = value9;

    //Son adresse complémentaire
    let element10 = await page.$(
      "#app_cee_client_form > div:nth-child(16) > div.field-cell.value > input"
    );
    let value10 = await page.evaluate((el) => el.value, element10);
    quote.addressAdditional_Client = value10;

    //Son code postal
    let element11 = await page.$(
      "#app_cee_client_form > div:nth-child(17) > div.field-cell.value > div:nth-child(1) > input"
    );
    let value11 = await page.evaluate((el) => el.value, element11);
    quote.postalCode_Client = value11;

    //Sa ville
    let element12 = await page.$(
      "#app_cee_client_form > div:nth-child(17) > div.field-cell.value > div:nth-child(2) > div > div:nth-child(2) > input"
    );
    let value12 = await page.evaluate((el) => el.value, element12);
    quote.city_Client = value12;

    //Interlocuteur
    //nom
    let element2 = await page.$(
      "#app_cee_client_form > div:nth-child(10) > div.field-cell.value > input"
    );
    let value2 = await page.evaluate((el) => el.value, element2);
    //prénom
    let element3 = await page.$(
      "#app_cee_client_form > div:nth-child(11) > div.field-cell.value > input"
    );
    let value3 = await page.evaluate((el) => el.value, element3);
    //fonction
    let element4 = await page.$(
      "#app_cee_client_form > div:nth-child(12) > div.field-cell.value > input"
    );
    let value4 = await page.evaluate((el) => el.value, element4);

    quote.contact_Name = value2 + " " + value3 + " " + "- " + value4;

    //tel
    let element5 = await page.$(
      "#app_cee_client_form > div:nth-child(13) > div.field-cell.value > input"
    );
    let value5 = await page.evaluate((el) => el.value, element5);
    quote.contact_Tel = value5;

    //email
    let element6 = await page.$(
      "#app_cee_client_form > div:nth-child(14) > div.field-cell.value > input"
    );
    let value6 = await page.evaluate((el) => el.value, element6);
    quote.contact_Mail = value6;

    /*Données déjà récupérées par headersFoldersAdmin/user
    //siteName
    let element7 = await page.$(
      "#project_step_select_client > div.project-details.cell.big-form > div:nth-child(3) > div > form > div > div.different_address.table > div:nth-child(2) > div.field-cell.value > input"
    );
    let value7 = await page.evaluate((el) => el.value, element7);
    simulation.siteName = value7;
    */

    let dataClientExport = { quote };
    return dataClientExport;
  } catch (error) {
    return error;
  }
};

module.exports.synthSite = async (page) => {
  try {
    // let simulation = {
    //   creationDate: "",
    //   partner_Name: "",
    // };
    let quote = {
      quoteCumac: "",
      cheets: [],
      address_Site: "",
      addressAdditional_Site: "",
      postalCode_Site: "",
      city_Site: "",
      startWorksDate: "",
      deadlineWorks: "",
      climaticZone: "",
      totalPrimeCEE: "",
    };

    await page.waitForSelector("#project_step_review ");

    /*Données déjà récupérées par headersFoldersAdmin/user
    //N° dossier CEE
    let element = await page.$("#project_step_review .box-header");
    let value = await page.evaluate((el) => el.textContent, element);
    value = value.replace("\n\tCEE n°  ", "");
    simulation.foldCEENumber = value;
  */
    //Cumac total
    let element1 = await page.$(
      "#project_step_review > div.project-info.cell > div.box-content.project-gain.bg-gradient-default-2 > div > div.text-auto-fix"
    );
    let value1 = await page.evaluate((el) => el.textContent, element1);
    value1 = value1.trim().replace("Kwh Cumac", "");
    while (value1.indexOf(" ") !== -1) {
      value1 = value1.replace(" ", "");
    }
    quote.quoteCumac = value1;

    //Incitation client
    await page.waitForSelector(
      "#project_step_review .project-details input[name=gain_for_client]"
    );
    let element2 = await page.$(
      "#project_step_review .project-details input[name=gain_for_client]"
    );
    let value2 = await page.evaluate((el) => el.value, element2);
    quote.totalPrimeCEE = value2;

    //Informations chantier

    //Adresse
    let element11 = await page.$(
      "#step_3_information_chantier > div:nth-child(1) > div.field-cell.value"
    );
    let value11 = await page.evaluate((el) => el.textContent, element11);
    quote.address_Site = value11;

    //Adresse complément
    let element12 = await page.$(
      "#step_3_information_chantier > div:nth-child(2) > div.field-cell.value"
    );
    let value12 = await page.evaluate((el) => el.textContent, element12);
    quote.addressAdditional_Site = value12;

    //Code postal
    let element13 = await page.$(
      "#step_3_information_chantier > div:nth-child(3) > div.field-cell.value > div:nth-child(1)"
    );
    let value13 = await page.evaluate((el) => el.textContent, element13);
    quote.postalCode_Site = value13;

    //Ville
    let element21 = await page.$(
      "#step_3_information_chantier > div:nth-child(3) > div.field-cell.value"
    );
    let value21 = await page.evaluate((el) => el.innerText, element21);
    value21 = value21.slice(11).trim();
    quote.city_Site = value21;

    //Zone climatique
    let element15 = await page.$(
      "#step_3_information_chantier > div:nth-child(4) > div.field-cell.value"
    );
    let value15 = await page.evaluate((el) => el.textContent, element15);
    value15 = value15.trim();
    quote.climaticZone = value15;

    /*Données déjà récupérées par headersFoldersAdmin/user
    //Date création dossier
    let element16 = await page.$(
      "#step_3_information_chantier > div:nth-child(5) > div.field-cell.value"
    );
    let value16 = await page.evaluate((el) => el.textContent, element16);
    simulation.creationDate = value16;
    */

    //Date début travaux
    let element17 = await page.$(
      "#step_3_information_chantier > div:nth-child(7) > div.field-cell.value"
    );
    let value17 = await page.evaluate((el) => el.textContent, element17);
    value17 = value17.trim();
    quote.startWorksDate = value17;

    //Date fin travaux
    let element18 = await page.$(
      "#step_3_information_chantier > div:nth-child(8) > div.field-cell.value"
    );
    let value18 = await page.evaluate((el) => el.textContent, element18);
    value18 = value18.trim();
    quote.deadlineWorks = value18;

    /*Données déjà récupérées par headersFoldersAdmin/user
    //Nom du partenaire
    await page.waitForSelector("#step_3_domain_intervention");
    let element3 = await page.$("#step_3_domain_intervention .box-header");
    let value3 = await page.evaluate((el) => el.textContent, element3);
    value3 = value3.trim().replace("Partenaire : ", "");
    simulation.partner_Name = value3;
    */

    //Fiche CEE

    let element4 = await page.$$(
      "#step_3_domain_intervention > div > div > div.clearfix > h3"
    );
    let element5 = await page.$$(
      "#step_3_domain_intervention > div > div > div.clearfix > span"
    );

    // noeud quantité et unité aléatoire et optionnel
    // let element6 = await page.$(
    //   "#step_3_domain_intervention > div > div > div.bg-gradient-default-2.padding-default > div:nth-child(4) > div.col-vs-3"
    // );

    /*  Sur le sossier id: 81289, 2 fiches
   1--- 
  #project_step_operation > div.project-details.cell.big-form > div.partenaire-projects.margin-b-default > div > div.padding-small > div.box-content.bg-gradient-default-2.domaines_de_intervention > div.domain-options.padding-l-r-default.margin-b-default > div.option.scroll.active.opt_thermique > table > tbody > tr.travaux_option.row_bat_th_146_16743 > td > div > form > div:nth-child(5) > div:nth-child(2) > input
  
    2--- Quelles infos récupérer ? */

    /* Sur le même dossier id: 80473, 4 fiches
  
    1---
     #project_step_operation > div.project-details.cell.big-form > div.partenaire-projects.margin-b-default > div > div.padding-small > div.box-content.bg-gradient-default-2.domaines_de_intervention > div.domain-options.padding-l-r-default.margin-b-default > div.option.scroll.active.opt_thermique > table > tbody > tr.travaux_option.row_bat_th_146_20475 > td > div > form.form_bat_th_146_20475_159386.domain_adv_form > div:nth-child(5) > div:nth-child(2) > input
  
    2--- 
    #project_step_operation > div.project-details.cell.big-form > div.partenaire-projects.margin-b-default > div > div.padding-small > div.box-content.bg-gradient-default-2.domaines_de_intervention > div.domain-options.padding-l-r-default.margin-b-default > div.option.scroll.active.opt_thermique > table > tbody > tr.travaux_option.row_bat_th_146_20475 > td > div > form.form_bat_th_146_20475_160285.domain_adv_form > div:nth-child(5) > div:nth-child(2) > input
  
    3--- 
    #project_step_operation > div.project-details.cell.big-form > div.partenaire-projects.margin-b-default > div > div.padding-small > div.box-content.bg-gradient-default-2.domaines_de_intervention > div.domain-options.padding-l-r-default.margin-b-default > div.option.scroll.active.opt_thermique > table > tbody > tr.travaux_option.row_bat_th_146_20475 > td > div > form.form_bat_th_146_20475_160286.domain_adv_form > div:nth-child(5) > div:nth-child(2) > input
  
    4--- 
    #project_step_operation > div.project-details.cell.big-form > div.partenaire-projects.margin-b-default > div > div.padding-small > div.box-content.bg-gradient-default-2.domaines_de_intervention > div.domain-options.padding-l-r-default.margin-b-default > div.option.scroll.active.opt_thermique > table > tbody > tr.travaux_option.row_bat_th_146_20475 > td > div > form.form_bat_th_146_20475_160287.domain_adv_form > div:nth-child(5) > div:nth-child(2) > input */

    /* sur le dossier id: 80156
    1---
    #project_step_operation > div.project-details.cell.big-form > div.partenaire-projects.margin-b-default > div > div.padding-small > div.box-content.bg-gradient-default-2.domaines_de_intervention > div.domain-options.padding-l-r-default.margin-b-default > div.option.scroll.active.opt_thermique > table > tbody > tr.travaux_option.row_bar_th_160_16743 > td > div > form > div:nth-child(5) > div:nth-child(2) > input
  
    2--- Quoi récupérer ?
   */
    for (let i = 0; i < element4.length; i++) {
      //Son nom
      let value4 = await page.evaluate((el) => el.textContent, element4[i]);
      value4 = value4.trim();
      while (value4.indexOf("   ") !== -1) {
        value4 = value4.replace("   ", "  ");
      }

      //Son Cumac
      let value5 = await page.evaluate((el) => el.textContent, element5[i]);
      value5 = value5.trim().replace(" kWh Cumac", "");

      /*
      let value6 = await page.evaluate((el) => el.textContent, element6);
      value6 = value6.trim();
  
      //quantité
      let value19 = value6.replace(/\D/g, "");
  
      //unité
      let value20 = value6.replace(new RegExp("[^(a-zA-Z)]", "g"), "");
  */
      quote.cheets[i] = {
        ...quote.cheets[i],
        ...{ cheetName: value4 },
        ...{ cheetCumac: value5 },
      };
    }

    let dataSynthExport = { quote };
    return dataSynthExport;
  } catch (error) {
    return error;
  }
};

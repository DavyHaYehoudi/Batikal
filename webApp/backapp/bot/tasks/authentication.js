const { login } = require("../login");

module.exports.authentication = async (email, password) => {
  try {
    console.log("autentication - niveau 1");
    let page = await login(email, password);

    // console.log("autentication - niveau 2");
    await page.waitForSelector(
      "#a7 > div:nth-child(2) > div.edf-top-header > div.edf-header > div.appcee-header > div.pull-right > h4 > a"
    );

    // console.log("autentication - niveau 3");
    let node = await page.$(
      "#a7 > div:nth-child(2) > div.edf-top-header > div.edf-header > div.appcee-header > div.pull-right > h4 > a "
    );

    // console.log("autentication - niveau 4");
    let partner_Name = await page.evaluate((el) => el.textContent, node);

    // console.log("autentication - niveau 5");
    partner_Name = partner_Name.trim();
    
    // console.log("autentication - niveau 6");
    return partner_Name;
  } 
  catch (error) {
    console.log("erreur dans authentication :",error);
    return "ERR_BAD_REQUEST";
  }
};

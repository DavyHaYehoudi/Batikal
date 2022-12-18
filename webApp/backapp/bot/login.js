const { config } = require("./config");

module.exports.login = async (email, password) => {
  try {
    // console.log("bot login étape 1");
    let page = await config();
    // console.log("bot login étape 2");
    //Connexion au portail
    await page.waitForSelector(
      "#Teaser > .group > div > .margin-b-default > span"
    );
    await page.click("#Teaser > .group > div > .margin-b-default > span");
    // console.log("bot login étape 3");
    await page.waitForSelector(
      "#HeaderLogin > li > .login-user-form > fieldset > .uName"
    );
    // console.log("bot login étape 4");
    await page.type(
      "#HeaderLogin > li > .login-user-form > fieldset > .uName",
      email,
      { delay: 100 }
    );
    // console.log("bot login étape 5");
    await page.type(
      "#HeaderLogin > li > .login-user-form > fieldset > .uPassword",
      password,
      { delay: 50 }
    );
    // console.log("bot login étape 6");
    await page.click(
      "#HeaderLogin > li > .login-user-form > fieldset > .button"
    );
    // console.log("dernière ligne du Try de login du bot");
    return page;
  } catch (error) {
    console.log("une erreur dans le login du bot :", error);
    return error;
  }
};

//admin email :"Jp.george@energhia.fr"
//admin psw :"@PaMiNa357"

//user email : "direction@batikal.eu",
//user psw : "Batireno26"

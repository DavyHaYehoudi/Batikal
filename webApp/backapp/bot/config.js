console.log("config du bot étape 1");
const puppeteer = require("puppeteer");


module.exports.config = async () => {
  try {
    // console.log("config du bot étape 2");
    // const DEBUG = false;
    // console.log("config du bot étape 3");
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({ headless: true,  });
    // console.log("config du bot étape 4");
    const page = await browser.newPage();
    // console.log("config du bot étape 5");
    const navigationPromise = page.waitForNavigation();
    // console.log("config du bot étape 6");

    await page.goto("https://portail3e.edf.com/?do=showUserProfile");
    // console.log("config du bot étape 7");
    await page.setViewport({ width: 1536, height: 714 });
    // console.log("config du bot étape 8");
    await navigationPromise;
    // console.log("config du bot étape 9");

    return page;
  } catch (error) {
    console.log("erreur dans le bot config :", error);
    return error;
  }
};

var express = require('express');
var router = express.Router();
const {
  User,
  AllSkill
} = require('../db/models');
const {
  checkUser,
  deepCheckUser
} = require('../middlewares/user');
const puppeteer = require('puppeteer');
const browserObject = require('../scrapper/browser');
const scraperController = require('../scrapper/pageController');


router.post('/', async (req, res) => {
  const {
    jobtitle,
    count,
    countSkills,
  } = req.body;


  //Start the browser and create a browser instance
  let browserInstance = browserObject.startBrowser();

  const url = jobtitle; //`https://hh.ru/search/vacancy?clusters=true&area=1&ored_clusters=true&enable_snippets=true&salary=&text=${jobtitle}`;
  // Pass the browser instance to the scraper controller
  const params = {
    url,
    count,
    countSkills,
  };
  await scraperController(browserInstance, params);

  const skillsArr = await AllSkill.findAll();
  res.json({
    skillsArr
  });
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('scrap');
});

module.exports = router;

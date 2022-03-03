const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance, url, count){
  
	let browser;
	try{
		browser = await browserInstance;
		await pageScraper.scraper(browser, url, count);	
		
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance, url, count) => scrapeAll(browserInstance, url, count);

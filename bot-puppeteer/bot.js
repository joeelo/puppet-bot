const pup = require('puppeteer');

const productUrl = 'https://www.walmart.com/ip/Sony-PlayStation-5-Digital-Edition/493824815';

const getPage = async () => {
	try {
		const browser = await pup.launch({ headless: false }); 
		const page = await browser.newPage(); 
		await page.goto(productUrl);
		console.log('done');
	} catch (error) {
        console.log("🚀 ~ file: bot.js ~ line 11 ~ getPage ~ error", error);
	}
}

const addToCart = async () => {
	try {
		
	} catch (error) {
    console.log("🚀 ~ file: bot.js ~ line 22 ~ addToCart ~ error", error);
	}
}

const checkout = async () => {
	try {
		getPage(); 
	} catch (error) {
        console.log("🚀 ~ file: bot.js ~ line 13 ~ createPage ~ error", error);
	}
}

checkout(); 
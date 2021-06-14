const pup = require('puppeteer');

// const productUrl = 'https://www.walmart.com/ip/Sony-PlayStation-5-Digital-Edition/493824815';
const productUrl = 'https://www.walmart.com/ip/Everso-Men-s-Luxury-Watch-Maserati-Watch-Waterproof-Watch-Men-s-Business-Stainless-Sports-Watch-Quartz-Watch/796779918'

const openPage = async () => {
	try {
		const browser = await pup.launch({ headless: false }); 
		const page = await browser.newPage(); 
		return page; 
	} catch (error) {
    	console.log("🚀 ~ file: bot.js ~ line 12 ~ openPage ~ error", error)
	}
}

const addToCart = async (page) => {
	try {
		await page.goto(productUrl);
		await page.waitForSelector('[class="button spin-button prod-ProductCTA--primary button--primary"]');
		await page.click('button[class="button spin-button prod-ProductCTA--primary button--primary"]', elem => elem.click());
		await page.waitForNavigation();
		await page.waitForSelector('[class="button ios-primary-btn-touch-fix hide-content-max-m checkoutBtn button--primary"]');
		await page.click('button[class="button ios-primary-btn-touch-fix hide-content-max-m checkoutBtn button--primary"]', elem => elem.click());
		await page.waitForSelector('[data-automation-id="new-guest-continue-button"]');
		await page.click('button[data-automation-id="new-guest-continue-button"]', elem => elem.click());
		await page.waitForTimeout(1000);
		await page.waitForSelector('[data-automation-id="fulfillment-continue"]');
		await page.click('button[data-automation-id="fulfillment-continue"]', elem => elem.click());
	} catch (error) {
    console.log("🚀 ~ file: bot.js ~ line 22 ~ addToCart ~ error", error);
	}
}

const fillOutBillingSection = async (page) => {
	try {
		await page.waitForTimeout(1000);
		await page.type('input[id="firstName"]', 'Joseph');
	} catch (error) {
        console.log("🚀 ~ file: bot.js ~ line 38 ~ fillOutBillingSection ~ error", error)
	}
}

const checkout = async () => {
	try {
		const openedPage = await openPage(); 
		await addToCart(openedPage);
		await fillOutBillingSection(openedPage);
	} catch (error) {
        console.log("🚀 ~ file: bot.js ~ line 13 ~ createPage ~ error", error);
	}
}

checkout(); 
const pup = require('puppeteer');
const card = require('./credit');

// const productUrl = 'https://www.walmart.com/ip/Sony-PlayStation-5-Digital-Edition/493824815';
const productUrl = 'https://www.walmart.com/ip/Everso-Men-s-Luxury-Watch-Maserati-Watch-Waterproof-Watch-Men-s-Business-Stainless-Sports-Watch-Quartz-Watch/796779918'; 

const clearAndFill = async (page, inputId, text) => {
	try {
		const input = await page.$(inputId); 
		await input.click({ clickCount: 3 });
		await input.type(text);
		await page.keyboard.press('Tab');
	} catch (error) {
        console.log("🚀 ~ file: bot.js ~ line 11 ~ clearAndFill ~ error", error);
	}
}

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
		await page.waitForTimeout(1000);
		await page.type('input[id="lastName"]', 'Lorenzo');
		await page.waitForTimeout(1000);
		await page.type('input[id="phone"]', '7188255168');
		await page.waitForTimeout(1000);
		await page.type('input[id="email"]', 'josephclorenzo@gmail.com');
		await page.waitForTimeout(1000);
		const selectElem = await page.$('select[id="state"]'); 
		await selectElem.type('California');
		await page.type('input[id="addressLineOne"]', '801 a st');
		await page.waitForTimeout(1000);
		await page.keyboard.press('Tab');
		await page.type('input[id="addressLineTwo"]', '#2019');
		await page.click('button[data-automation-id="address-book-action-buttons-on-continue"]');
	} catch (error) {
		console.log("🚀 ~ file: bot.js ~ line 38 ~ fillOutBillingSection ~ error", error);
	}
}

const fillOutCardSection = async (page) => {
	try {
		await page.waitForSelector('input[data-automation-id="cardNumber-cc"]');
		await page.type('input[data-automation-id="cardNumber-cc"]', card.cardNumber);
		const monthSelect = await page.$('select[data-automation-id="expiryMonth-cc"]');
		await monthSelect.type(card.expMonth);
		const yearSelect = await page.$('select[data-automation-id="expiryYear-cc"]');
		await yearSelect.type(card.expYear);
		await page.type('input[data-automation-id="cvv-verify-cc"]', card.ccv); 
		await page.click('input[class="input-toggle__input"]'); 
		await clearAndFill(page, 'input[data-automation-id="addressLineOne-cc"]', '2842 Grand Concourse')
		await page.type('input[data-automation-id="addressLineTwo-cc"]', 'Apt 6H');
		await clearAndFill(page, 'input[data-automation-id="city-cc"]', 'Bronx');
		await clearAndFill(page, 'input[data-automation-id="postalCode-cc"]', '10458');
		const citySelect = await page.$('select[id="state"]');
		citySelect.type('New York');
		await page.click('button[data-automation-id="save-cc"]');
	} catch (error) {
        console.log("🚀 ~ file: bot.js ~ line 62 ~ fillOutCardSection ~ error", error);
	}
}

const checkout = async () => {
	try {
		const openedPage = await openPage(); 
		await addToCart(openedPage);
		await fillOutBillingSection(openedPage);
		await fillOutCardSection(openedPage);
	} catch (error) {
        console.log("🚀 ~ file: bot.js ~ line 13 ~ createPage ~ error", error);
	}
}

checkout(); 
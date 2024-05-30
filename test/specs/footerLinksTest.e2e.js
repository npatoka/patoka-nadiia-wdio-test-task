import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";


describe('Sorting test suite', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it(`Test Case ID 7. Footer Links.`, async () => {
        await InventoryPage.verifyLink('Twitter', InventoryPage.twitterLink, 'https://twitter.com/saucelabs');
        await InventoryPage.verifyLink('Facebook', InventoryPage.facebookLink, 'https://www.facebook.com/saucelabs');
        await InventoryPage.verifyLink('LinkedIn', InventoryPage.linkedinLink, 'https://www.linkedin.com/company/sauce-labs/');
    });
});

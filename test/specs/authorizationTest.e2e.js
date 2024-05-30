import {browser, expect} from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import {logger} from "../helpers/logger.js";
import CartPage from "../pageobjects/cart.page.js";

describe('Authorization test suite', () => {

    beforeEach(async () => {
        await LoginPage.open();
    });

    it('Test Case ID 1. Valid Login.', async () => {
        await logger.info('Login with valid credentials.');
        await LoginPage.login('standard_user', 'secret_sauce');

        await logger.info('User is redirected to the inventory page');
        await expect(await browser.getUrl()).toContain('/inventory.html');

        await logger.info('Products and cart are displayed');
        await expect(InventoryPage.inventoryItem).toBeDisplayed();
        await expect(InventoryPage.shoppingCartButton).toBeDisplayed();
    })

    it('Test Case ID 2. Login with invalid password.', async () => {
        await logger.info('Login with invalid credentials.');
        await LoginPage.login('standard_user', 'wrong_password');

        await logger.info('Fields highlighted with red');
        await expect(LoginPage.usernameInputField).toHaveElementClass('error');
        await expect(LoginPage.passwordInputField).toHaveElementClass('error');

        await logger.info('"X" icons are displayed on the "Login" and "Password" fields');
        await expect(LoginPage.usernameInputFieldCrossButton).toBeDisplayed();
        await expect(LoginPage.passwordInputFieldCrossButton).toBeDisplayed();

        await logger.info('"Epic sadface: Username and password do not match any user in this service" error message is displayed');
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })

    it('Test Case ID 3. Login with invalid login.', async () => {
        await LoginPage.login('unexisting_user', 'secret_sauce');

        await logger.info('Fields highlighted with red');
        await expect(LoginPage.usernameInputField).toHaveElementClass('error');
        await expect(LoginPage.passwordInputField).toHaveElementClass('error');

        await logger.info('"X" icons are displayed on the "Login" and "Password" fields');
        await expect(LoginPage.usernameInputFieldCrossButton).toBeDisplayed();
        await expect(LoginPage.passwordInputFieldCrossButton).toBeDisplayed();

        await logger.info('"Epic sadface: Username and password do not match any user in this service" error message is displayed');
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })
})


describe('Logout test suite', () => {
    beforeEach(async () => {
        logger.info('Login with valid credentials.');
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it('Test Case ID 4. Logout.', async () => {
        await InventoryPage.openBurgerMenu();

        logger.info('Menu is expanded, 4 items are displayed');
        expect(await InventoryPage.burgerMenuItems).toHaveLength(4);

        await InventoryPage.clickBurgerMenuLogoutButton();

        logger.info('User is redirected to the "Login" page');
        await expect(await browser.getUrl()).not.toContain('/inventory.html');
        await expect(await browser.getUrl()).toEqual('https://www.saucedemo.com/');

        logger.info('"Username" and "Password" fields are empty');
        await expect(await LoginPage.getInputFieldValue(LoginPage.usernameInputField)).toBe('');
        await expect(await LoginPage.getInputFieldValue(LoginPage.passwordInputField)).toBe('');
    })

    it('Test Case ID 5. Saving the cart after logout.', async () => {
        logger.info('Click on the "Add to cart" button near any product');
        await InventoryPage.addProductToCartByIndex(0);
        let itemName = await InventoryPage.getInventoryItemNameByIndex(0);

        logger.info('Number near the cart at the top right increase by 1, product is added to cart');
        expect(await InventoryPage.getCartItemsCount()).toEqual('1');

        logger.info('Click on the "Burger" button at the top left corner');
        await InventoryPage.openBurgerMenu();

        logger.info('Click on the "Logout" button');
        await InventoryPage.clickBurgerMenuLogoutButton();

        logger.info('User is redirected to the "Login" page');
        await expect(await browser.getUrl()).toEqual('https://www.saucedemo.com/');

        logger.info('Login to the account using the same valid login and password');
        await LoginPage.login('standard_user', 'secret_sauce');

        logger.info('Click on the "Cart" button at the top right corner');
        await InventoryPage.openCart();

        logger.info('Cart page is displayed, product is the same as was added at step 1');
        await InventoryPage.openCart();
        expect(await CartPage.getInventoryItemNameByIndex(0)).toEqual(itemName);
    })
})
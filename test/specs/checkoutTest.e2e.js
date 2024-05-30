import {browser, expect} from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import {logger} from "../helpers/logger.js";
import CartPage from "../pageobjects/cart.page.js";
import CheckoutPage from "../pageobjects/checkout.page.js";
import CheckoutCompletePage from "../pageobjects/checkoutComplete.page.js";

describe('Authorization test suite', () => {

    beforeEach(async () => {
        logger.info('Login with valid credentials.');
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it('Test Case ID 8. Valid Checkout.', async () => {

        await logger.info('Click on the "Add to cart" button near any product');
        await InventoryPage.addProductToCartByIndex(0);
        let productName = await InventoryPage.getInventoryItemNameByIndex(0);
        let productPrice = await InventoryPage.getInventoryItemPriceByIndex(0);

        await logger.info('Number near the cart at the top right increase by 1, product is added to cart');
        await expect(await InventoryPage.getCartItemsCount()).toEqual('1');

        await logger.info('Click on the "Cart" button at the top right corner');
        await InventoryPage.openCart();

        await logger.info('Click on the "Checkout" button');
        await CartPage.clickCheckoutButton();

        await logger.info('Fill in checkout form');
        await CheckoutPage.fillInCheckoutForm('John', 'Doe', '12345');

        await logger.info('User is redirected to the "Overview" page, Products from step 1 is displayed. Total price = price of products from step 1');
        await expect(await CheckoutPage.getSubtotalPrice()).toEqual(productPrice);
        await expect(await CheckoutPage.getProductNameByIndex(0)).toEqual(productName);

        await CheckoutPage.clickOnFinishButton();

        await logger.info('User is redirected to the "Checkout Complete" page, "Thank you for your order!" message are displayed');
        await expect(await browser.getUrl()).toContain('/checkout-complete.html');
        await expect(await CheckoutCompletePage.thankYouMessageHeader).toBeDisplayed();
        await expect(await CheckoutCompletePage.thankYouMessageHeader).toHaveText('Thank you for your order!');
        await expect(await CheckoutCompletePage.thankYouMessageBody).toBeDisplayed();
        await expect(await CheckoutCompletePage.thankYouMessageBody).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

        await CheckoutCompletePage.clickOnBackHomeButton();

        await logger.info('User is redirected to the inventory page');
        await expect(await browser.getUrl()).toContain('/inventory.html');

        await logger.info('Products and cart are displayed');
        await expect(InventoryPage.inventoryItem).toBeDisplayed();
        await expect(InventoryPage.shoppingCartButton).toBeDisplayed();

        await logger.info('Cart is empty');
        await expect(await InventoryPage.shoppingCartBadge).not.toExist();
    })

    // wrong test case, should fail
    it('Test Case ID 9. Checkout without products.', async () => {

        await logger.info('Click on the "Cart" button at the top right corner');
        await InventoryPage.openCart();

        await logger.info('Click on the "Checkout" button');
        await CartPage.clickCheckoutButton();

        await logger.info('User is located on the "Cart" Page, error message "Cart is empty" is displayed');
        await expect(await CheckoutPage.unexistingErrorMessage).toBeDisplayed();
    })
})
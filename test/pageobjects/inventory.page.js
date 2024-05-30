import { $, $$ } from '@wdio/globals'
import Page from './page.js';
import {logger} from "../helpers/logger.js";

class InventoryPage extends Page {

    get headerLabel () {
        return $('.header_label');
    }

    get burgerMenuButton () {
        return $('#react-burger-menu-btn');
    }

    get shoppingCartButton () {
        return $('[data-test="shopping-cart-link"]');
    }

    get inventoryItem () {
        return $('[data-test="inventory-item"]');
    }

    get burgerMenuItems () {
        return $$('.menu-item');
    }

    get burgerMenuLogoutButton () {
        return $('[data-test="logout-sidebar-link"]');
    }

    get addToCartButtons () {
        return $$('[data-test*="add-to-cart"]');
    }

    get inventoryItemNames () {
        return $$('[data-test="inventory-item-name"]');
    }

    get inventoryItemPrices () {
        return $$('[data-test="inventory-item-price"]');
    }

    get shoppingCartBadge () {
        return $('[data-test="shopping-cart-badge"]');
    }

    get sortingDropdown () {
        return $('[data-test="product-sort-container"]');
    }

    async openBurgerMenu () {
        await this.clickOn(this.burgerMenuButton);
    }

    async clickBurgerMenuLogoutButton () {
        await this.clickOn(this.burgerMenuLogoutButton);
    }

    async addProductToCartByIndex (itemIndex) {
        await this.clickOn(this.addToCartButtons[itemIndex]);
    }

    async getCartItemsCount () {
        return await this.shoppingCartBadge.getText();
    }

    async getInventoryItemNameByIndex (itemIndex) {
        return this.inventoryItemNames[itemIndex].getText();
    }

    async getInventoryItemPriceByIndex (itemIndex) {
        return this.inventoryItemPrices[itemIndex].getText();
    }

    async openCart () {
        await this.clickOn(this.shoppingCartButton);
    }

    async selectSortingBySortingName (sortingName) {
        await this.sortingDropdown.selectByVisibleText(sortingName);
    }

    async getInventoryItemNames() {
        const itemElements = await this.inventoryItemNames;
        return Promise.all( await itemElements.map(async (item) => {
            return await item.getText();
        }));
    }

    async getInventoryItemPrices() {
        const priceElements = await this.inventoryItemPrices;
        return Promise.all(await priceElements.map(async (item) => {
            const priceText = await item.getText();
            return parseFloat(priceText.replace('$', ''));
        }));
    }

    async verifyLink(name, linkSelector, link) {
        await logger.info(`Footer link to ${name} is displayed, clickable and lead to correct resource.`);
        await expect(await linkSelector).toBeDisplayed();
        await expect(await linkSelector).toBeClickable();
        await expect(await linkSelector).toHaveHref(link);

        await logger.info(`${name} link should be opened in a new tab and without referrer.`);
        await expect(await linkSelector).toHaveAttribute('target', '_blank');
        await expect(await linkSelector).toHaveAttribute('rel', 'noreferrer');
    }

}


export default new InventoryPage();

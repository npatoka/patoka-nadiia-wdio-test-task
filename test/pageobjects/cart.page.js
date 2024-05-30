import {$, $$} from '@wdio/globals'
import Page from './page.js';

class CartPage extends Page {

    get inventoryItemName () {
        return $$('[data-test="inventory-item-name"]');
    }

    get checkoutButton () {
        return $('[data-test="checkout"]');
    }

    async getInventoryItemNameByIndex (itemIndex) {
        return await this.inventoryItemName[itemIndex].getText();
    }

    async clickCheckoutButton () {
        await this.clickOn(this.checkoutButton);
    }

    open () {
        return super.open('cart.html');
    }
}

export default new CartPage();

import { $, $$ } from '@wdio/globals'
import Page from './page.js';
import {logger} from "../helpers/logger.js";

class CheckoutPage extends Page {

    get firstNameInputField () {
        return $('[data-test="firstName"]');
    }

    get lastNameInputField () {
        return $('[data-test="lastName"]');
    }

    get postalCodeInputField () {
        return $('[data-test="postalCode"]');
    }

    get continueButton () {
        return $('[data-test="continue"]');
    }

    get finishButton () {
        return $('[data-test="finish"]');
    }

    get subtotalPrice () {
        return $('[data-test="subtotal-label"]');
    }
    
    get productNames () {
        return $$('[data-test="inventory-item-name"]');
    }

    get unexistingErrorMessage () {
        return $('[data-test="fake-selector-for-expected-error-message"]');
    }

    async fillInCheckoutForm (name, lastName, postalCode) {
        logger.info('Fill the "First Name" field');
        await this.firstNameInputField.setValue(name);

        logger.info('Fill the "Last Name" field');
        await this.lastNameInputField.setValue(lastName);

        logger.info('Fill the "Postal Code" field');
        await this.postalCodeInputField.setValue(postalCode);

        logger.info('Click on the "Continue" button');
        await this.clickOn(this.continueButton);
    }

    async clickOnFinishButton () {
        logger.info('Click on the "Finish" button');
        await this.clickOn(this.finishButton);
    }

    async getSubtotalPrice () {
        const text = await this.subtotalPrice.getText();
        const match = text.match(/\$\d+\.\d{2}/);

        if (match) {
            return match[0];
        } else {
            throw new Error('Price not found in element text');
        }
    }
    
    async getProductNameByIndex (index) {
        return this.productNames[index].getText();
    }

}


export default new CheckoutPage();

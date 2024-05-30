import { $, $$ } from '@wdio/globals'
import Page from './page.js';
import {logger} from "../helpers/logger.js";

class CheckoutCompletePage extends Page {

    get thankYouMessageHeader () {
        return $('[data-test="complete-header"]');
    }

    get thankYouMessageBody () {
        return $('[data-test="complete-text"]');
    }

    get backHomeButton () {
        return $('[data-test="back-to-products"]');
    }

    async clickOnBackHomeButton () {
        await this.clickOn(this.backHomeButton);
    }
}


export default new CheckoutCompletePage();

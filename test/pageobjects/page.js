import {$, browser} from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {

    get twitterLink () {
        return $('[data-test="social-twitter"]');
    }

    get facebookLink () {
        return $('[data-test="social-facebook"]');
    }

    get linkedinLink () {
        return $('[data-test="social-linkedin"]');
    }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`https://www.saucedemo.com/${path}`)
    }

    async clickOn(element){
        await element.waitForDisplayed();
        await element.waitForClickable({ timeout: 5000 });
        await element.click();
    }
}

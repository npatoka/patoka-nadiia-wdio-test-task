import { $ } from '@wdio/globals'
import Page from './page.js';


class LoginPage extends Page {

    get usernameInputField () {
        return $('[data-test="username"]');
    }

    get usernameInputFieldCrossButton () {
        return $('[data-test="username"]+[data-icon="times-circle"]');
    }

    get passwordInputField () {
        return $('[data-test="password"]');
    }

    get passwordInputFieldCrossButton () {
        return $('[data-test="password"]+[data-icon="times-circle"]');
    }

    get btnSubmit () {
        return $('[data-test="login-button"]');
    }

    get errorMessage () {
        return $('[data-test="error"]');
    }

    get errorMessageCloseButton () {
        return $('[data-test="error-button"]');
    }

    async login (username, password) {
        await this.usernameInputField.setValue(username);
        await this.passwordInputField.setValue(password);
        await this.btnSubmit.click();
    }

    async getInputFieldValue(inputField){
       return await inputField.getValue()
    }

    open () {
        return super.open('');
    }
}

export default new LoginPage();

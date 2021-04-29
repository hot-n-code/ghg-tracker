import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SigninPage {
  constructor() {
    this.pageId = '#login-dropdown-sign-in';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async signin(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#root > div > div.background-all > div > div > div > div.ui.grey.padded.segment > form > div:nth-child(1) > div > input[type=email]', username);
    await testController.typeText('#root > div > div.background-all > div > div > div > div.ui.grey.padded.segment > form > div:nth-child(2) > div > input[type=password]', password);
    await testController.click('#root > div > div.background-all > div > div > div > div.ui.grey.padded.segment > form > div:nth-child(3) > button');
    await navBar.isLoggedIn(testController, username);
  }
}

export const signinPage = new SigninPage();

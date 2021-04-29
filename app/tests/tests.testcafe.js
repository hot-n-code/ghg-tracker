import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { hemorePage } from './hemore.page';
import { asbmorePage } from './asbmore.page';
import { aboutPage } from './about.page';
import { pcmorePage } from './pcmore.page';
import { cumulativePage } from './cumulative.page';
import { profilePage } from './profile.page';
import { comparePage } from './compare.page';
import { historyPage } from './history.page';
import { vehiclePage } from './vehicles.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'test@gmail.com', password: 'foo' };

fixture('ghg-tracker test with populated db')
    .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test about page', async (testController) => {
  await navBar.gotoAboutPage(testController);
  await aboutPage.gotoHemore(testController);
  await hemorePage.isDisplayed(testController);
  await navBar.gotoAboutPage(testController);
  await aboutPage.gotoAsbmore(testController);
  await asbmorePage.isDisplayed(testController);
  await navBar.gotoAboutPage(testController);
  await pcmorePage.isDisplayed(testController);
});

test('Test cumulative users page', async (testController) => {
  await navBar.gotoCumulativeDataPage(testController);
  await cumulativePage.isDisplayed(testController);
});

test('Test profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoProfilePage(testController);
  await profilePage.editProfile(testController);
  await profilePage.whatIf(testController);
});

test('Test compare page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoProfilePage(testController);
  await profilePage.gotoCompare(testController);
  await comparePage.isDisplayed(testController);
});

test('Test history page from profile', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoProfilePage(testController);
  await profilePage.gotoHistory(testController);
  await historyPage.isDisplayed(testController);
});

test('Test history page from navbar', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoHistoryPage(testController);
  await historyPage.isDisplayed(testController);
});

test.skip('Test vehicles page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoVehiclePage(testController);
  await vehiclePage.isDisplayed();
});

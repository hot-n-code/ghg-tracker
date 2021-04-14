import { Selector } from 'testcafe';

class ProfilePage {
  constructor() {
    this.pageId = '#profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editProfile(testController) {
    await testController.click('#edit-profile');
    await testController.typeText('#edit-name', 'test1');
    await testController.click('#edit-submit');
    await testController.click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div > button');
  }

  async addData(testController) {
    await testController.click('#profile-page > div > div.ui.stackable.two.column.grid > div:nth-child(1) > div > div > div:nth-child(5) > button:nth-child(2)');
    await testController.typeText('#add-data-date-button', '2021-04-13T21:59');
    await testController.click('#transportation-selector');
    await testController.click('#transportation-selector > option:nth-child(10)');
    await testController.typeText('#miles-field', '10');
    await testController.click('#radio-label-field-bWk');
    await testController.click('body > div.ui.page.modals.dimmer.transition.visible.active > div > div.content > form > input');
    await testController.click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div > button');
  }

  async whatIf(testController) {
    await testController.click('#profile-page > div > div.ui.stackable.two.column.grid > div:nth-child(1) > div > div > div:nth-child(5) > button:nth-child(3)');
    await testController.typeText('#add-data-date-button', '2021-04-13T21:59');
    await testController.click('#transportation-selector');
    await testController.click('#transportation-selector > option:nth-child(10)');
    await testController.typeText('#miles-field', '10');
    await testController.click('#radio-label-field-bWk');
    await testController.click('body > div.ui.page.modals.dimmer.transition.visible.active > div > div.content > form > input');
    await testController.click('body > div:nth-child(76) > div > div.actions > button');
  }

  async gotoCompare(testController) {
    await testController.click('#link-to-compare-page');
  }

  async gotoHistory(testController) {
    await testController.click('#profile-page > div > div.ui.stackable.two.column.grid > div:nth-child(1) > div > div > div:nth-child(5) > a');
  }
}

export const profilePage = new ProfilePage();

import { Selector } from 'testcafe';

class AboutPage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoHemore(testController) {
    await testController.click('#hemore');
  }

  async gotoAsbmore(testController) {
    await testController.click('#asbmore');
  }

  async gotoPcmore(testController) {
    await testController.click('#pcmore');
  }
}

export const aboutPage = new AboutPage();

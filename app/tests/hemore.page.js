import { Selector } from 'testcafe';

class HemorePage {
  constructor() {
    this.pageId = '#hemore';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const hemorePage = new HemorePage();

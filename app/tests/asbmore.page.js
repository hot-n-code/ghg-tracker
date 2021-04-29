import { Selector } from 'testcafe';

class AsbmorePage {
  constructor() {
    this.pageId = '#asbmore';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const asbmorePage = new AsbmorePage();

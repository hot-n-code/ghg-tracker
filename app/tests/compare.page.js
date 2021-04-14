import { Selector } from 'testcafe';

class ComparePage {
  constructor() {
    this.pageId = '#compare-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const comparePage = new ComparePage();

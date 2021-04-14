import { Selector } from 'testcafe';

class CumulativePage {
  constructor() {
    this.pageId = '#cumulative-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const cumulativePage = new CumulativePage();

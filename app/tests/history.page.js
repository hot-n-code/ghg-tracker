import { Selector } from 'testcafe';

class HistoryPage {
  constructor() {
    this.pageId = '#user-react-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const historyPage = new HistoryPage();

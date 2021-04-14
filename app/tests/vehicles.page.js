import { Selector } from 'testcafe';

class VehiclesPage {
  constructor() {
    this.pageId = '#my-vehicle-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const vehiclePage = new VehiclesPage();

import { Selector } from 'testcafe';

class VehiclesPage {
  constructor() {
    this.pageId = '#my-vehicles-page > div > div:nth-child(1) > h1';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.wait(5000).expect(this.pageSelector.exists).ok();
  }
}

export const vehiclePage = new VehiclesPage();

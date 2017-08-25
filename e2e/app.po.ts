import { browser, element, by } from '../node_modules/protractor';

export class NewUserInterface {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}

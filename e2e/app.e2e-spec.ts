import { NewUserInterface } from './app.po';
import { browser } from '../node_modules/protractor';

describe('User Inteface Initialization', () => {
    let page: NewUserInterface;

    beforeEach(() => {
        page = new NewUserInterface();

    });

    it('Angular 4 + Redux Seed bootstraps correctly', () => {
        page.navigateTo();
        browser.driver.manage().window().maximize();
        expect(page).toBeDefined();
    });
});
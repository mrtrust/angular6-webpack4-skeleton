import { browser, by, element } from 'protractor';
import 'tslib';

describe('Login', () => {

  beforeEach(async () => {
    /**
     * Change hash depending on router LocationStrategy.
     */
    await browser.get('/');
    //await element(by.linkText('Home')).click();
  });

  it('should have a title Skeleton Angular 6', async () => {
    const subject = await browser.getTitle();
    const result = 'Skeleton Angular 6';
    expect(subject).toEqual(result);
  });

  it('should have \'Please login\' header', async () => {
    const subject = await element(by.css('.login-form__header')).getText();
    const result = 'Please login';
    expect(subject).toEqual(result);
  });

  it('should have app site wrapper', async () => {
    const subject = await element(by.css('app .site-wrapper__content')).isPresent();
    const result  = true;
    expect(subject).toEqual(result);
  });

});

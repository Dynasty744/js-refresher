// Page Object Model Example for a Login Page
import { test, expect } from '@playwright/test';
import { Browser, Page } from 'playwright';
import { chromium } from 'playwright';

class LoginPage {
  constructor(private page: Page) {}

  private usernameField = 'input[name="username"]';
  private passwordField = 'input[name="password"]';
  private loginButton = 'button[type="submit"]';

  async login(username: string, password: string) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }
}

test.describe('Login Page Test', () => {
  let browser: Browser;
  let page: Page;
  let loginPage: LoginPage;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    loginPage = new LoginPage(page);
  })

  test.beforeeach(async () => {
    await page.goto('https://example.com/login');
  })

  test('Valid Login Test', async () => {
    await loginPage.login('validUsername', 'validPassword');

    const successMessage = await page.locator('.success-message').innerText();
    expect(successMessage).toBe('Login sucessful');
  })

  test('Invalid Login Test', async () => {
    await loginPage.login('invalidUserName', 'invalidPassword');

    const errorMessage = await page.locator('.error-message').innerText();
    expect(errorMessage).toBe('Invalid username or password');
  })

  test.afterAll(async () => {
    await browser.close();
  })
})
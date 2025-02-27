import { Locator, Page } from "@playwright/test";

export class SauceDemoLoginPg {
  page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly login: Locator;
  readonly loginError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.login = page.locator("#login-button");
    this.loginError = page.locator('h3[data-test="error"]');
  }

  async successLogin(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.login.click();
  }

  async UnsuccessLoginError() {
    await this.loginError.waitFor();
    return await this.loginError.textContent();
  }
}

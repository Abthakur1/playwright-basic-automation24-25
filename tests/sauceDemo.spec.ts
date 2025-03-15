import { expect, test } from "@playwright/test";
import { SauceDemoLoginPg } from "../pageObjects/SauceDemoLoginPg";
import { SauceDemoProductsPg } from "../pageObjects/SauceDemoProductsPg";
import * as data from "../fixtures/sauceDemoData.json";
let dataSet = [];

test.beforeAll(async () => {
  dataSet = await JSON.parse(JSON.stringify(data));
  console.log(dataSet);
});

test.describe("SauceDemo Tests", () => {
  for (const data of dataSet) {
    test(`Valid Login Test for ${data.username}`, async ({ page }) => {
      const loginPgObj = new SauceDemoLoginPg(page);
      const productPagObj = new SauceDemoProductsPg(page);

      await page.goto("https://www.saucedemo.com/v1/");
      await loginPgObj.successLogin(data.username.toString(), data.password.toString());
      await page.waitForLoadState("networkidle");
      const isSuccessfulLogin = await productPagObj.isSuccessfulLogin();
      expect(isSuccessfulLogin).toBe(true);
    });
  }

  test("Invalid Login Test", async ({ page }) => {
    const loginPgObj = new SauceDemoLoginPg(page);

    await page.goto("https://www.saucedemo.com/v1/");
    await loginPgObj.successLogin("standard_user", "wrong");
    await page.waitForLoadState("networkidle");
    const errorMessage = await loginPgObj.UnsuccessLoginError();
    expect(errorMessage).toContain(
      "Username and password do not match any user in this service"
    );
  });
});
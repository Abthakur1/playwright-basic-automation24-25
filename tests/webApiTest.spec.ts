import { test, expect, request } from "@playwright/test";
const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    }
  );

  console.log(loginResponse.status());
  expect(loginResponse.status()).toBe(200);
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
});


test("Client App Test", async ({page}) =>{
  await page.addInitScript(value=>{      // ==> to store the cookies in local storage
    window.localStorage.setItem('token', value );
  }, token)           //The purpose of this code is to store the authentication token in the browser's local storage before the page loads. This way, when the page is loaded, it already has the token in local storage, which can be used for authenticated
  
  await page.goto('https://rahulshettyacademy.com/client/');
  const expectedList = [
    'qwerty',
    'qwerty',
    'qwerty',
    'qwerty',
    'ZARA COAT 3',
    'ADIDAS ORIGINAL',
    'IPHONE 13 PRO',
    'qwerty'
  ]
await page.locator('div.card-body b').first().waitFor();
const productNames = await page.locator('div.card-body b').allTextContents();
productNames.forEach((item)=>{
    const result = expectedList.includes(item);
    expect(result).toBeTruthy;
});

});

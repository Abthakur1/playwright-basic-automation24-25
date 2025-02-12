import test, { expect } from '@playwright/test';

test.only('Basic ui test for multiple elements and get texts', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('#login').click();
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
    await page.waitForLoadState('networkidle');
    const productNames = await page.locator('div.card-body b').allTextContents();
    productNames.forEach((item)=>{
        const result = expectedList.includes(item);
        expect(result).toBeTruthy;
    });
})
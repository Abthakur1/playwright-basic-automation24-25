import { test, expect } from '@playwright/test';

test('Switch URLs', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const title1 = await page.title();
    expect(title1).toBe("Practice Page");
    await page.goto("http://google.com");
    const title2 = await page.title();
    expect(title2).toBe("Google");
    await page.goBack();
    const title3 = await page.title();
    expect(title3).toBe("Practice Page");
    await page.goForward();
    const title4 = await page.title();
    expect(title4).toBe("Google");
});
test('Handle popups alerts', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.locator('#alertbtn').click();
    // const popupMessage = page.on('dialog', dialog => dialog.message());
    // console.log(popupMessage);
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    page.on('dialog', dialog => dialog.dismiss());

   
});
test('Handle Frames', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const framesPage = page.frameLocator('iframe#courses-iframe');
    await framesPage.locator('a[href="learning-path"]').first().click();
    // await page.waitForLoadState('networkidle');
    await framesPage.locator('h1').first().waitFor();
    const message = await framesPage.locator('h1').first().textContent();
    expect(message).toBe('LEARNING PATHS');

});


import { test, expect, request, APIRequestContext } from "@playwright/test";

test("Mock Fruit API without making actual call", async ({ page }) => {
  await page.route("*/**/api/v1/fruits", async (route) => {
    // https://demo.playwright.dev/api-mocking/api/v1/fruits
    const jsonMockBody = [
      { name: "apple", id: 2 },
      { name: "banana", id: 1 },
    ];
    await route.fulfill({ json: jsonMockBody });
  });
  // after mock now test

  await page.goto("https://demo.playwright.dev/api-mocking");
  await page.locator("ul li").nth(0).waitFor();
  const fruitList = await page.locator("ul li").allTextContents();
  console.log(fruitList);
  expect(fruitList).toContain("apple");
});

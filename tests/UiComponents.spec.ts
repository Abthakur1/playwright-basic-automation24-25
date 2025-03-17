import { test, expect, Page, BrowserContext } from "@playwright/test";

let page: Page;
let context: BrowserContext;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto("https://demoqa.com/");
});

test.afterEach(async () => {
  await page.close();
  await context.clearCookies();
  await context.clearPermissions();
});

test("TC 01 Elements Test", async () => {
  await page.locator("div[class='avatar mx-auto white']").first().click();
  await page.locator("div[class='col-12 mt-4 col-md-6'] div").nth(0).waitFor();
  const messageOnElementPage = await page
    .locator("div[class='col-12 mt-4 col-md-6']")
    .nth(0)
    .textContent();
  expect(messageOnElementPage).toBe(
    "Please select an item from left to start practice."
  );
});
test("TC02 Text Box Test", async () => {
  await page.waitForLoadState();
  await page.locator("div[class='avatar mx-auto white']").first().click();
  await page.locator("#item-0").filter({ hasText: "Text Box" }).first().click();
  await page.locator("#userName").fill("Test");
  await page.locator("#userEmail").fill("Test@gmail.com");
  await page.locator("#currentAddress").fill("Test Address");
  await page.locator("#permanentAddress").fill("Test Permamanent Address");
  await page.locator("#submit").click();
  const output = await page.locator("#name").textContent();
  expect(output).toBe("Name:Test");
});
test("TC03 Check Box Test", async () => {
  await page.waitForLoadState();
  await page.locator("div[class='avatar mx-auto white']").first().click();
  await page
    .locator("#item-1")
    .filter({ hasText: "Check Box" })
    .first()
    .click();
  await page.locator('button[aria-label="Toggle"]').waitFor();
  await page.locator('button[aria-label="Toggle"]').click();
  await page.locator('button[aria-label="Toggle"]').nth(2).click();
  await page.locator('button[aria-label="Toggle"]').nth(3).click();
  await page
    .locator('label[for="tree-node-workspace"] span[class="rct-checkbox"]')
    .check();
  const isChecked = await page
    .locator('label[for="tree-node-workspace"] span[class="rct-checkbox"]')
    .isChecked();
  expect(isChecked).toBe(true);
  await page.locator("#result span").nth(0).waitFor();
  const result = await page.locator("#result span").nth(0).textContent();
  expect(result).toBe("You have selected :");
  const selectedResult = await page
    .locator("span[class='text-success']")
    .first()
    .textContent();
  expect(selectedResult).toContain("workspace");
});
test("TC04 Test Web tables", async () => {
  await page.waitForLoadState();
  await page.locator("div[class='avatar mx-auto white']").first().click();
  await page.locator("#item-3").filter({ hasText: "Web Tables" }).click();
  await page
    .locator("div[class='rt-table'] div[class='rt-resizable-header-content']")
    .first()
    .waitFor();
  const headersEle = page.locator(
    "div[class='rt-table'] div[class='rt-resizable-header-content']"
  );

  const numberOfHeaders = await headersEle.count();
  console.log(numberOfHeaders);
  const expectedHeaders = [
    "First Name",
    "Last Name",
    "Age",
    "Email",
    "Salary",
    "Department",
    "Action",
  ];
  const actualHeaders = [];
  for (let i = 0; i < numberOfHeaders; i++) {
    const header = await headersEle.nth(i).textContent();
    actualHeaders.push(header);
  }
  const sortedExpectedHeaders = expectedHeaders.sort();
  const sortedActualHeaders = actualHeaders.sort();
  expect(sortedActualHeaders).toEqual(sortedExpectedHeaders);
});
test("TC05 Test Buttons", async () => {
  await page.waitForLoadState();
  await page.locator("div[class='avatar mx-auto white']").first().click();
  await page.locator("#item-4").filter({ hasText: "Buttons" }).click();
  await page.locator("#doubleClickBtn").dblclick();
  await page.locator("#doubleClickMessage").waitFor();
  const doubleClickMessage = await page
    .locator("#doubleClickMessage")
    .textContent();
  expect(doubleClickMessage).toBe("You have done a double click");
  await page.locator("#rightClickBtn").click({ button: "right" });
  await page.locator("#rightClickMessage").waitFor();
  const rightClickMessage = await page
    .locator("#rightClickMessage")
    .textContent();
  expect(rightClickMessage).toBe("You have done a right click");
});
test.skip("TC06 Test Forms", async () => {
  await page.waitForLoadState();
  await page.locator('svg[fill="currentColor"]').first().click({ force: true });
  await page.locator("span[class='pr-1'] svg").nth(1).click();
  await page
    .locator("#item-0 span[class='text']")
    .getByText("Practice Form")
    .click({ force: true });
  await page.locator("#firstName").fill("Test");
  await page.locator("#lastName").fill("Test");
  await page.locator("#userEmail").fill("test@gmail.com");
  await page.locator("input#gender-radio-1").click({ force: true });
  await page.locator("#userNumber").fill("1234567890");
  await page.locator("#dateOfBirthInput").click();
  //   await page.locator(".react-datepicker__month-container").waitFor();
  //   await page
  //     .locator("div[class='react-datepicker__month-container']")
  //     .waitFor();
  //   await page.locator("react-datepicker__month-select").selectOption("February");
  //   await page.locator("react-datepicker__year-select").selectOption("1990");
  //   await page
  //     .locator("div[class='react-datepicker__day react-datepicker__day--020']")
  //     .click();
  const inputDOB = await page.locator("#dateOfBirthInput").inputValue();
  //   expect(inputDOB).toBe("20 Feb 1990");
  console.log(inputDOB);
  await page.locator("#subjectsInput").fill("Comp");
  await page.locator("#subjectsInput").press("Enter");
  await page.locator("#hobbies-checkbox-1").check();
  await page
    .locator("#uploadPicture")
    .setInputFiles("fileToUploadAutomate-file.png");
  await page.locator("#currentAddress").fill("Test Address");
  await page.locator("#state").click();
  await page.locator("div[class=' css-1hwfws3']").nth(0).fill("NCR");
  await page.locator("div[class=' css-1hwfws3']").nth(0).press("Enter");
  await page.locator("div[class=' css-1uccc91-singleValue']").click();
  await page.locator("#city").click();
  await page.locator("div[class=' css-1hwfws3']").nth(0).fill("Delhi");
  await page.locator("div[class=' css-1hwfws3']").nth(0).press("Enter");
  await page.locator("#submit").click();
  await page.locator("#example-modal-sizes-title-lg").waitFor();
  const output = await page
    .locator("#example-modal-sizes-title-lg")
    .textContent();
  console.log(output);
});

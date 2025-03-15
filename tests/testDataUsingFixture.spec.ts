import { test } from "../fixtures/testDataForOrder";

test.describe("Test Data Using Fixtures", () => {
  test("Test data using fixtures", async ({ dataSet }) => {
   
      console.log(dataSet[0].username);
      console.log(dataSet[0].password);
      console.log(dataSet[1].username);
      console.log(dataSet[1].password);
  });
});
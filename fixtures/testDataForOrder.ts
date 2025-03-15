import { test as base } from "@playwright/test";
import * as data from "./sauceDemoData.json";

type TestFixtures = {
  dataSet: typeof data ;
};

const test = base.extend<TestFixtures>({
  dataSet: async ({}, use) => {
    await use(data);
  },
});

export { test};
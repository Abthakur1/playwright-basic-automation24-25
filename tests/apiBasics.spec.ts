import { test, expect, request, APIRequestContext } from "@playwright/test";
let apiContext: APIRequestContext;

test.beforeAll(async () => {
  apiContext = await request.newContext({ baseURL: "https://reqres.in" });
});

test("Reqres API GET Call", async () => {
  const response = await apiContext.get("/api/users?page=2", {
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': `token ${process.env.API_TOKEN}`,
    },
  });
  expect(response.status()).toBe(200);
  const responseJson = await response.json();
  expect(responseJson.data.length).toBe(6);
  let data = [];
  data = await responseJson.data;
  let isFirstNameFound: boolean;
  let isLastNameFound: boolean;
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].first_name);
    console.log(data[i].last_name);
    if (data[i].first_name === "Tobias") {
      if (data[i].last_name === "Funke") isFirstNameFound = true;
      isLastNameFound = true;
      break;
    }
  }
  expect(isFirstNameFound).toBeTruthy();
  expect(isLastNameFound).toBeTruthy();
});
test("Reqres API POST Call", async () => {
  const payload = {
    name: "morpheus",
    job: "leader",
  };

  const response = await apiContext.post("/api/users", {
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  });
  expect(response.status()).toBe(201);
  const respoJson = await response.json();
  expect(respoJson.name).toBe("morpheus");
  expect(respoJson.job).toBe("leader");
  expect(respoJson.createdAt).not.toBe(null);
});

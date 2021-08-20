import { ApiClient } from "../src/apiClient.js";
import { user } from "../src/data/user.js";

describe("Suite - /auth/login route", function () {
  it("should be albe to login", async () => {
    const apiClient = await ApiClient.authorized(user);

    const res = await apiClient.user.uploadFile("./BLS.jpg");
    console.log(res.body);
  });
});

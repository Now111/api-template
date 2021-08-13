import { UserController, ClanController } from "./controller/index.js";

export class ApiClient {
  constructor(params) {
    const defaultParams = {};

    const mergeParams = {
      ...defaultParams,
      ...params,
    };

    this.clan = new ClanController(mergeParams);
    this.user = new UserController(mergeParams);
  }

  static async authorized(credentials) {
    const { body } = await ApiClient.unauthorized().user.login(credentials);
    return new ApiClient({
      token: body.token,
    });
  }

  static unauthorized() {
    return new ApiClient();
  }
}

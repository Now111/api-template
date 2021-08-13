import request from "../httpRequest.js";
import { BaseController } from "./base.controller.js";

export class UserController extends BaseController {
  async login({ email, password }) {
    const response = await request.post({
      url: "auth/login",
      body: { email, password },
    });

    return response;
  }

  async register(payload) {
    const response = await request.post({
      url: "auth/register",
      body: { email: payload.email, password: payload.password },
    });

    return response;
  }
}

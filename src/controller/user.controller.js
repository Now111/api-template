import request from "../httpRequest.js";
import { BaseController } from "./base.controller.js";
import FormData from "form-data";
import * as fs from "fs";

export class UserController extends BaseController {
  async login({ email, password }) {
    const response = await request.post({
      url: "auth/login",
      json: { email, password },
    });

    return response;
  }

  async uploadFile(filePath) {
    const form = new FormData();

    form.append("image", fs.readFileSync(filePath), { filename: "image" });
    //form.append("image", fs.createReadStream(filePath));

    const response = await request.post(
      {
        url: `files`,
        body: form,
      },
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${this.params.token}`,
        },
      }
    );

    return response;
  }

  async editUser(payload, userId) {
    const response = await request.put({
      url: `users/${userId}`,
      body: payload,
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

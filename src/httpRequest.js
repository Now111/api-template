import { methods } from "./common/methods.js";
import got from "got";

class HttpRequest {
  #gotInstance;

  constructor(url) {
    this.#gotInstance = got.extend({
      prefixUrl: url,
      headers: { "Content-Type": "application/json" },
    });
  }

  get({ url, searchParams }, options) {
    return this.#gotInstance(url, {
      method: methods.GET,
      responseType: "json",
      searchParams,
      ...options,
    });
  }

  post(payload, options) {
    const config = {
      method: methods.POST,
      responseType: "json",
      ...options,
    };

    if (payload?.body) {
      config["body"] = payload.body;
    }

    if (payload?.json) {
      config["json"] = payload.json;
    }

    return this.#gotInstance(payload.url, config);
  }

  put({ url, body }, options) {
    return this.#gotInstance(url, {
      method: methods.PUT,
      responseType: "json",
      json: body,
      ...options,
    });
  }

  delete({ url }, options) {
    return this.#gotInstance(url, {
      method: methods.DELETE,
      responseType: "json",
      ...options,
    });
  }
}

export default new HttpRequest(process.env.APP_URL);

require("dotenv").config();

dotenv.config();

export default class Env {
  static get URL() {
    return process.env.URL || "";
  }

  static get ADMIN_NAME() {
    return process.env.ADMIN_NAME || "";
  }

  static get ADMIN_PASSWORD() {
    return process.env.ADMIN_PASSWORD || "";
  }
}

import dotenv from "dotenv";
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
  static get CRED_URL() {
    return process.env.CRED_URL || "";
  }
  static get INV_CRED_URL() {
    return process.env.INV_CRED_URL || "";
  }
  static get LOG_Path() {
    return process.env.LOG_Path || "test-reports";
  }
}

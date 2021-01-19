import { createHmac } from "crypto";

export class PasswordUtils {
  static hashPasword(password: string) {
    if (password) {
      return createHmac("sha256", password).digest("hex");
    }

    return "";
  }
}

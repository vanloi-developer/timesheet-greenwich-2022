import { scrypt } from "crypto";
import salt from "../../configs/password";

class PasswordManager {
  public static toHash(psw: string): Promise<string> {
    return new Promise((resolve, reject) => {
      scrypt(psw, salt, 64, (err: Error | null, derivedKey: Buffer) => {
        if (err) return reject(err);

        return resolve(`${derivedKey.toString("hex")}.${salt}`);
      });
    });
  }

  public static compare(
    password: string,
    storedPassword: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const key = storedPassword.split(".")[1];

      scrypt(password, salt, 64, (err: Error | null, derivedKey: Buffer) => {
        if (err) return reject(err);

        return resolve(key == derivedKey.toString("hex"));
      });
    });
  }
}

export = PasswordManager;

import { scrypt, randomBytes } from "crypto";

class PasswordManager {
  public static hash(psw: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(8).toString("hex");

      scrypt(psw, salt, 64, (err: Error | null, derivedKey: Buffer) => {
        if (err) return reject(err);

        return resolve(`${derivedKey.toString("hex")}.${salt}`);
      });
    });
  }

  public static compare(psw: string, storedPsw: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [key, salt] = storedPsw.split(".");

      scrypt(psw, salt, 64, (err: Error, derivedKey: Buffer) => {
        if (err) return reject(err);

        return resolve(key == derivedKey.toString("hex"));
      });
    });
  }
}

Object.seal(PasswordManager);
export { PasswordManager };

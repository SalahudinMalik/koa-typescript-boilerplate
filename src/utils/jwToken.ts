import jwt from "jsonwebtoken";

export default class JWToken {
  public static async issue(payload: any, expiresIn: string | number) {
    if (!process.env.SECRET) {
      return "Secret key not found";
    }
    if (!expiresIn) { expiresIn = "2 days"; }
    return jwt.sign(
      payload,
      process.env.SECRET, // Token Secret that we sign it with
      {
        expiresIn, // Token Expire time
      },
    );
  }
}

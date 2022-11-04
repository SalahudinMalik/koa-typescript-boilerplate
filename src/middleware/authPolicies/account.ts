import { Account, AccountsAttributes } from "../../database/models";
import { Context, Next } from "koa";
import passport from "koa-passport";
import { UnauthorizedError } from "../../errors/UnauthorizedError";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default async function (jwtPayload, done) {
  console.log("account auth", jwtPayload);
  const account = await Account.findOne({
    where: { id: jwtPayload.id },
  });
  if (!account) throw new UnauthorizedError("No active account found");
  return done(null, account);
}

export async function accountAuth(ctx: Context, next: Next) {
  // TODO: need to implement after login
  return next();
  // await new Promise((resolve, reject) => {
  //   passport.authenticate("account-auth", { session: false }, (err, user: AccountsAttributes, info, status) => {
  //     ctx.logger.debug(["Account Auth - ", "err", err, "user", user, "info", info, "status", status]);
  //     if (!user) {
  //       const msg = err?.message || (info instanceof Error && info.message);
  //       return reject(new UnauthorizedError(msg));
  //     }
  //     ctx.state.user = user;
  //     ctx.state.authInfo = info;
  //     resolve(next());
  //   })(ctx, next);
  // });
}

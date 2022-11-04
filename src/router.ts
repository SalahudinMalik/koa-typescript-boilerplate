import Router from "@koa/router";
import accountRoutes from "./modules/account/account.route";
import { Context } from "koa";
import { accountAuth } from "./middleware/authPolicies/account";
import generateDoc from "./generateDocumentation";

const router = new Router({
  prefix: "/api",
});

router.get("/docs.json", (ctx: Context) => {
  // TODO: add new permission for this so that only users with permission can access the docs
  ctx.body = generateDoc();
});

router.get("/test2", accountAuth,
  (ctx: Context) => {
    console.log(ctx.state.user); // <-- contains account and company info
    ctx.body = "test";
  });

router.use(accountRoutes.routes());

export { router };

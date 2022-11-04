import Router from "@koa/router";
import AccountController from "./account.controller";
import { accountAuth } from "../../middleware/authPolicies/account";

const router = new Router({
  prefix: "/account",
});

//  Account Routes
router.post("/", AccountController.addUser);
router.put("/:id", AccountController.updateUser);
router.get("/", accountAuth, AccountController.getUsers);
router.get("/:id", accountAuth, AccountController.getUser);
router.delete("/:id", accountAuth, AccountController.deleteUser);

export default router;

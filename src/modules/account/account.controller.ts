import { Context } from "koa";
import { plainToInstance } from "class-transformer";
import { AddAccountReqSchema, GetAllAccountSchema, UpdateAccountReqSchema } from "./validations/account.validation";
import { Account } from "../../database/models";
import { BadRequestError } from "../../errors/BadRequestError";
import { Op } from "sequelize";

export default class AccountController {
  public static async addUser(ctx: Context) {
    const { body } = ctx.request;
    const reqBody = plainToInstance(AddAccountReqSchema, body);
    await reqBody.reqValidate();
    ctx.body = await Account.create(reqBody);
  }

  public static async updateUser(ctx: Context) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const reqBody = plainToInstance(UpdateAccountReqSchema, body);
    reqBody.id = id;
    await reqBody.reqValidate();
    ctx.body = await Account.update(reqBody, { where: { id: ctx.params.id } });
  }

  public static async getUser(ctx: Context) {
    const { id } = ctx.params;
    if (!id) {
      throw new BadRequestError("No id provided");
    }
    ctx.body = await Account.findOne({ where: { id } });
  }

  public static async getUsers(ctx: Context) {
    const params = ctx.request.query;
    const reqParams = plainToInstance(GetAllAccountSchema, params);
    await reqParams.reqValidate();
    const accounts = await Account.findAndCountAll({
      limit: reqParams.perPage,
      offset: reqParams.perPage * (reqParams.page - 1),
      order: [[reqParams.sort, reqParams.sortDir]],
      where: {
        [Op.or]: {
          title: { [Op.like]: `%${reqParams.query}%` },
          firstName: { [Op.like]: `%${reqParams.query}%` },
          lastName: { [Op.like]: `%${reqParams.query}%` },
        },
      },
    });
    ctx.body = {
      accounts: accounts.rows,
      total: accounts.count,
      page: reqParams.page,
      perPage: reqParams.perPage,
    };
  }

  public static async deleteUser(ctx: Context) {
    const { id } = ctx.params;
    if (!id) {
      throw new BadRequestError("No id provided");
    }
    ctx.body = await Account.destroy({ where: { id } });
  }

  public static async test(ctx: Context) {
    ctx.body = {
      success: true,
      msg: "test successful",
    };
  }
}

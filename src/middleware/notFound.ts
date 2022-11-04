import { Context } from "koa";

export default async (ctx: Context): Promise<void> => {
  const { method, path } = ctx.request;

  const message = `${method} ${path}`;

  ctx.status = 404;
  ctx.body = {
    message: `No endpoint matched your request: ${message}`,
  };
};

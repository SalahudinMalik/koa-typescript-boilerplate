// import { getConnection } from 'connection-database'

import { Context } from "koa";
import config from "./config";

const statuses = {
  OK: "OK",
  DOWN: "DOWN",
};

const checkApiDb = async () => {
  try {
    // const connection = getConnection()
    // await connection.query('SELECT 1')
    return statuses.OK;
  } catch (err) {
    return statuses.DOWN;
  }
};

const healthcheck = () => {
  return async function healthCheck(context: Context, next: () => any) {
    const ctx = context;

    if (ctx.path !== "/status") {
      return next();
    }

    const services = {
      postgres: await checkApiDb(),
    };

    ctx.status = Object.values(services).find((x) => x === "KO") ? 503 : 200;

    ctx.body = {
      globalStatus: ctx.status,
      services,
      sha: config.GIT_SHA,
    };
  };
};

export { healthcheck, statuses };

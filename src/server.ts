import http, { Server } from "http";
import Koa from "koa";
import cors from "@koa/cors";
import compress from "koa-compress";
import helmet from "koa-helmet";
import koaBody from "koa-body";
import passport from "koa-passport";
import bodyParser from "koa-bodyparser";
import "reflect-metadata";
import { router } from "./router";
import logger from "./logger";
import middlewareLogger from "./middleware/logger";
import { notFoundHandler } from "./middleware";

import "./middleware/authPolicies";
// var Prometheus = require('./middleware/monitor')

import { healthcheck } from "./healthcheck";
import sequelize from "./database/connect";
// import { csrfProtection } from './util/csrf'

const createServer = async (): Promise<Server> => {
  const db = sequelize();
  await db.authenticate();
  await db.sync({ alter: Boolean(process.env.DB_ALTER), force: Boolean(process.env.DB_SYNC) });

  logger.debug("Creating server...");

  if (process.env.NODE_ENV !== "test") {
    // Some needed check
  }
  const app = new Koa();
  app.proxy = true;
  app.keys = ["some secret hurr"];

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err: any) {
      ctx.status = err.httpCode || 500;
      ctx.status >= 500 && ctx.logger.error("err");
      ctx.body = {
        message: err.message,
      };
      if (err.response) ctx.body.response = err.response;
      // ctx.status >= 500 && sessionLogger.error(err, { loc: 'S84', stack: err?.stack });
      if (ctx.status >= 500) ctx.app.emit("error", err, ctx);
    }
  });

  app
    .use(helmet())
  // .use(errorHandler)
    .use(middlewareLogger())
    .use(healthcheck())
    .use(koaBody({ multipart: true }))
    .use(bodyParser())
  // .use(csrfProtection)
    .use((ctx, next) => {
      if (process.env.NODE_ENV === "production") {
        return next();
      }

      return cors({ credentials: true })(ctx, next);
    })
    .use(passport.initialize())
  // .use(Prometheus.injectMetricsRouter)
    .use(compress())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(notFoundHandler);
  // .use(Prometheus.requestCounters)
  // .use(Prometheus.responseCounters)

  const server = http.createServer(app.callback());

  server.on("close", async () => {
    logger.debug("Server closing");
  });

  server.on("error", async (error) => {
    console.log("Error ----------------------", error);
  });

  logger.debug("Server created.");

  return server;
};

export default createServer;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint no-undef: "error", no-use-before-define: 0 */ // TODO: remove
/**
 *
 * Code mostly taken from koa-logger, but uses a winston console logger with a unique requestId
 *
 * If logspout and papertrail are set up properly, and if an error is thrown, then the client side
 * error will contain the requestId
 *
 * And you can look it up directly on papertrail to get the stacktrace (useful for
 * staging/production) or in the docker output during development
 *
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Counter from "passthrough-counter";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import humanize from "humanize-number";
import bytes from "bytes";
import util from "util";

import winston, { format, Logger } from "winston";
import { Context, Middleware } from "koa";
import * as Transport from "winston-transport";
import { v4 as uuidv4 } from "uuid";
import chalk from "chalk";
import { APP_NAME } from "../constants";
import config from "../config";

const LOG_LEVEL: string = config.LOG_LEVEL;

const customFormat = winston.format.printf(({ level, message, requestId }) => {
  return `${level}: ${message} - requestId: ${requestId}`;
});

function getLogger(extraTransports: Transport[]) {
  return winston.createLogger({
    format: customFormat,
    defaultMeta: {
      requestId: uuidv4(),
      name: APP_NAME,
    },
    exitOnError: false,
    transports: [
      new winston.transports.Console({
        level: LOG_LEVEL,
        format: format.colorize(),
      }),
      ...extraTransports,
    ],
  });
}

const definePrintDebug = ({ logger } : { logger: Logger }) =>
  (function () {
    const transporter = logger;

    return function printFunc(...args: [string, ...any[]]) {
      const str = util.format(...args);
      transporter.debug(str);
    };
  })();

const definePrintError = ({ logger } : { logger: Logger }) =>
  (function () {
    const transporter = logger;

    return function printFunc(...args: [string, ...any[]]) {
      const str = util.format(...args);
      transporter.error(str);
    };
  })();

// eslint-disable-next-line @typescript-eslint/ban-types
const defineDone = ({ ctx, start, counter, printDebug, res }: { ctx: Context, start: number, counter: Counter, printDebug: Function }) =>
  function (event) {
    res.removeListener("finish", this);
    res.removeListener("close", this);
    log(printDebug, ctx, start, counter ? counter.length : 0, null, event);
  };

/**
 * Logging Middleware, creates a winston logger with a unique request id for each request and log
 * the lifecycle of the request
 *
 * Also attach the logger to the koa ctx object for additional info
 *
 * @param  {[Transport]} extraTransports Array of winston transport to use on top of the Console one
 * @return {Function}  the middleware function
 */
function middleware(extraTransports: Transport[] = []): Middleware {
  return async (context, next) => {
    const logger = getLogger(extraTransports);
    const ctx = context;
    // For use in request handlers
    ctx.logger = logger;

    const printDebug = definePrintDebug({ logger });
    const printError = definePrintError({ logger });

    // request
    const start = Date.now();

    printDebug("  " + chalk.gray("<--") + " " + chalk.bold("%s") + " " + chalk.gray("%s"), ctx.method, ctx.originalUrl);

    try {
      await next();
    } catch (err) {
      // log uncaught downstream errors
      log(printError, ctx, start, null, err);
      throw err;
    }

    // calculate the length of a streaming response
    // by intercepting the stream with a counter.
    // only necessary if a content-length header is currently not set.
    const length = ctx.response.length;
    const body = ctx.body;
    let counter: Counter;
    if (length == null && body && body.readable) {
      ctx.body = body
                .pipe((counter = Counter())) // eslint-disable-line
        .on("error", ctx.onerror);
    }

    // log when the response is finished or closed,
    // whichever happens first.
    const res = ctx.res;

    const done = defineDone({ ctx, start, counter, printDebug, res });

    const onfinish = done.bind(done, "finish");
    const onclose = done.bind(done, "close");

    res.once("finish", onfinish);
    res.once("close", onclose);
  };
}

/**
 * Log helper.
 */

const colorCodes = {
  7: "magenta",
  5: "red",
  4: "yellow",
  3: "cyan",
  2: "green",
  1: "green",
  0: "yellow",
};

function log(printDebug, ctx, start, len, err, event?) {
  // get the status code of the response
  const status = err ? (err.isBoom ? err.output.statusCode : err.status || err.httpCode || 500) : ctx.status || 404;

  // get the human readable response length
  let length;
  if (~[204, 205, 304].indexOf(status)) {
    length = "";
  } else if (len == null) {
    length = "-";
  } else {
    length = bytes(len).toString().toLowerCase();
  }

  const upstream = err ? "xxx" : event === "close" ? "-x-" : "-->";

  // set the color of the status code;
  const s = (status / 100) | 0;
  const color = Object.prototype.hasOwnProperty.call(colorCodes, s) ? colorCodes[s] : 0;

  printDebug(
    upstream +
        " " +
        chalk.bold("%s") +
        " " +
        chalk.gray("%s") +
        " " +
        chalk[color]("%s") +
        " " +
        chalk.gray("%s") +
        " " +
        chalk.gray("%s"),
    ctx.method,
    ctx.originalUrl,
    status,
    time(start),
    length,
  );
}

/**
 * Show the response time in a human readable format.
 * In milliseconds if less than 10 seconds,
 * in seconds otherwise.
 */

function time(start) {
  const delta = Date.now() - start;
  return humanize(delta < 10000 ? delta + "ms" : Math.round(delta / 1000) + "s");
}

export default middleware;

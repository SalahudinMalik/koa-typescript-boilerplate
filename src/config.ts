import dotenv from "dotenv";

dotenv.config({ path: ".env" });
export default {
  PORT: +process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  GIT_SHA: process.env.GIT_SHA,

  LOG_LEVEL: process.env.LOG_LEVEL || "info",

  AUTH_SECRET: process.env.AUTH_SECRET?.trim(),

  BASE_URL: process.env.BASE_URL?.trim(),

};

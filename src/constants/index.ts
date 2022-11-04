// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as config from "../../package.json";
import statuses from "./status";

export const APP_NAME = config.name;
export const APP_VERSION = config.version;

export const STATUS = statuses;

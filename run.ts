import runApp from "./src/app";
import logger from "./src/logger";
import config from "./src/config";
import { isFinite } from "lodash";

const NODE_ENV = config.NODE_ENV || "development";
const PORT = config.PORT;

(async () => {
  try {
    // console.log('port is ', PORT);
    const server = await runApp(isFinite(PORT) ? PORT : undefined);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    logger.debug(`Server listening on ${server?.address()?.port} in '${NODE_ENV}' mode`);
    // logger.debug(`Docs available at http://localhost:${PORT}/api/docs`)
  } catch (err: any) {
    console.log("err", err);
    logger.error("Error while starting up server");
    logger.error(err.stack);
    process.exit(1);
  }
})();

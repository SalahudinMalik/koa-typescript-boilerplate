import createServer from "./server";
import { Server } from "net";

const runApp = async (PORT?: number): Promise<Server> => {
  const app = await createServer();
  app.listen(PORT);
  return app;
};

export default runApp;

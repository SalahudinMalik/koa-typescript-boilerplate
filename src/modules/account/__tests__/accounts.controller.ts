import supertest from "supertest";

import runApp from "../../../app";
import { Server } from "net";
import { Sequelize } from "sequelize-typescript";
import connect from "../../../database/connect";

let server: Server,
  db: Sequelize,
  request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  server = await runApp();
  request = supertest(server);
  db = connect();
});

describe("GET /test", () => {
  it("should return 200 & valid response regardless of params", async () => {
    const rsp = await request.get("/api/account/test")
      .send()
      .set("Accept", "application/json");
    expect(rsp.status).toBe(200);
    expect(rsp.body.msg).toBe("test successful");
  });
});

afterAll(async () => {
  await db.close();
  // we are running connection pools so do not need closing connection. its handled automatically
  return await new Promise((resolve, reject) => {
    server.close(e => {
      if (e) return reject(e);
      resolve(true);
    });
  });
});

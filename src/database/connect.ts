import { Sequelize } from "sequelize-typescript";
import * as models from "./models";
let sequelize: Sequelize;

const connect = () => {
  if (sequelize && sequelize instanceof Sequelize) {
    return sequelize;
  }
  sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    models: Object.values(models),
    pool: {
      max: 10,
      min: 1,
    },
    sync: {
      alter: Boolean(process.env.DB_ALTER),
      force: Boolean(process.env.DB_SYNC),
    },
  });
  return sequelize;
};

export default connect;

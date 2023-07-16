import { PoolOptions } from "mysql2";

const env = {
  dbPoolOptions: {
    host: process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
  } as PoolOptions,
}


export default env;

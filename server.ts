import fastify from "fastify";
import routes from "./src/routes";
import MysqlDb from "./src/services/mysqlDb";

const app = fastify({
  logger: {
    level: "info",
    redact: ["err.config"],
  },
  requestIdHeader: "x-request-id",
  requestIdLogLabel: "requestId",
});

const start = async () => {
  await MysqlDb.get().runMigration()

  for (const route of routes) {
    await app.register(...route);
  }
  await app.listen({ port: 80, host: "0.0.0.0" });
  app.printRoutes()
  await app.ready();
}

(start)()

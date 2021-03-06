import "reflect-metadata";
require("dotenv").config();
import { createKoaServer, useContainer } from "routing-controllers";
import { Connection } from "typeorm";
import { Container } from "typedi";
import { openConnection } from "./persistence";
import controllers from "./controllers";
import middlewares from "./middlewares";
import { attachGraphql } from "./graphql";
import { authorizationChecker, currentUserChecker } from "./security";

useContainer(Container);

const port = process.env.PORT || 3001;

async function init() {
  try {
    const connection = await openConnection();

    const app = createKoaServer({
      cors: true,
      controllers,
      middlewares,
      routePrefix: "/api",
      defaultErrorHandler: false,
      authorizationChecker,
      currentUserChecker,
    });

    await attachGraphql(app);

    app.listen(port, () => {
      console.log(`API running on port ${port} 🚀`);
    });

    process.on("SIGTERM", () => {
      gracefullyShutdown(app, connection);
    });
  } catch (err) {
    console.log("ERROR: ", err);
    console.log("Could not open db connection");
  }
}

async function gracefullyShutdown(connection: Connection | void, app?: any) {
  console.log("Closing server...");

  if (connection) {
    await connection.close();
  }

  if (app) {
    app.close(() => {
      console.log("Server closed and all resources released!");
    });
  }
}

init();

import { createConnection, useContainer, ConnectionOptions } from "typeorm";
import { Container } from "typedi";
import { User, Todo } from "../entities";

/** Tell TypeORM to use the TypeDI container to resolve it's dependencies. */
useContainer(Container);

export async function openConnection() {
  const connectionConfig: ConnectionOptions = {
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USER || "user",
    password: process.env.DB_PASS || "password",
    database: process.env.DB_NAME || "db",
    entities: [User, Todo],
    synchronize: true,
    logging: false,
    insecureAuth: true,
    ssl: process.env.DB_SSL_CERT && {
      ca: process.env.DB_SSL_CERT,
    },
  };

  return createConnection(connectionConfig);
}

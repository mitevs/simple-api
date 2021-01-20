import { createConnection, useContainer } from "typeorm";
import { Container } from "typedi";
import { User, Todo } from "../entities";

/** Tell TypeORM to use the TypeDI container to resolve it's dependencies. */
useContainer(Container);

export async function openConnection() {
  // This can be further externalised as a config and used here
  return createConnection({
    type: "mysql",
    host: "localhost",
    port: 9000,
    username: "user",
    password: "password",
    database: "db",
    entities: [User, Todo],
    synchronize: true,
    logging: false,
  });
}

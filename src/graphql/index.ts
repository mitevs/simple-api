import { Container } from "typedi";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-koa";
import resolvers from "./resolvers";

export async function attachGraphql(app: any) {
  const schema = await buildSchema({
    resolvers,
    dateScalarMode: "isoDate",
    container: Container,
  });

  const server = new ApolloServer({ schema });
  server.applyMiddleware({ app, path: "/graphql" });
  return server;
}

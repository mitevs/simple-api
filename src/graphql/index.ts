import { Context } from "koa";
import { Container } from "typedi";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-koa";
import resolvers from "./resolvers";
import { fromToken } from "../utils/JwtUtils";

export async function attachGraphql(app: any) {
  const schema = await buildSchema({
    resolvers,
    dateScalarMode: "isoDate",
    container: Container,
  });

  const server = new ApolloServer({
    schema,
    context: ({ ctx }: { ctx: Context }) => {
      return {
        user: fromToken(ctx.request.headers["authorization"]),
      };
    },
  });

  server.applyMiddleware({ app, path: "/api/graphql" });
  return server;
}

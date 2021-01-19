import { UserResolver } from "./UserResolver";
import { TodoResolver } from "./TodoResolver";

const resolvers: [Function, ...Function[]] = [UserResolver, TodoResolver];
export default resolvers;

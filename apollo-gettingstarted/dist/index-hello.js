import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
//define schema
const typeDefs = `
type Query {
    hello:String
}
`;
//define resolver
const resolvers = {
    //Query
    Query: {
        hello() {
            return "Hello,Apollo GraphQL";
        }
    }
    //Mutation
    //Subscription
};
//deployment : parsing ,binding
const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
//start web container
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
});
console.log(`Apollo Server is ready ${url}`);


import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

//define Context type:For type Script
interface MyContext {
    message: String
}

//define schema
const typeDefs = `

type Query {
    hello(name:String!):String!
}
`

//define resolver
const resolvers = {
    Query: {
        hello(_, args, contextValue) {
            // const token = contextValue.request.headers["Authorization"];
            return `${contextValue.message} ${contextValue.token} `
        }
    }
}

//deployment : parsing ,binding
const server = new ApolloServer<MyContext>({ typeDefs: typeDefs, resolvers: resolvers })

//start web container
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    },
    context: async ({ req, res }) => {
        const auth = req.headers
        console.log(auth.authorization)
        return {
            message: 'Hello',
            token: auth.authorization
        }
    }
})
console.log(`Apollo Server is ready ${url}`)
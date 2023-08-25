import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { request } from "http"

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
            return `${contextValue.message} ${args.name}`
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
        //console.log(req.headers)
        console.log(req.headers.authorization)
        const token = req.headers.authorization
        return {
            message: token.toString()
        }
    }
})
console.log(`Apollo Server is ready ${url}`)
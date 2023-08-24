import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'


//define schema
const typeDefs = `

type Query {
    skills:[String!]
}
`

//define resolver
const resolvers = {
    Query: {
        skills() {
            //return ["js"]
            //return []
            //return null
            return [null]
        }
    }
}

//deployment : parsing ,binding
const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers })

//start web container
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log(`Apollo Server is ready ${url}`)
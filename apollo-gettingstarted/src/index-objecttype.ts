import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'


//define schema
const typeDefs = `
type User {
 id:ID
 firstName:String
 lastName:String
 age:Int
 points:Float
 status:Boolean
}

type Query {
  user:User
}
`

//define resolver
const resolvers = {
    //Query
    Query: {
        user() {
            return {
                id: 1,
                firstName: "Subramanian",
                lastName: "Murugan",
                age: 10,
                points: 10,
                status: true
            }
        }

    }
    //Mutation
    //Subscription
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
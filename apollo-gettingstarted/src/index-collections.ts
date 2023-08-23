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
  users:[User]
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
        },
        users() {
            return [
                {
                    id: 1,
                    firstName: "Subramanian",
                    lastName: "Murugan",
                    age: 10,
                    points: 10,
                    status: true
                },
                {
                    id: 2,
                    firstName: "Geetha",
                    lastName: "Subramanian",
                    age: 10,
                    points: 34,
                    status: true
                },
                {
                    id: 3,
                    firstName: "Shirisha",
                    lastName: "Subramanian",
                    age: 10,
                    points: 800,
                    status: true
                }
            ]
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
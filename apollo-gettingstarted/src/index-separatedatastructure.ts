import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'

class User {
    id: number
    name: string
    email: string
}

//mock data:
const USERS: Array<User> = [{
    id: 1,
    name: 'A',
    email: 'a@gmail.com'
},
{
    id: 2,
    name: 'B',
    email: 'b@gmail.com'
},
{
    id: 3,
    name: 'C',
    email: 'c@gmail.com'
}
]
const ADDRESS = [{
    city: 'CBE',
    state: 'TN',
    id: 1, //linking field  looks like foreign key
},
{
    city: 'BNG',
    state: 'KA',
    id: 2, //linking field  looks like foreign key
},
{
    city: 'HYD',
    state: 'TS',
    id: 1, //linking field  looks like foreign key
}
]




//define schema
const typeDefs = `
type Address {
  city:String
}

type User {
 id:ID
 name:String
 email:String
 address:Address
}

type Query {
  users:[User]
}
`

//define resolver
const resolvers = {
    //Query
    Query: {
        users(): Array<User> {
            return USERS
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
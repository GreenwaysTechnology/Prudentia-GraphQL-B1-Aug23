import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'


//mock data:
const USERS = [{
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

//define schema
const typeDefs = `

type User {
 id:ID
 name:String
 email:String
}

type Query {
  users:[User]
}

input CreateUserInput{
  id:ID
  name:String
  email:String
}

type Mutation{
    createUser(userInput:CreateUserInput):User
}

`

//define resolver
const resolvers = {
    Query: {
        users() {
            return USERS;
        }
    },
    Mutation: {
        createUser(_, args) {
            USERS.push(args.userInput)
            return args.userInput
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
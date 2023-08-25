
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { PrismaClient } from '@prisma/client'
import { prisma } from "./db.js"

//define schema
const typeDefs = `
 type User {
    id:Int
    email:String
    name:String
    createdAt:String
 }
 input UserInput {
    email:String
    name:String
 }
 type Query {
    users:[User]
 }
 type Mutation {
    createUser(user:UserInput):User
 }

`

interface MyContext {
    dataSources: {
        db: PrismaClient
    }
}

//define resolver
const resolvers = {
    Query: {
        async users(_, args, context) {
            return await context.dataSources.db.user.findMany({})
        }
    },
    Mutation: {
        async createUser(parent, args, context, info) {
            const { user } = args
            return context.dataSources.db.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    createdAt: new Date()
                }
            })
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

        return {
            dataSources: {
                db: prisma
            }
        }
    }
})
console.log(`Apollo Server is ready ${url}`)
import { RESTDataSource } from "@apollo/datasource-rest";
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'


//Type class
export class Book {
    title: string
    author: string
}
//Data Source class
export class BooksAPI extends RESTDataSource {
    constructor() {
        super()
        //base url
        this.baseURL = "http://localhost:3000/"
    }
    //apis 
    async getBooks() {
        return this.get<Book[]>(`books`)
    }
    //post

    //update

    //delete
}

//define schema
const typeDefs = `
type Book {
  title:String
  author:String
}

type Query {
    books:[Book]
}
`

//define resolver
const resolvers = {
    Query: {
        async books(parent, args, contextValue) {
            return contextValue.dataSources.booksAPI.getBooks()
        }
    }
}
interface MyContext {
    dataSources: {
        booksAPI: BooksAPI
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
                booksAPI: new BooksAPI()
            }
        }
    }
})
console.log(`Apollo Server is ready ${url}`)
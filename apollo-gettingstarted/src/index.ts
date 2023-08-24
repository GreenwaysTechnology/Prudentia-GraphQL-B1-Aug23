import { RESTDataSource } from "@apollo/datasource-rest";
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'


//Type class
export class Book {
    id?: number
    title?: string
    author?: string
}
export class MutationResponse {
    status: string
    data?: string
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
    async book(id: number) {
        return this.get<Book>(`books/${id}`)
    }
    //post
    async postBook(book: Book) {
        return this.post<Book>(`books`, { body: book }).then(res => res)
    }
    //update
    async updateBook(bookId: number, book: Book) {
        return this.put<Book>(`books/${bookId}`, { body: book }).then(res => res)
    }
    //delete

}

//define schema
const typeDefs = `
type Book {
  id:Int
  title:String
  author:String
}

type Query {
    books:[Book!]!
    book(id:Int!):Book
}
input BookInput{
    id:Int!
    title:String!
    author:String!
}
input BookUpdateInput {
    title:String!
    author:String!
}

type Mutation{ 
    addBook(input:BookInput):Book
    updateBook(id:Int!,input:BookUpdateInput):Book
}
`

//define resolver
const resolvers = {
    Query: {
        async books(parent, args, contextValue) {
            return contextValue.dataSources.booksAPI.getBooks()
        },
        async book(parent, args, contextValue) {
            const { dataSources } = contextValue;
            const id = +args.id
            return dataSources.booksAPI.book(id)
        }
    },
    Mutation: {
        async addBook(parent, args, contextValue, info) {
            const { input } = args
            const { dataSources } = contextValue
            return dataSources.booksAPI.postBook(input)
        },
        async updateBook(parent, args, contextValue, info) {
            const { input, id } = args
            const { dataSources } = contextValue
            return dataSources.booksAPI.updateBook(id, input)
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
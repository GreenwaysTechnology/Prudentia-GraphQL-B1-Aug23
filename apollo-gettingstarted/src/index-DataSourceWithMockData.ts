import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'


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
const Books = [{
    title: 'GraphQl in Action',
    author: 'A',

},
{
    title: 'Apollo in Action',
    author: 'B',

},
{
    title: 'Typescript in Action',
    author: 'C',

}

]

// datasource class
export class BookDataSource {
    //api 
    getBooks() {
        return Books
    }
    //getBooksById

    //save

    //update

    //remove

}

//define Context type:For type Script


//define resolver
const resolvers = {
    Query: {
        // books(parent, args, contextValue) {
        //     return contextValue.dataSources.booksAPI.getBooks()
        // }
        books(parent, args, contextValue) {
            const { dataSources: { booksAPI: { getBooks } } } = contextValue
            return getBooks()
        }
    }
}

interface MyContext {
    dataSources: {
        booksAPI: BookDataSource
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
                booksAPI: new BookDataSource()
            }
        }
    }
})
console.log(`Apollo Server is ready ${url}`)
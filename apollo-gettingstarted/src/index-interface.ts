import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

//Define Schema
const typeDefs = `
interface Book {
    title: String!
    author: Author!
}
  
type Course {
    name:String
}
type Author {
    name:String
}
type Textbook implements Book {
    title: String!
    author: Author!
    courses: [Course!]!
}
type ColoringBook implements Book {
    title: String!
    author: Author!
    colors: [String!]!
}
  
type Query {
  books: [Book!]!
}
 `

// const BOOKS = [{
//     title: 'Graphql',
//     author: {
//         name:'Subramnaian Murugan'
//     },
//     courses: [{
//         name: 'IT'
//     }]
// }]
const BOOKS = [{
    title: 'Graphql',
    author: {
        name:'Geetha Subramanian'
    },
    colors:['Green'] 
}]
//Define Resolver
const resolvers = {

    //Query
    Query: {
        books() {
            return BOOKS;
        }
    },
    Book: {
        __resolveType(book, contextValue, info) {
            console.log(book)
            if (book.courses) {
                return 'Textbook' //must return Implementaton type in String
            }
            if (book.colors) {
                return 'ColoringBook'
            }
            return null
        }
    }


}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})
//start the webserver and deploy
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log(`Apollo Server is Ready at ${url}`)

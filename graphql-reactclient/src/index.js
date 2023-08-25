import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, useQuery, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


//create Client 
const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
})

//Query 
// client.query({
//     query: gql`
//     query Query {
//         hello
//     }
//    `
// }).then(res => console.log(res.data))

const GET_USERS = gql`
query USERS_QUERY {
  users {
    createdAt
    email
    id
    name
  }
}

`
const App = () => {
    const { loading, error, data } = useQuery(GET_USERS)
    console.log(data)
    if (loading) {
        return <h1>Loading....</h1>
    }
    if (error) {
        return <h1>Something went wrong</h1>
    }
    return <>
        <ul>
            {data.users.map(user => {
                return <li>{user.name} {user.email}</li>
            })}
        </ul>
    </>
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ApolloProvider client={client}>
    <App />
</ApolloProvider>
);



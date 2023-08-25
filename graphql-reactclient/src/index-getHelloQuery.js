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

const GET_HELLO = gql`
query HelloQuery {
     hello
}
`
const App = () => {
    const { loading, error, data } = useQuery(GET_HELLO)
    console.log(data)
    if (loading) {
        return <h1>Loading....</h1>
    }
    if(error){
        return <h1>Something went wrong</h1>
    }
    return <>
        <h1>{data.hello}</h1>
    </>
}


    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    );



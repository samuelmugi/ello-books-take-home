import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import MainApp from './MainApp';

// Initialize Apollo Client
const BASE_URL=process.env.REACT_APP_BASE_URL;
const client = new ApolloClient({
    uri: BASE_URL, // Your GraphQL server URL
    cache: new InMemoryCache()
});

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <MainApp />
        </ApolloProvider>
    );
};

export default App;

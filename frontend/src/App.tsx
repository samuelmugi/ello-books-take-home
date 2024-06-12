import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import MainApp from './MainApp';

// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'http://localhost:4000/', // Your GraphQL server URL
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

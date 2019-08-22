import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import App from './App';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URI
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('blaze-tata-auth-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();

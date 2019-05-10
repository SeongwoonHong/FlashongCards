import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { CookiesProvider, Cookies } from 'react-cookie';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';
import Routes from './routes';
import GlobalStyle from './styles';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = cookies.get('FLASHONG_AUTH_TOKEN');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const cache = new InMemoryCache();
const cookies = new Cookies();

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {
  }
});

cache.writeData({
  data: {
    currentUser: {}
  },
})
console.log('cache = ', cache);

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Rubik',
      'sans-serif',
    ].join(','),
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <CookiesProvider>
      <MuiThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </MuiThemeProvider>
    </CookiesProvider>
  </ApolloProvider>
  ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

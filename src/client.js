import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const endpoint = "https://api.github.com/graphql"

const httpLink = createHttpLink({
  uri: endpoint,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${GITHUB_TOKEN}`,
    }
  }
});

const link = authLink.concat(httpLink);
console.log(link);

export default new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  link: link,
  cache: new InMemoryCache()
});

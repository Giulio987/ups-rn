import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://terrehaute.stepzen.net/api/fashionable-albatross/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'apikey terrehaute::stepzen.net+1000::3a4b99b1d690d415f74a3be01b1fd73c0d45db51b1905ab972a3cf8310c17ec5',
  },
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}

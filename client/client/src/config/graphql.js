import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client'

export const myFavorites = makeVar([])

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                favorites: {
                    read: () => {
                        return myFavorites()
                    }
                }
            }
        }
    }
});

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache
});



export default client;
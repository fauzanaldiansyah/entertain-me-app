const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')

const typeDefs = gql`

    type TvSeries {
        _id : ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    extend type Query{
        tvseries: [TvSeries]
        tvserie(_id: ID): TvSeries
    }

    type TvSeriesMessage {
        message: String
    }

    extend type Mutation{  
        addTvSeries( 
            title: String
            overview: String
            poster_path: String
            popularity: Float
            tags: [String]
            ) : TvSeries
        updateTvSeries(
            _id: ID 
            title: String
            overview: String
            poster_path: String
            popularity: Float
            tags: [String]
            ) : TvSeries
        deleteTvSeries( 
            _id: ID
            ) : TvSeriesMessage
    }
`

const resolvers = {
    Query: {
        tvseries: () => {
            return axios({
                method: 'get',
                url: 'http://localhost:3002/tvseries'
            })
                .then(({ data }) => {
                    return data
                })
                .catch(console.log)
        },
        tvserie: (parent, args, context, info) => {
            const id = args._id
            return axios({
                method: 'get',
                url: `http://localhost:3002/tvseries/${id}`
            })
                .then(({ data }) => {
                    return data
                })
                .catch(console.log)
        }
    },
    Mutation: {
        addTvSeries: (parent, args, context, info) => {
            const {
                title,
                overview,
                poster_path,
                popularity,
                tags
            } = args
            return axios({
                method: 'post',
                url: `http://localhost:3002/tvseries/`,
                data: { title,
                    overview,
                    poster_path,
                    popularity,
                    tags }
            })
                .then(({ data }) => {
                    return data.ops[0]
                })
                .catch(console.log)
        },
        updateTvSeries: (parent, args, context, info) => {
            const id = args._id
            const {
                title,
                overview,
                poster_path,
                popularity,
                tags
            } = args
            return axios({
                method: 'put',
                url: `http://localhost:3002/tvseries/${id}`,
                data: { title,
                    overview,
                    poster_path,
                    popularity,
                    tags }
            })
                .then(({ data }) => {
                    // console.log(data)
                    return data.value
                })
                .catch(console.log)
        },
        deleteTvSeries: (parent, args, context, info) => {
            const id = args._id
            return axios({
                method: 'delete',
                url: `http://localhost:3002/tvseries/${id}`
                })
                .then(({ data }) => {
                    console.log(data)
                    return data
                })
                .catch(console.log)
        }

    }
}

module.exports = {
    typeDefs,
    resolvers
}

const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')

const typeDefs = gql`

    type Movies {
        _id : ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    type MovieMessage {
        message: String
    }

    extend type Query{
        movies: [Movies]
        movie(_id: ID): Movies
    }

    input newInput{
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    extend type Mutation{  
        addMovie(newMovie: newInput) : Movies
        updateMovie(
            _id: ID,
            updateMov: newInput) : Movies
        deleteMovie( 
            _id: ID
            ) : MovieMessage
    }
`

const resolvers = {
    Query: {
        movies: () => {
            return axios({
                method: 'get',
                url: 'http://localhost:3001/movies'
            })
                .then(({ data }) => {
                    return data
                })
                .catch(console.log)
        },
        movie: (parent, args, context, info) => {
            const id = args._id
            return axios({
                method: 'get',
                url: `http://localhost:3001/movies/${id}`
            })
                .then(({ data }) => {
                    return data
                })
                .catch(console.log)
        }
    },
    Mutation: {
        addMovie: (parent, args, context, info) => {
            const {
                title,
                overview,
                poster_path,
                popularity,
                tags
            } = args.newMovie
            return axios({
                method: 'post',
                url: `http://localhost:3001/movies/`,
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
        updateMovie: (parent, args, context, info) => {
            const id = args._id
            const {
                title,
                overview,
                poster_path,
                popularity,
                tags
            } = args.updateMov
            return axios({
                method: 'put',
                url: `http://localhost:3001/movies/${id}`,
                data: { title,
                    overview,
                    poster_path,
                    popularity,
                    tags }
            })
                .then(({ data }) => {
                    return data.value
                })
                .catch(console.log)
        },
        deleteMovie: (parent, args, context, info) => {
            const id = args._id
            return axios({
                method: 'delete',
                url: `http://localhost:3001/movies/${id}`
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

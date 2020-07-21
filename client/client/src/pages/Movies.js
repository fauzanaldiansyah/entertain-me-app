import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Button, Table} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

const GET_MOVIES = gql`
    query GetMovies{
        movies{
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
  }
`

export default () => {
    const { loading, error, data: movies } = useQuery(GET_MOVIES)

    if (loading) {
        return <p> Loading... </p>
    }

    if (error) {
        return <p> Error! </p>
    }

    const history = useHistory()

    function checkDetail(id){
        console.log(id, 'id dihome')
        history.push(`/movies/${id}`)
    }

    function toAddMovie(){
        console.log('ke page add')
        history.push('/movies/add')
    }

    return (
        <div>

            <h1 style={{ padding: '3rem' }} className='display-1' > Movie List </h1>

            <Button size="lg" onClick={toAddMovie} style={{ margin:'2rem'}}>Add Movie</Button>

            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Poster</th>
                        <th>Popularity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.movies.map(movie => {
                        return (
                            <tr>
                                <td style={{fontSize:"24pt"}}>{movie.title}</td>
                                <td> <img variant="top" src={movie.poster_path} alt="poster" width="150rem"/></td>
                                <td>{movie.popularity}</td>
                                <td><Button onClick={()=>checkDetail(movie._id)}> Check </Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>


        </div>
    )
}
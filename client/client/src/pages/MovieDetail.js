import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { myFavorites } from '../config/graphql'

const GET_MOVIE = gql`
query GetMovie($id:ID){
  movie(_id:$id){
  	_id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

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

const DELETE_MOVIE = gql`
mutation deleteMovie($movId: ID){
  deleteMovie(_id: $movId)
  {
   message
  }
}
`

export default () => {
  console.log('masukdetailmovie')

  let { id } = useParams();

  console.log(id, 'ini id')

  const { loading, error, data: movie } = useQuery(GET_MOVIE, {
    variables: {
      id: id
    }
  })
  const [toDeleteMovie] = useMutation(DELETE_MOVIE, { refetchQueries: [{ query: GET_MOVIES }] })
  const history = useHistory()

  if (loading) {
    return <p> Loading... </p>
  }

  if (error) {
    return <p> Error! </p>
  }

  function toEdit() {
    console.log(id, 'ini id')
    history.push(`/movies/edit/${id}`)
  }


  function toDelete() {
    console.log(id, 'ini id')
    toDeleteMovie({
      variables: { movId: id }
    })
    history.push('/movies')
  }

  function toFavorite(newFav) {
    console.log('masuk add to fav')
    let currentFavorites = myFavorites()
    const favNow = myFavorites([
      ...currentFavorites, newFav
    ])
    console.log(favNow, 'nifavskrg')
    history.push('/movies/favorites')
  }


  console.log(movie.movie, 'inimovie')


  return (
    <div>

      <h2 style={{ padding: '3rem' }} className='display-1'> Movie Detail</h2>

      {/* {JSON.stringify(movie.movie)} */}

      <center>
        <Card style={{ width: '24rem' }}>
          <Card.Img variant="top" src={movie.movie.poster_path} />
          <Card.Body>
            <Card.Title>{movie.movie.title}</Card.Title>
            <p> Popularity: {movie.movie.popularity} </p>
            <p> {movie.movie.overview} </p>
            <p> Genre: </p>
            {movie.movie.tags.map(tag => {
              return <p> {tag},  </p>
            })}
            <br />
            <Button style={{ marginTop: "10px" }} variant="warning" onClick={toEdit}>Edit</Button>
            <br />

            <Button style={{ marginTop: "10px" }} variant="danger" onClick={toDelete}>Delete</Button>
            <br />

            <Button style={{ marginTop: "10px" }} variant="primary" onClick={() => toFavorite(movie.movie)}>Add to Favorite</Button>
          </Card.Body>
        </Card>

      </center>

    </div>
  )
}
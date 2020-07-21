import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Button, Card, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { myFavorites } from '../config/graphql'

const GET_FAVORITES = gql`
    query{
        favorites @client
    }
`

export default () => {
    const { loading, error, data: movies } = useQuery(GET_FAVORITES)

    if (loading) {
        return <p> Loading... </p>
    }

    if (error) {
        return <p> Error! </p>
    }

    const history = useHistory()

    function toDeleteFav(id){
        console.log(id,'nihid')
        const tamp = []
        const fav = myFavorites()
        for(let i=0;i<fav.length;i++){
            if(fav[i]._id != id){
                tamp.push(fav[i])
            }
        }
        myFavorites(tamp)
        history.push('/movies')
    }

    return (
        <div>

            <h1 style={{ padding: '3rem' }} className='display-1' > Favorite Movie List </h1>


            <Row className='d-flex justify-content-around mx-5 my-5'>
                    {movies?.favorites.map(movie => {
                        return <Card style={{ width: '24rem' }}>
                            <Card.Img variant="top" src={movie.poster_path} />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <p> {movie.overview} </p>
                                <br />
                            </Card.Body>
                            <center>
                            <Button style={{width: '12rem' , marginBottom:"20px" }} variant="warning" onClick={() => toDeleteFav(movie._id)}>Delete from Favorite</Button>
                            </center>
                        </Card>
                    })}
            </Row>



        </div>
    )
}
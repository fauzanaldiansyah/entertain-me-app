import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const ADD_MOVIE = gql`
mutation addMovie($newMovie: newInput){
    addMovie(newMovie: $newMovie) 
        {
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

export default () => {

    const history = useHistory()

    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [popularity, setPopularity] = useState('')
    const [posterPath, setPosterPath] = useState('')
    const [tags, setTags] = useState('')

    const [addMovie] = useMutation(ADD_MOVIE, {refetchQueries: [{ query: GET_MOVIES}]})

    function onTitle(event) {
        setTitle(event.target.value)
    }

    function onOverview(event) {
        setOverview(event.target.value)
    }

    function onPopularity(event) {
        setPopularity(event.target.value)
    }

    function onPosterPath(event) {
        setPosterPath(event.target.value)
    }

    function onTags(event) {
        let str = event.target.value
        let re = /\s*,\s*/;
        let split = str.split(re)
        setTags(split)
    }

    function onSubmit(event) {
        console.log('masuksubmit')
        event.preventDefault()
        console.log(title,overview,posterPath, popularity, tags)
        addMovie({
            variables: {
                newMovie: {
                    title: title,
                    overview: overview,
                    poster_path: posterPath,
                    popularity: Number(popularity),
                    tags: tags
                }
            }
        })
        history.push('/movies')
    }

    return (
        <div>
            <center>
                <h2 style={{ padding: '3rem' }} className='display-1'> Add Movie</h2>
                <Form style={{ width: "60rem" }} onSubmit={onSubmit}>
                    <Form.Group controlId="title" onChange={onTitle}>
                        <Form.Label style={{ fontSize: "28pt" }}>Title</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Movie Title" />
                    </Form.Group>

                    <Form.Group width="10" controlId="overview" onChange={onOverview}>
                        <Form.Label style={{ fontSize: "28pt" }}>Overview</Form.Label>
                        <Form.Control size="lg" as="textarea" rows="3" placeholder="Overview" />
                    </Form.Group>

                    <Form.Group width="10" controlId="posterPath" onChange={onPosterPath}>
                        <Form.Label style={{ fontSize: "28pt" }}>Poster Path</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Poster Link" />
                    </Form.Group>

                    <Form.Group width="10" controlId="popularity" onChange={onPopularity}>
                        <Form.Label style={{ fontSize: "28pt" }}>Popularity</Form.Label>
                        <Form.Control size="lg" type="number" step="0.01" placeholder="Number" />
                    </Form.Group>

                    <Form.Group width="10" controlId="tags" onChange={onTags}>
                        <Form.Label style={{ fontSize: "28pt" }}>Tags</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Tags" />
                    </Form.Group>

                    <Button variant="primary" size="lg" type="submit">Submit</Button>
                </Form>
            </center>
        </div>
    )
}
import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

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

const EDIT_MOVIE = gql`
mutation updateMovie($id: ID, $editMov: newInput){
    updateMovie(_id: $id, updateMov: $editMov) 
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

export default () => {


    const history = useHistory()

    const { id } = useParams()

    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: {
            id: id
        }
    })

    useEffect(() => {
        setTitle(data?.movie.title)
        setOverview(data?.movie.overview)
        setPopularity(data?.movie.popularity)
        setPosterPath(data?.movie.poster_path)
        setTags(data?.movie.tags)
    }, [data])



    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [popularity, setPopularity] = useState('')
    const [posterPath, setPosterPath] = useState('')
    const [tags, setTags] = useState([])


    const [editMovie] = useMutation(EDIT_MOVIE, { refetchQueries: [{ query: GET_MOVIES }] })


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
        console.log(id, 'ni id', title,overview,posterPath,popularity,tags, 'nieditmov')
        editMovie({
            variables: {
                id: id,
                editMov: {
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
                <h2 style={{ padding: '3rem' }} className='display-1'> Edit Movie </h2>

                <Form style={{ width: "60rem" }} onSubmit={onSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label style={{ fontSize: "28pt" }}>Title</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Movie Title" value={title} onChange={onTitle} />
                    </Form.Group>

                    <Form.Group width="10" controlId="overview" >
                        <Form.Label style={{ fontSize: "28pt" }}>Overview</Form.Label>
                        <Form.Control size="lg" as="textarea" rows="3" placeholder="Overview" value={overview} onChange={onOverview}/>
                    </Form.Group>

                    <Form.Group width="10" controlId="posterPath">
                        <Form.Label style={{ fontSize: "28pt" }}>Poster Path</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Poster Link" value={posterPath} onChange={onPosterPath}/>
                    </Form.Group>

                    <Form.Group width="10" controlId="popularity" >
                        <Form.Label style={{ fontSize: "28pt" }}>Popularity</Form.Label>
                        <Form.Control size="lg" type="number" step="0.01" placeholder="Number" value={popularity} onChange={onPopularity} />
                    </Form.Group>

                    <Form.Group width="10" controlId="tags" >
                        <Form.Label style={{ fontSize: "28pt" }}>Tags</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Tags" value={tags} onChange={onTags}/>
                    </Form.Group>

                    <Button variant="primary" size="lg" type="submit">Submit</Button>
                </Form>


            </center>
        </div>
    )
}
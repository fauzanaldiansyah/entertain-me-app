const express = require('express')
const app = express()
const axios = require('axios')
const PORT = process.env.PORT || 3000
// const Redis = require('ioredis')
// const redis = new Redis()

app.use(express.urlencoded({extended: false}))


app.get('/movies', (req,res) => {
// app.get('/movies', async (req,res) => {
    // const movies = await redis.get('movies')
    // if(movies){
    //     console.log('masukdatadariredis')
    //     res.status(200).json(JSON.parse(movies))
    // }
    // else{
    //     console.log('masukambildata')
    //     axios.get('http://localhost:3001/movies')
    //     .then(response => {
    //         res.status(200).json(response.data)
    //         redis.set('movies', JSON.stringify(response.data))
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }
    axios.get('http://localhost:3001/movies')
    .then(response => {
        res.status(200).json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
})

app.get('/movies/:id', (req,res) => {
    console.log('masuk kesini')
    const id = req.params.id
    axios.get(`http://localhost:3001/movies/${id}`)
    .then(response => {
        res.status(200).json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
})

app.post('/movies', (req,res) => {
    const newMovies = req.body
    axios.post('http://localhost:3001/movies', newMovies)
    .then(response => {
        res.status(201).json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
})

app.put('/movies/:id', (req,res) => {
    const editMovies = req.body
    const id = req.params.id
    axios.put(`http://localhost:3001/movies/${id}`, editMovies)
    .then(response => {
        res.status(200).json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
})

app.delete('/movies/:id', (req,res) => {
    const id = req.params.id
    axios.delete(`http://localhost:3001/movies/${id}`)
    .then(response => {
        res.status(200).json({message: `Movie successfully deleted`})
    })
    .catch(err => {
        console.log(err)
    })
})

app.get('/tvseries',  (req,res) => {
    // app.get('/tvseries', async (req,res) => {
    // const tvseries = await redis.get('tvseries')
    // if(tvseries){
    //     console.log('masukdatadariredis')
    //     res.status(200).json(JSON.parse(tvseries))
    // }
    // else{
    //     console.log('ambildata')
    //     axios.get('http://localhost:3002/tvseries')
    //     .then(response => {
    //         res.status(200).json(response.data)
    //         redis.set('tvseries',JSON.stringify(response.data))
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }

})

app.get('/tvseries', (req,res) => {
    axios.get('http://localhost:3002/tvseries')
    .then(response => {
        res.status(200).json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
})

app.get('/tvseries/:id', (req,res) => {
    const id = req.params.id
    axios.get(`http://localhost:3002/tvseries/${id}`)
    .then(response => {
        res.status(200).json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
})

app.post('/tvseries', (req,res) => {
    const newTvSeries = req.body
    axios.post('http://localhost:3002/tvseries', newTvSeries)
    .then(response => {
        res.status(201).json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
})

app.put('/tvseries/:id', (req,res) => {
    const editTvSeries = req.body
    const id = req.params.id
    axios.put(`http://localhost:3002/tvseries/${id}`, editTvSeries)
    .then(response => {
        res.status(200).json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
})


app.delete('/tvseries/:id', (req,res) => {
    const id = req.params.id
    axios.delete(`http://localhost:3002/tvseries/${id}`)
    .then(response => {
        res.status(200).json({message: `Tv Series successfully deleted`})
    })
    .catch(err => {
        console.log(err)
    })
})

app.listen(PORT, () => {
    console.log(`orchestrator running on PORT ${PORT}`)
})
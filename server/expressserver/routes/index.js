const router = require('express').Router()
const moviesRouter = require('./moviesRouter') 
const tvSeriesRouter = require('./tvSeriesRouter')

router.get('/', (req,res) => {
    res.json("Hello World")
})

router.use('/movies', moviesRouter)

router.use('/tvseries', tvSeriesRouter)

module.exports = router
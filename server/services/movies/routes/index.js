const router = require('express').Router()
const moviesRouter = require('./moviesRouter') 

router.get('/', (req,res) => {
    res.json("Hello World")
})

router.use('/movies', moviesRouter)


module.exports = router
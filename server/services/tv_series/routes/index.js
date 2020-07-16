const router = require('express').Router()
const tvSeriesRouter = require('./tvSeriesRouter')

router.get('/', (req,res) => {
    res.json("Hello World")
})

router.use('/tvseries', tvSeriesRouter)

module.exports = router
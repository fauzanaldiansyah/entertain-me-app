const TvSeries = require('../models/TvSeriesModel')

class TvSeriesController {
    static find(req,res,next){
        TvSeries.find()
        .then(results => {
            res.status(200).json(results)
        })
    }

    static findOne(req,res,next){
        TvSeries.findOne(req.params.id)
        .then(results => {
            res.status(200).json(results)
        })
        .catch(err => {
            res.status(400).json({
                message: "Internal Server Error"
            })
        })
    }

    static create(req,res,next){
        TvSeries.create(req.body)
        .then(results => {
            res.status(200).json(results)
        })
        .catch(err => {
            res.status(500).json({
                message: "Internal Server Error"
            })
        })
    }

    static update(req,res,next){
        TvSeries.findOneAndUpdate(req.params.id, req.body)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }

    static delete(req,res,next){
        TvSeries.findByIdDelete(req.params.id)
        .then(result => {
            res.status(200).json({message: `Tv Series successfully deleted`})
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = TvSeriesController


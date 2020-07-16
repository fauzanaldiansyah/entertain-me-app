const Movies = require('../models/MoviesModel')

class MoviesController {
    static find(req,res,next){
        Movies.find()
        .then(results => {
            res.status(200).json(results)
        })
    }

    static findOne(req,res,next){
        Movies.findOne(req.params.id)
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
        Movies.create(req.body)
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
        Movies.findOneAndUpdate(req.params.id, req.body)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }

    static delete(req,res,next){
        Movies.findByIdDelete(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }

}

module.exports = MoviesController
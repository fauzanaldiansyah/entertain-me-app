const {getDatabase } = require('../config.js')
const dbName = "Movies"
const Movies = getDatabase().collection(dbName)
const {ObjectId} = require('mongodb')

class MoviesModel { 
    static find(){
        return Movies.find().toArray()
    }

    static create(newMovies){
        return Movies.insertOne(newMovies)
    }

    static findOneAndUpdate(id,body){
        return Movies.findOneAndUpdate({_id:ObjectId(id)},
        { 
            $set: {
                title: body.title,
                overview: body.overview,
                poster_path: body.poster_path,
                popularity: body.popularity,
                tags: body.tags
            }
        } )
    }
    
    static findByIdDelete(id){
        return Movies.deleteOne({_id:ObjectId(id)})
    }

    static findOne(id){
        return Movies.findOne({_id:ObjectId(id)})
    }

}

module.exports = MoviesModel
const {getDatabase} = require('../config.js')
const dbName = "TvSeries"
const TvSeries = getDatabase().collection(dbName)
const {ObjectId} = require('mongodb')

class TvSeriesModel { 
    static find(){
        return TvSeries.find().toArray()
    }

    static create(newTvSeries){
        return TvSeries.insertOne(newTvSeries)
    }

    static findOneAndUpdate(id,body){
        return TvSeries.findOneAndUpdate({_id:ObjectId(id)},
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
        return TvSeries.deleteOne({_id:ObjectId(id)})
    }

    static findOne(id){
        return TvSeries.findOne({_id:ObjectId(id)})
    }
}

module.exports = TvSeriesModel
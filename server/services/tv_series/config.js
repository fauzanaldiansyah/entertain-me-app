const { MongoClient } = require('mongodb')
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017"
const client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
const dbName = process.env.DATABASE_NAME

function connect(callback) {
    client.connect(function (err) {
        if (err) {
            console.log('error connection to mongo => ', mongo)
        }
        else {
            console.log('successfully connect to mongo')
            db = client.db(dbName)
        }
        callback(err)
    })
}
function getDatabase() {
    return db
}
module.exports = {
    connect, getDatabase
}



// const db = client.db(dbName)
// module.exports = db 
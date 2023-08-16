const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URI

mongoose.connect(mongo_url)
    .then(response => {
        console.log('MongoDB connection established')
    })
    .catch(err => {
        console.log('MongoDB connection error: ' + err)
    })
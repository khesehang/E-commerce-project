const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const ApiRoutes = require('./ApiRoutes');

const app = express();
dotenv.config()
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require('./db_connection')


app.use('/api', ApiRoutes)

app.use((req, res, next) => {
    const error = new Error("Request Not Found");
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';

    res.status(status).json({
        error: {
            message,
            status
        }
    })
})

const port = process.env.PORT
app.listen(port, () => {
    console.log('listening on post', port)
})
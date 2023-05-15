const express = require('express')
const fs = require('fs')

let app = express()
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

app.get('/api/v1/movies', (req, res) =>{
    res.status(200).json({
        status:"success",
        count:movies.length,
        data:{
            movies:movies
        }
    })
} )

const port = 3000
app.listen(port, () => {
    console.log('server started on '+port)
})
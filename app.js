const express = require('express')
const fs = require('fs')

let app = express()
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));


app.use(express.json())

//ROUTE HANDLER FUNCTIONS

const getAllMovies = (req, res) => {
    res.status(200).json({
        status: "success",
        count: movies.length,
        data: {
            movies: movies
        }
    })
}


const getMovie = (req, res) => {
    let id = + req.params.id;
    let movie = movies.find(film => film.id === id)

    if (!movie) {
        return res.status(404).json({
            status: "failed",
            message: "movie with id: " + id + " not found"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            movie: movie
        }
    })
}

const addMovie = (req, res) => {
    console.log(req.body)
    const newId = movies[movies.length - 1].id + 1
    const newMovie = Object.assign({ id: newId }, req.body)

    movies.push(newMovie)
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                movies: newMovie
            }
        })
    })
}

const updatMovie = (req, res) => {
    let id = + req.params.id;
    let updatedMovie = movies.find(film => film.id === id)
    if (!updatedMovie) {
        return res.status(404).json({
            status: "not found"
        })
    }
    let index = movies.indexOf(updatedMovie)

    Object.assign(updatedMovie, req.body)

    movies[index].updatedMovie

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: "success",
            data: {
                movie: updatedMovie
            }
        }
        )
    })
}

const deleteMovie = (req, res) => {
    let id = req.params.id * 1;
    let deleteMovie = movies.find(el => el.id === id)

    if (!deleteMovie) {
        return res.status(404).json({
            status: "not found",
            message: "not found " + id + "with this id"
        })
    }

    let index = movies.indexOf(deleteMovie)

    movies.splice(index, 1);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: "success",
            data: {
                movie: null
            }
        })
    })
}

//API ROUTES

app.get('/api/v1/movies', getAllMovies)
app.get('/api/v1/movies/:id', getMovie)
app.post('/api/v1/movies', addMovie)
app.patch('/api/v1/movies/:id', updatMovie)
app.delete('/api/v1/movies/:id', deleteMovie)


app.route('/api/v1/movies')
    .get(getAllMovies)
    .post(addMovie)

app.route('/api/v1/movies/:id')

    .patch(updatMovie)

const port = 3000
app.listen(port, () => {
    console.log('server started on ' + port)
})

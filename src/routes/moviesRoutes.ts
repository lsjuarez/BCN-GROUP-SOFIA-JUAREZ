import express = require('express');
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from '../services/movie-service';

const moviesRouter = express.Router();
moviesRouter.use(express.json());

moviesRouter.get('/', (req:any, res:any)=> {
    try{
        const movies = getAllMovies();

        res.status(200).send(movies);
    } catch(err){
        res.status(500).json({ error: `${err}` });
    };
});

moviesRouter.get('/:id', (req:any, res:any) => {
    try{
        const movieId = parseInt(req.params.id);
        const movieById = getMovieById(movieId);

        movieById ? 
            res.status(200).send(movieById) : 
            res.status(404).send(`Movie with id ${movieId} not found`);
    } catch(err){
        res.status(500).json({ error: `${err}` });
    };
});

moviesRouter.post('/', (req:any, res:any) => {
    try{
        const newMovie = createMovie(req.body);
        res.status(200).send(newMovie);
    } catch(err){
        res.status(500).json({ error: `${err}` });
    }
});

moviesRouter.put('/:id', (req:any, res:any) => {
    try {
        const movieToUpdate = req.body;
        const movieId = parseInt(req.params.id);

        const movieUpdated = updateMovie(movieToUpdate, movieId);
        res.status(200).send(movieUpdated)
    } catch(err){
        res.status(500).json({ error: `${err}` });
    }
});

moviesRouter.delete('/:id', (req:any, res:any) => {
    try {
        const movieId = parseInt(req.params.id);
        const newListOfMovies = deleteMovie(movieId);
        res.status(200).send(newListOfMovies)
    } catch(err){
        res.status(500).json({ error: `${err}` });
    }
})

export {
    moviesRouter
}
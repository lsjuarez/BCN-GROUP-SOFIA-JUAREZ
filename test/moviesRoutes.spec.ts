
const express = require('express');
const request = require('supertest');

const { moviesRouter } = require('../src/routes/moviesRoutes');
const { getAllMovies, getMovieById, updateMovie, createMovie, deleteMovie } = require('../src/services/movie-service');
const { movieToUpdate, movieToCreate, movieAlreadyCreated } = require("./util/requestBody");
const { movies } = require('../src/util/movies');

const app = express();
app.use(express.json());
app.use('/api/v1/movies', moviesRouter);

beforeEach(() => {
    // Clear the entire module cache before each test
    jest.resetModules();

});
describe('GET tests', () => {
    it('should return all movies in /api/v1/movies', async () => {
        const response = await request(app).get('/api/v1/movies');
        const allMovies = getAllMovies();

        expect(response.status).toBe(200);
        expect(response.body).toEqual(allMovies);
    }, 10000);

    it('should return the movie with id 1 in /api/v1/movies/1', async () => {
        const response = await request(app).get('/api/v1/movies/1');
        const movieById = getMovieById(1);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(movieById);
    }, 10000);

    it('should return 404 for non-existing movie id 75 in /api/v1/movies/75', async () => {
        const response = await request(app).get('/api/v1/movies/75');

        expect(response.status).toBe(404);
    }, 10000)
});

describe('PUT /api/v1/movies/:id', () => {
    it('should update an existing movie', async () => {
        const response = await request(app).put('/api/v1/movies/1').send(movieToUpdate);
        const updatedMovie = updateMovie(movieToUpdate, 1);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedMovie);
    }, 10000);

    it('should throw an error for a non-existing movie', async () => {
        const response = await request(app).put('/api/v1/movies/75').send(movieToUpdate);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ "error": "Error: The movie with id 75 does not exists." })
    }, 10000)
});

describe('POST /api/v1/movies', () => {
    it('should create a new movie', async () => {
        const response = await request(app).post('/api/v1/movies').send(movieToCreate);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(movies[movies.length - 1]);

    });
    it('should throw an error when a movie already exists', async () => {
        const response = await request(app).post('/api/v1/movies').send(movieAlreadyCreated);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ "error": "Error: The movie with the name 'Forrest Gump' already exists" });

    });
});

describe('DELETE /api/v1/movies/:id', () => {
    it('should delete a movie and return the movie list updated', async () => {
        const response = await request(app).delete('/api/v1/movies/1');
        const movieListUpdated = getAllMovies();

        expect(response.status).toBe(200);
        expect(response.body).toEqual(movieListUpdated);
    });

    it('should throw an error when try to delete a non-existing movie', async () => {
        const response = await request(app).delete('/api/v1/movies/75');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ "error": "Error: The movie with id 75 does not exists." });
    });
})
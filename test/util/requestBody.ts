import { Movie } from '../../src/interfaces/movie-interface';

export const movieToUpdate = {
    "name": "The Matrixxx",
    "director": "The Wachowskis",
    "year": 1999,
    "duration": 136,
    "rottenTomatoes": 88
} as Movie;

export const movieToCreate = {
    "name": "The Hunger Games",
    "director": "Gary Ross",
    "year": 2012,
    "duration": 142,
    "rottenTomatoes": 84
} as Movie;

export const movieAlreadyCreated = {
    "name": "Forrest Gump",
    "director": "Robert Zemeckis",
    "year": 1994,
    "duration": 142,
    "rottenTomatoes": 72
};
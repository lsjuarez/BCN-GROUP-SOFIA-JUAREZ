import { Movie } from "../interfaces/movie-interface";
import { movies } from "../util/movies";

function getAllMovies(): Movie[]{
    return movies;
};

function getMovieById(id: number): Movie | undefined {
    const movieIndex = movies.findIndex((movie: Movie) => movie.id === id);
    return movies[movieIndex];
}

function createMovie(movie: Movie): Movie {
    const isMovie = existsMovie(movie.name);
    if(isMovie) throw new Error(`The movie with the name '${movie.name}' already exists)`);

    validateMovie(movie);

    movie.id = movies.length + 1;;
    movies.push(movie);

    return movie;
}

function updateMovie(movieUpdated: Movie, movieId: number): Movie {
    validateMovie(movieUpdated);
    let movieToUpdate = movies.findIndex((movie: Movie) => movie.id === movieId);

    if(movieToUpdate === -1) throw new Error(`The movie with id ${movieId} does not exists.`);

    movieUpdated.id= movieId;
    movies[movieToUpdate] = movieUpdated;

    return movies[movieToUpdate];
}

function deleteMovie(id: number): Movie[] {
    const movieToEleminate = movies.findIndex((movie: Movie) => movie.id === id);

    if(movieToEleminate === -1) throw new Error(`The movie with id ${id} does not exists.`);

    movies.splice(movieToEleminate, 1);
    return movies;
};

function validateMovie(movie: Movie): void {
    const {name, director, duration, year, rottenTomatoes} = movie;
    if(
        typeof name !== 'string' ||
        typeof name === 'undefined' || 
        typeof director !== 'string' || 
        typeof director === 'undefined' || 
        typeof duration !== 'number' ||
        duration < 0 ||
        typeof year !== 'number' ||
        year < 0 ||
        typeof rottenTomatoes !== 'number' ||
        rottenTomatoes < 0
    ) throw new Error('Invalid movie data');
};

function existsMovie(name: string): boolean {
    const existsMovie = movies.some((movie) => movie.name.toLowerCase() === name.toLowerCase());
    return existsMovie;
}

export {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
}
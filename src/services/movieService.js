// import * as genresAPI from "./fakeGenreService";
import httpService from "./httpService";
import { apiEndpoint } from "../config.json";

function movieUrl(id) {
    return `${apiEndpoint}/movies/${id}`;
}

export function getMovies() {
    return httpService.get(apiEndpoint + '/movies');
}

export function getMovie(movieId) {
    // return movies.find((m) => m._id === movieId);
    return httpService.get(movieUrl(movieId));
}

export function saveMovie(movie) {
    // let movieInDb = movies.find((m) => m._id === movie._id) || {};
    // movieInDb.title = movie.title;
    // movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genreId);
    // movieInDb.numberInStock = movie.numberInStock;
    // movieInDb.dailyRentalRate = movie.dailyRentalRate;

    // if (!movieInDb._id) {
    //     movieInDb._id = Date.now().toString();
    //     movies.push(movieInDb);
    // }

    // return movieInDb;

    if (movie._id) {
        const body = {...movie};
        delete body._id;
        return httpService.put(movieUrl(movie._id), body);
    }
    // The movie object does not have an id, so it must be a new movie
    return httpService.post(apiEndpoint + '/movies', movie);
}

export function deleteMovie(movieId) {
    // let movieInDb = movies.find((m) => m._id === movieId);
    // movies.splice(movies.indexOf(movieInDb), 1);
    // return movieInDb;
    return httpService.delete(movieUrl(movieId));
}

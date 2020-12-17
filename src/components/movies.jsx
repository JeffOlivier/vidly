import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeMe from "./common/likeMe";

class Movies extends Component {
    state = {
        movies: getMovies(),
        //TODO: Add dynamic adding of doesLike attribute to each movie
    };

    constructor() {
        super();
        // this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleLikeToggle = this.handleLikeToggle.bind(this);
    }

    handleLikeToggle = (movie) => {
        let newMovieList = [...this.state.movies];
        // console.log("newMovieList", newMovieList);
        const index = newMovieList.map((e) => e._id).indexOf(movie.id); // const index = Data.map(function (e) { return e.name; }).indexOf("Nick");
        newMovieList[index] = { ...newMovieList[index] };
        newMovieList[index].doesLike = !newMovieList[index].doesLike;
        this.setState({ movies: newMovieList });
    };

    handleDelete = (movie) => {
        console.log("Delete Clicked (id# " + movie.id + ")");

        // let newMovieList = { ...this.state.movies };
        const newMovieList = this.state.movies.filter(
            (m) => m._id !== movie.id
        );

        this.setState({ newMovieList });
    };

    // renderMovieList() {
    //     if (this.state.tags.length === 0) return <p>There are no tags!</p>;

    //     return <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>;
    // }

    render() {
        const { length: movieCount } = this.state.movies; // Object destructuring ---> gets the length property of movies

        if (movieCount === 0) return <p>There are no movies in the database</p>;

        return (
            <React.Fragment>
                <p>Showing {movieCount} movies in the database</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map((movie) => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>${movie.dailyRentalRate.toFixed(2)}</td>
                                <td>
                                    <LikeMe
                                        // toggleLike={() =>
                                        //     this.handleLike(movie)
                                        // }
                                        toggleLike={this.handleLikeToggle}
                                        movieId={movie._id}
                                        doesLike={movie.doesLike}
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            this.handleDelete({ id: movie._id })
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );

        // _id: "5b21ca3eeb7f6fbccd471815",
        // title: "Terminator",
        // genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
        // numberInStock: 6,
        // dailyRentalRate: 2.5,
        // publishDate: "2018-01-03T19:04:28.809Z"
    }
}

export default Movies;

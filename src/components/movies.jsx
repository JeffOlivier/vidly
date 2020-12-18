import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        //TODO: Add dynamic adding of doesLike attribute to each movie
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: "title", order: "asc" },
    };

    // constructor() {
    //     super();
    //     this.handleDelete = this.handleDelete.bind(this);
    //     this.handleLikeToggle = this.handleLikeToggle.bind(this);
    //     this.handlePageChange = this.handlePageChange.bind(this);
    // }

    componentDidMount() {
        const defaultAllGenres = { _id: "", name: "All Genres" };
        const genres = [defaultAllGenres, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
        this.setState({ currentGenre: defaultAllGenres });
    }

    handleLikeToggle = (movie) => {
        console.log("Llike toggled");
        let newMovieList = [...this.state.movies];
        const index = newMovieList.map((e) => e._id).indexOf(movie.id); // const index = Data.map(function (e) { return e.name; }).indexOf("Nick");
        newMovieList[index] = { ...newMovieList[index] };
        newMovieList[index].doesLike = !newMovieList[index].doesLike;
        this.setState({ movies: newMovieList });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = (genre) => {
        this.setState({ currentGenre: genre });
        this.setState({ currentPage: 1 });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    handleDelete = (movie) => {
        const newMovieList = this.state.movies.filter(
            (m) => m._id !== movie.id
        );
        this.setState({ movies: newMovieList });
    };

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            currentGenre,
            movies: allMovies,
            sortColumn,
        } = this.state;

        const filteredMovies =
            currentGenre && currentGenre._id
                ? allMovies.filter((m) => m.genre._id === currentGenre._id)
                : allMovies;

        const sortedMovies = _.orderBy(
            filteredMovies,
            [sortColumn.path, "title"],
            [sortColumn.order, "asc"]
        );

        const someMovies = paginate(sortedMovies, currentPage, pageSize);

        return { totalCount: filteredMovies.length, data: someMovies };
    };

    render() {
        const { length: movieCount } = this.state.movies; // Object destructuring ---> gets the length property of movies
        const { pageSize, currentPage, sortColumn } = this.state;

        if (movieCount === 0) return <p>There are no movies in the database</p>;

        const { totalCount, data: movies } = this.getPagedData();
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.currentGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <p>Showing {totalCount} movies in the database</p>
                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onToggleLike={this.handleLikeToggle}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        totalItems={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;

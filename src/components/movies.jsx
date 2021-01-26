import React, { Component } from "react";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        //TODO: Add dynamic adding of doesLike attribute to each movie
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path: "title", order: "asc" },
    };

    // constructor() {
    //     super();
    //     this.handleDelete = this.handleDelete.bind(this);
    //     this.handleLikeToggle = this.handleLikeToggle.bind(this);
    //     this.handlePageChange = this.handlePageChange.bind(this);
    // }

    async componentDidMount() {
        const defaultAllGenres = { _id: "", name: "All Genres" };
        // const genres = [defaultAllGenres, ...getGenres()];
        const { data: genres1 } = await getGenres();
        const genres = [defaultAllGenres, ...genres1];

        const { data: movies } = await getMovies();
        this.setState({ movies: movies, genres });
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
        this.setState({
            selectedGenre: genre,
            currentPage: 1,
            searchQuery: "",
        });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    handleDelete = async (movie) => {
        const originalMovies = this.state.movies;
        const newMovieList = originalMovies.filter(
            (m) => m._id !== movie.id
        );
        this.setState({ movies: newMovieList });

        try {
            await deleteMovie(movie.id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                toast.error('This movie has already been deleted.');
            }
            this.setState({ movies: originalMovies });
        }
    };

    handleNewMovie = () => {
        this.props.history.push(`/movies/new/`);
    };

    handleSearch = (query) => {
        this.setState({
            searchQuery: query,
            selectedGenre: null,
            currentPage: 1,
        });
    };

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            searchQuery,
            movies: allMovies,
        } = this.state;

        let filteredMovies = allMovies;
        if (searchQuery)
            filteredMovies = allMovies.filter((m) =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            filteredMovies = allMovies.filter(
                (m) => m.genre._id === selectedGenre._id
            );

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
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <button
                        className="btn btn-primary"
                        onClick={this.handleNewMovie}
                        style={{ marginBottom: 20 }}
                    >
                        Add a New Movie
                    </button>
                    <p>Showing {totalCount} movies in the database</p>
                    <SearchBox
                        value={this.state.searchQuery}
                        onChange={this.handleSearch}
                    />
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

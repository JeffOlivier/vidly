import React, { Component } from "react";
import { Link } from "react-router-dom";
import LikeMe from "./common/likeMe";
import Table from "./common/table";

class MoviesTable extends Component {
    columns = [
        {
            path: "title",
            label: "Title",
            content: (movie) => (
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
            ),
        },
        // { path: "title", label: "Title" },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            content: (movie) => (
                <LikeMe
                    onToggleLike={this.props.onToggleLike}
                    movieId={movie._id}
                    doesLike={movie.doesLike}
                />
            ),
        },
        {
            key: "delete",
            content: (movie) => (
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                        this.props.onDelete({
                            id: movie._id,
                        })
                    }
                >
                    Delete
                </button>
            ),
        },
    ];

    render() {
        const { movies, onSort, sortColumn } = this.props;
        return (
            <Table
                columns={this.columns}
                data={movies}
                sortColumn={sortColumn}
                onSort={onSort}
            />
        );
    }
}

export default MoviesTable;

import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
    state = {
        data: {
            _id: "",
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        genres: [],
        errors: {},
    };

    schema = {
        _id: Joi.string().allow(""),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number()
            .min(0)
            .max(100)
            .required()
            .label("Number in Stock"),
        dailyRentalRate: Joi.number()
            .min(0)
            .max(10)
            .required()
            .label("Daily Rental Rate"),
    };

    async populateGenres() {
        // const genres = getGenres();
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovie() {
        try {
            // Check to see if we are creating a new movie or retrieving one from the server
            const movieId = this.props.match.params.id;
            if (movieId === "new" || movieId === "new/" || movieId === undefined)
                return;
            
            // const movie = getMovie(movieId);
            const { data: movie } = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) });
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                // redirect the suer and don't let the browser's back button work
                this.props.history.replace("/404"); 
            }
        } 
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
        };
    }

    doSubmit = async () => {
        await saveMovie(this.state.data); // Save the new movie object
        this.props.history.push("/movies"); // Redirect the user to the movie listing page
    };

    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock")}
                    {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;

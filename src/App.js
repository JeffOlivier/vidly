import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import MovieDetails from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import "./App.css";

function App() {
    return (
        <React.Fragment>
            <NavBar />
            <main className="container">
                <Switch>
                    <Route path="/movies/:id" component={MovieDetails} />
                    <Route path="/movies" component={Movies} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/rentals" component={Rentals} />
                    <Route path="/404" component={NotFound} />
                    {/* <Route path="/" exact component={Home} /> */}
                    <Redirect from="/" exact to="/movies" />
                    <Redirect to="/404" />
                </Switch>
            </main>
        </React.Fragment>
    );
}

export default App;

import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
    state = {
        data: { username: "", password: "" },
        errors: {},
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };

    // username = React.createRef();
    // componentDidMount() {
    //     this.username.current.focus();
    // }

    validate = () => {
        const options = { abortEarly: false };
        const result = Joi.validate(this.state.data, this.schema, options);

        if (!result.error) return null;

        const errors = {};
        // could use reduce()
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }

        return errors;

        // const errors = {};
        // const { data } = this.state;

        // if (data.username.trimEnd() === "") {
        //     errors.username = "Username is required";
        // }

        // if (data.password.trimEnd() === "") {
        //     errors.password = "Password is required";
        // }

        // //Object.keys(errors) --> returns all of the keys in the object "errors"
        // return Object.keys(errors).length === 0 ? null : errors;
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        console.log(errors);
        this.setState({ errors: errors || {} }); // this (errors) should never be null
        if (errors) return; // if there are any errors, return so that we don't call the server

        // Call the server
        // const username = document.getElementById('username').value;
        // const username = this.username.current.value;

        console.log("Submitted");
    };

    // validateProperty = (input) => {
    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;

        // if (name === "username") {
        //     if (value.trim() === "") return "Username is required";
        // }
        // if (name === "password") {
        //     if (value.trim() === "") return "Password is required";
        // }
    };

    // handleChange = (e) => {
    //     const data = { ...this.state.data };
    //     data[e.currentTarget.name] = e.currentTarget.value;
    //     this.setState({ data });
    // };
    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    render() {
        const { data } = this.state; // object destructuring
        const { errors } = this.state; // object destructuring

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        value={data.username}
                        label="Username"
                        onChange={this.handleChange}
                        type="text"
                        autofocus="true"
                        error={errors.username}
                    />
                    <Input
                        name="password"
                        value={data.password}
                        label="Password"
                        onChange={this.handleChange}
                        type="password"
                        autofocus="false"
                        error={errors.password}
                    />

                    <button
                        disabled={this.validate()}
                        className="btn btn-primary"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginForm;

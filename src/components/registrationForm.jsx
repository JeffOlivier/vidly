import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegistrationForm extends Form {
    state = {
        data: { username: "", password: "", name: "" },
        errors: {},
    };

    schema = {
        username: Joi.string().email().required().label("Username"),
        password: Joi.string().required().min(5).label("Password"),
        name: Joi.string().required().label("Name"),
    };

    // username = React.createRef();
    // componentDidMount() {
    //     this.username.current.focus();
    // }
    //<input ref={this.username} ... >

    doSubmit = () => {
        // Call the server
        console.log("Submitted Registration Form");
    };

    render() {
        return (
            <div>
                <h1>Registration</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegistrationForm;

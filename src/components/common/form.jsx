import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Joi from "joi-browser";

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

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
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();

        this.setState({ errors: errors || {} }); // this (errors) should never be null
        if (errors) return; // if there are any errors, return so that we don't call the server

        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    renderInput(name, label, type = "text", focus) {
        const { data, errors } = this.state; // object destructuring

        return (
            <Input
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                type={type}
                error={errors[name]}
            />
        );
    }

    renderSelect(name, label, options) {
        const { data, errors } = this.state; // object destructuring

        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

    renderButton(label) {
        return (
            <button disabled={this.validate()} className="btn btn-primary">
                {label}
            </button>
        );
    }
}

export default Form;

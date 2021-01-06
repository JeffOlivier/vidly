import React from "react";

const SearchBox = ({ value, onChange }) => {
    return (
        <input
            type="text"
            name="query"
            className="form-control my-3" // my-3 == adds 3px margin to the y-axis (to the top and bottom of the input field)
            placeholder="Search ..."
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)} // we raise a custom event with the value of the input field (e.currentTarget.value)
        />
    );
};

export default SearchBox;

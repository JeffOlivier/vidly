import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select id={name} name={name} {...rest} className="form-control">
                <option value="" />
                {options.map((item) => (
                    <option value={item._id} key={item._id}>
                        {item.name}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Select;

import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ totalItems, pageSize, onPageChange, currentPage }) => {
    const pagesCount = Math.ceil(totalItems / pageSize);

    if (pagesCount === 1) return null;

    const pages = _.range(1, pagesCount + 1);

    return (
        <nav>
            <ul className="pagination">
                {/* {() => {
                    for (let i = 1; i <= props.totalPages; i++) {
                        let classes = "page-item";
                        if (i === props.currentPage) classes += " active";
                        <li
                            className={classes}
                            onClick={() => props.handlePageChange({ i })}
                        >
                            <a className="page-link">
                                {i}
                            </a>
                        </li>;
                    }
                }} */}
                {pages.map((page) => (
                    <li
                        key={page}
                        className={
                            page === currentPage
                                ? "page-item active"
                                : "page-item"
                        }
                    >
                        <a
                            href="#x"
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

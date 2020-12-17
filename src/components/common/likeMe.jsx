import React from "react";

const LikeMe = (props) => {
    let classes = "fa fa-heart";
    if (!props.doesLike) classes += "-o";

    return (
        <i
            className={classes}
            aria-hidden="true"
            onClick={() =>
                props.toggleLike({
                    id: props.movieId,
                })
            }
            style={{ cursor: "pointer" }}
        ></i>
    );
};

export default LikeMe;

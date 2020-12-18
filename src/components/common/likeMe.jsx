import React from "react";

const LikeMe = (props) => {
    let classes = "clickable fa fa-heart";
    if (!props.doesLike) classes += "-o";
    return (
        <i
            className={classes}
            aria-hidden="true"
            onClick={() =>
                props.onToggleLike({
                    id: props.movieId,
                })
            }
        ></i>
    );
};

export default LikeMe;

import React from 'react';
import circle from "../../assets/images/spinning-circles.svg";

const Preloader = (props : any) => {
    return (
        <div>
            {props.isFetching ? <img src={circle} /> : null}
        </div>
    );
};

export default Preloader;
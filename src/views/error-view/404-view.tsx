import * as React from "react";
const imgSrc = require("../../static/img/404.jpg");

export function noResourceView() {
    return (<>
        <img src={imgSrc} className="g-error-view"/>
    </>)
}

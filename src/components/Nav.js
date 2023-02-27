import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
    return (
        <nav>
            <p id="navTitle">Stranger's Things</p>
            <Link to="/" id="homeBttn" >HOME</Link>
        </nav>
    )
}

export default Nav;
import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
    return (
        <nav>
            <p id="navTitle">Stranger's Things</p>
            <Link to="/" id="homeNav" className="navButton">HOME</Link>
            <Link to="/newpost" id="newPostNav" className="navButton">New Post</Link>
        </nav>
    )
}

export default Nav;
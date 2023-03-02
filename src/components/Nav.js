import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {

    const {loggedIn, setLoggedIn, setCurrentUser } = props;

    function logout (){
        localStorage.removeItem("token");
        setLoggedIn(false);
        setCurrentUser({});
    }

    return (
        <nav>
            <p id="navTitle">Stranger's Things</p>
            { loggedIn  ? (
                <div id="buttonContainer">
                    <Link to="/" id="homeNav" className="navButton">Home</Link>
                    <Link to="/newpost" id="newPostNav" className="navButton">New Post</Link>
                    <Link to="/profile" className="navButton">Profile</Link>
                    <Link to="/" onClick={()=> logout()}className="navButton">Log Out</Link>
                 </div> 
            ): (
                <div id="buttonContainer">
                    <Link to="/" id="homeNav" className="navButton">Home</Link>
                    <Link to="/newuser" className="navButton">Register</Link>
                    <Link to="/login" className="navButton">Login</Link>
                </div>
            )} 
        </nav>
    )
}

export default Nav;
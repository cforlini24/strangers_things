import React from "react";
import { Link } from "react-router-dom";

const Main = (props) => {
    const {postings} = props;

    // title, author(obj), createdAt, description, isAuthor, location, price, willDeliver, _id

    return (
        <div id="mainContainer">
            {
                !postings.length ? <div className="postContainer">"No results found"</div> : postings.map((post) => {
                    return (
                        <Link to={`/${post._id}`} key={post._id}className="postContainer">
                            <p className="postTitle postLabel"><span className="postData">{post.title}</span></p>
                            <p className="postAuthor postLabel">Author: <span className="postData">{post.author.username}</span></p>
                            <p className="postLocation postLabel">Location: <span className="postData">{post.location}</span></p>
                            <p className="postPrice postLabel"><span className="postData">{post.price == "free" ? "Free" : post.price}</span></p>
                            <p className="postDelivery postLabel">Delivery offered: <span className="postData">{post.willDeliver ? "True" : "False"}</span></p>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Main;
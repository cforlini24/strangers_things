import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Main = (props) => {
    const {postings, searchTerm, setSearchTerm, getPostingsData} = props;

    // title, author(obj), createdAt, description, isAuthor, location, price, willDeliver, _id

    let filteredPosts = postings.filter((post) => {
        let lowerCase = post.title.toLowerCase();

        return lowerCase.includes(searchTerm.toLowerCase())
    })




    useEffect(()=>{
        getPostingsData()
    }, [])

    return (
        <div id="mainContainer">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            {
                !filteredPosts.length ? <div className="postContainer">No results found</div> : filteredPosts.map((post) => {
                    return (
                        <Link to={`/${post._id}`} key={post._id}className="postContainer">
                            
                            
                            <div className="textContainer">
                            <div className="postLeft">
                                <p className="postTitle postLabel"><span className="postData postTitle">{post.title}</span></p>
                                <p className="postPrice postLabel"><span className="postData">{post.price == "free" ? "Free" : post.price}</span></p>
                            </div>
                            <div className="postRight">
                                <p className="postAuthor postLabel">Author: <span className="postData">{post.author.username}</span></p>
                                <p className="postLocation postLabel">Location: <span className="postData">{post.location}</span></p>
                                <p className="postDelivery postLabel">Delivery offered: <span className="postData">{post.willDeliver ? "True" : "False"}</span></p>
                            </div>
                            </div>
                            
                            
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Main;
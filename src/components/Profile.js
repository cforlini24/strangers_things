import react, { useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = (props) =>{
    

    const {currentUser, getCurrentUser} = props;
    useEffect(()=>{
        getCurrentUser()
    }, [])

    const {messages, posts, username, _id} = currentUser;

    return(
        <div id="mainContainer">
            <h2>Welcome, {username}!</h2>
            <h3>Your active posts</h3>
            {
                posts.map((post) => {
                    if (post.active){
                        return (
                            <Link to={`/${post._id}`} key={post._id}className="postContainer">
                            
                            
                            <div className="textContainer">
                            <div className="postLeft">
                                <p className="postTitle postLabel"><span className="postData postTitle">{post.title}</span></p>
                                <p className="postPrice postLabel"><span className="postData">{post.price == "free" ? "Free" : post.price}</span></p>
                            </div>
                            <div className="postRight">
                                <p className="postAuthor postLabel">Author: <span className="postData">{username}</span></p>
                                <p className="postLocation postLabel">Location: <span className="postData">{post.location}</span></p>
                                <p className="postDelivery postLabel">Delivery offered: <span className="postData">{post.willDeliver ? "True" : "False"}</span></p>
                            </div>
                            </div>
                        </Link>
                        )
                    }
                })
            }
            <h3>Your archived posts</h3>
            {
                posts.map((post) => {
                    if (!post.active){
                        return (
                            <div key={post._id}className="postContainer archivedPost">
                            
                            
                            <div className="textContainer">
                            <div className="postLeft">
                                <p className="postTitle postLabel"><span className="postData postTitle">{post.title}</span></p>
                                <p className="postPrice postLabel"><span className="postData">{post.price == "free" ? "Free" : post.price}</span></p>
                            </div>
                            <div className="postRight">
                                <p className="postAuthor postLabel">Author: <span className="postData">{username}</span></p>
                                <p className="postLocation postLabel">Location: <span className="postData">{post.location}</span></p>
                                <p className="postDelivery postLabel">Delivery offered: <span className="postData">{post.willDeliver ? "True" : "False"}</span></p>
                            </div>
                            </div>
                        </div>
                        )
                    }
                })
            }
            <h2>Your messages</h2>
            <div id="profileMessageContainer">
                <div id="leftContainer">
                    <h3 className="messageHeader">Sent messages</h3>
                    <div className="threadContainer" id="sentContainer">
                    {
                        messages.map((message) =>{
                            if(message.fromUser.username == username){
                                return(
                                    <div className="individualMessage" key={message._id}>
                                        <p >Sent to: {message.post.author.username}</p>
                                        <p className="fromLabel">In reply to: {message.post.title}</p>
                                        <p>{message.content}</p>
                                    </div>
                                )
                            }
                        })
                    }
                    </div>
                 </div>
                 <div id="rightContainer">
                 <h3 className="messageHeader">Recieved messages</h3>
                 <div className="threadContainer" id="recievedContainer">
                    {
                        messages.map((message) => {
                            if(message.fromUser.username != username){
                            
                                return(
                                    <div className="individualMessage" key={message._id}>
                                        <p >From: {message.fromUser.username}</p>
                                        <p className="fromLabel">In reply to: {message.post.title}</p>
                                        <p>{message.content}</p>
                                    </div>
                                )
                            }                   
                        })
                    }
                  </div>
                  </div>
            </div>
        </div>
    )
}

export default Profile;
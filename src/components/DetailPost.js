import react from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailPost = (props) => {
    let {postings, BASE_URL, setPostings} = props;

    let {postId} = useParams();
    let detailPost = {};

    for(let i = 0; i < postings.length; i++){
        if(postings[i]._id == postId){
            detailPost = postings[i];
            break;
        }
    }

    let {title, author, createdAt, description, isAuthor, location, price, willDeliver, _id} = detailPost;
    let username = author.username;
    let userId = author._id;
    let localToken = localStorage.getItem("token")
    let navigate = useNavigate();


    async function deleteCurrentPost() {
        let promise = {};
        try {
            const respone = await fetch(`${BASE_URL}/posts/${_id}`,{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localToken}`
                }
            });
            promise = await respone.json();
            console.log(promise);
        } catch (error) {
            console.log(error)
        }
        let newPostings = postings.filter((post) => {
            return (post._id != _id)
        })

        if(promise.success){
            setPostings(newPostings)
        }else{
            alert("You are not allowed to delete this post")
        }
        navigate("/")
    }

    return (
        <div className="detailContainer">
                <p className="detailTitle"><span className="detailData"> {title}</span></p>
                <p className="detailAuthor">Author: <span className="detailData">{username}</span></p>
                <p className="detailDescription"><span className="detailData">{description}</span> </p>
                <p className="detailPrice"><span className="detailData">{price == "free" ? "Free" : price}</span></p>
                <p className="detailLocation">Location: <span className="detailData">{location}</span></p>
                <p className="detailDelivery">Delivery offered: <span className="detailData">{willDeliver ? "True" : "False"}</span></p>
                <button value="Delete post" onClick={deleteCurrentPost}>Delete post</button>
        </div>
    )
}

export default DetailPost;
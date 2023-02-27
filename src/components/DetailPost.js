import react from "react";
import { useParams } from "react-router-dom";

const DetailPost = (props) => {
    let {postings} = props;

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


    return (
        <div className="detailContainer">
                <p className="detailTitle"><span className="detailData"> {title}</span></p>
                <p className="detailAuthor">Author: <span className="detailData">{username}</span></p>
                <p className="detailDescription"><span className="detailData">{description}</span> </p>
                <p className="detailPrice"><span className="detailData">{price == "free" ? "Free" : price}</span></p>
                <p className="detailLocation">Location: <span className="detailData">{location}</span></p>
                <p className="detailDelivery">Delivery offered: <span className="detailData">{willDeliver ? "True" : "False"}</span></p>
        </div>
    )
}

export default DetailPost;
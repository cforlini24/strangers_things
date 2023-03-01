import react, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailPost = (props) => {
    let {postings, BASE_URL, setPostings, getPostingsData, currentUser} = props;

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

    let [editTitle, setEditTitle] = useState(title)
    let [editDescription, setEditDescription] = useState(description)
    let [editPrice, setEditPrice] = useState(price)
    let [editLocation, setEditLocation] = useState(location)
    let [editDelivery, setEditDelivery] = useState(willDeliver)

    let [editShown, setEditShown] = useState(false)
    function editClicked () {
        //TODO add if else statment to check if current user is the poster
        setEditShown(!editShown)
        console.log(editShown)
    }

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
    
    async function putEdit(){ 
        setEditShown(!editShown)
        let promise = {}
            try {
                const respone = await fetch(`${BASE_URL}/posts/${_id}`,{
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localToken}`
                    },
                    body : JSON.stringify({
                        post: {
                            title: editTitle,
                            description: editDescription,
                            price: editPrice,
                            location: editLocation,
                            willDeliver: editDelivery
                        }
                    })
                });
                promise = await respone.json();
                console.log(promise)
                getPostingsData();
            } catch (error) {
                console.log(error)
            }


    }

    function cancelEdit() {
        setEditTitle(title);
        setEditDescription(description);
        setEditDelivery(willDeliver);
        setEditLocation(location);
        setEditPrice(price)
        setEditShown(!editShown)
    }

    return (
        <div className="detailContainer">
            <div className={!editShown ? "detailDivShown" : "detailDivHidden"}>
                <p className="detailLabel detailTitle"><span className="detailData"> {editTitle}</span></p>
                <p className="detailLabel detailAuthor">Author: <span className="detailData">{username}</span></p>
                <p className="detailLabel detailDescription"><span className="detailData">{editDescription}</span> </p>
                <p className="detailLabel detailPrice"><span className="detailData">{editPrice == "free" ? "Free" : editPrice}</span></p>
                <p className="detailLabel detailLocation">Location: <span className="detailData">{editLocation}</span></p>
                <p className="detailLabel detailDelivery">Delivery offered: <span className="detailData">{editDelivery ? "True" : "False"}</span></p>
                
                {
                    currentUser._id == userId ? 
                    <div>
                        <button onClick={()=>editClicked()}>Edit post</button>
                        <button value="Delete post" onClick={deleteCurrentPost}>Delete post</button> 
                    </div> : ""
                }
                
            </div>
            <div className={editShown ? "editDivShown" : "editDivHidden"}>
                <form className="editForm">
                    <input type="text" value={editTitle} onChange={(event) =>setEditTitle(event.target.value)}></input>
                    <input type="text" value={editDescription} onChange={(event) => setEditDescription(event.target.value)}></input>
                    <input type="text" value={editPrice} onChange={(event) => setEditPrice(event.target.value)}></input>
                    <input type="text" value={editLocation} onChange={(event) => setEditLocation(event.target.value)}></input>
                    <div>Delivery Available?<input type="checkbox" checked={editDelivery} onChange={() => setEditDelivery(!editDelivery)}></input></div>
                    <input type="submit" value="Save Edit" onClick={(event) => {
                        event.preventDefault();
                        putEdit();
                    }}></input>
                    <input type="submit" value="Canel Edit" onClick={(event) => {
                        event.preventDefault();
                        cancelEdit();
                    }}></input>
                </form>
            </div>
        </div>
    )
}

export default DetailPost;
import react, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MessageSender from "./MessageSender";
import MessageContainer from "./MessageContainer";

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
        setEditShown(!editShown)
        console.log(editShown)
    }

    let [comfirmShown, setConfirmShown] = useState(false);

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
        setConfirmShown(false)
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
                    <div className="detailButtonContainer">
                        <button onClick={()=>editClicked()}>Edit post</button>
                        <button value="Delete post" onClick={()=>setConfirmShown(true)} className={comfirmShown ? "deleteHidden": ""}>Delete post</button> 
                        <button onClick={deleteCurrentPost} className={comfirmShown ? "confirmShown": "confirmHidden"}>Confirm Delete</button>
                    </div> : ""
                }
                
            </div>
            <div className={editShown ? "editDivShown" : "editDivHidden"}>
                <form className="editForm">
                    <input type="text" className="editInput" value={editTitle} onChange={(event) =>setEditTitle(event.target.value)}></input>
                    <input type="text" className="editInput" value={editDescription} onChange={(event) => setEditDescription(event.target.value)}></input>
                    <input type="text" className="editInput" value={editPrice} onChange={(event) => setEditPrice(event.target.value)}></input>
                    <input type="text" className="editInput" value={editLocation} onChange={(event) => setEditLocation(event.target.value)}></input>
                    <div className="editInput">Delivery Available?<input type="checkbox" checked={editDelivery} onChange={() => setEditDelivery(!editDelivery)}></input></div>
                    <input className="editButton" type="submit" value="Save Edit" onClick={(event) => {
                        event.preventDefault();
                        putEdit();
                    }}></input>
                    <input type="submit" className="editButton" value="Canel Edit" onClick={(event) => {
                        event.preventDefault();
                        cancelEdit();
                    }}></input>
                </form>
            </div>
            {
                    currentUser._id == userId ?  <MessageContainer currentUser={currentUser} postId={_id} BASE_URL={BASE_URL}/> : <MessageSender currentUser={currentUser} postId={_id} BASE_URL={BASE_URL}/>
            }
        </div>
    )
}

export default DetailPost;
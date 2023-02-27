import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPost = (props) => {
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newLocation, setNewLocation ] = useState("");
    const [newDeliveryAvail, setNewDeliveryAvail] = useState(false);

    let newPost = {
        location: newLocation,
        willDeliver: newDeliveryAvail,
        description: newDescription,
        title: newTitle,
        price: newPrice,
        author: {
            username: "tester",
            id: 0
        },
        _id : 0
    }

    let TOKEN_STRING_HERE = 0;

    let navigate = useNavigate();

    const {BASE_URL, setPostings, postings} = props;

    async function putNewPost () {
        try {
            const respose = await fetch(`${BASE_URL}/posts`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TOKEN_STRING_HERE}`
                },
                body: JSON.stringify({
                    post: {
                        title: newTitle,
                        description: newDescription,
                        price: newPrice,
                        willDeliver: newDeliveryAvail
                    }
                })
            })
            const data = respose.json();
            console.log(data);
        } catch (error) {
            console.log(error)
        }
        
        setPostings([...postings, newPost])
        navigate("/")
        
    }

    return (
        <form >
            <input type="text" placeholder="Post Title" onChange={(event) => setNewTitle(event.target.value)} value={newTitle}></input>
            <textarea type="text" placeholder="Post Description" col="3" onChange={(event) => setNewDescription(event.target.value)} value={newDescription}></textarea> 
            <input type="text" placeholder="Price" onChange={(event) => setNewPrice(event.target.value)} value={newPrice}></input>
            <input type="text" placeholder="Location" onChange={(event) => setNewLocation(event.target.value)} value={newLocation}></input>
            Delivery Available? <input type="checkbox" onChange={() => {
                setNewDeliveryAvail(!newDeliveryAvail)
                }}></input>
            <input type="submit" value="Add Post" onClick={(event) =>{
                event.preventDefault();
                if(!newTitle.length){
                    event.target.classList.add("errorMessage");
                    event.target.value = "Enter a title";
                    setTimeout(()=>{
                        event.target.classList.remove("errorMessage");
                        event.target.value = "Add post";
                    }, 500)
                } else if(!newDescription.length){
                    event.target.classList.add("errorMessage");
                    event.target.value = "Enter a description";
                    setTimeout(()=>{
                        event.target.classList.remove("errorMessage");
                        event.target.value = "Add post";
                    }, 500)
                } else if(!newPrice.length){
                    event.target.classList.add("errorMessage");
                    event.target.value = "Enter a price";
                    setTimeout(()=>{
                        event.target.classList.remove("errorMessage");
                        event.target.value = "Add post";
                    }, 500)
                } else if(!newLocation.length){
                    event.target.classList.add("errorMessage");
                    event.target.value = "Enter a location";
                    setTimeout(()=>{
                        event.target.classList.remove("errorMessage");
                        event.target.value = "Add post";
                    }, 500)
                } else {
                    putNewPost();
                }
            }}></input> 
        </form>
    )
}

export default NewPost;
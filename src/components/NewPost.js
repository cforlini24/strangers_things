import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPost = (props) => {
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newLocation, setNewLocation ] = useState("");
    const [newDeliveryAvail, setNewDeliveryAvail] = useState(false);

    let localToken = localStorage.getItem("token")

    let navigate = useNavigate();

    const {BASE_URL, setPostings, postings} = props;

    async function putNewPost () {
        if(newLocation.length){try {
            const respose = await fetch(`${BASE_URL}/posts`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localToken}`
                },
                body: JSON.stringify({
                    post: {
                        title: newTitle,
                        description: newDescription,
                        price: newPrice,
                        willDeliver: newDeliveryAvail,
                        location: newLocation
                    }
                })
            })
            const data = await respose.json();
            console.log(data.data.post)
            setPostings([...postings, data.data.post])
        } catch (error) {
            console.log(error)
        }
        navigate("/")
        }else {
            try {
                const respose = await fetch(`${BASE_URL}/posts`,{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localToken}`
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
                const data = await respose.json();
                console.log(data.data.post)
                setPostings([...postings, data.data.post])
            } catch (error) {
                console.log(error)
            }
        navigate("/")
        }
    }

    function postButtonReset (event) {
        setTimeout(()=>{
            event.target.classList.remove("errorMessage");
            event.target.value = "Add Post";
        }, 500)
    }

    return (
        <div id="newPostContainer">
            <h3>New Post</h3>
            <div className="inputContainer">
            <form >
                <input type="text" placeholder="Post Title" onChange={(event) => setNewTitle(event.target.value)} value={newTitle} className="newPostInput"></input>
                <textarea type="text" placeholder="Post Description" col="3" onChange={(event) => setNewDescription(event.target.value)} value={newDescription}className="newPostInput"></textarea> 
                <input type="text" placeholder="Price" onChange={(event) => setNewPrice(event.target.value)} value={newPrice}className="newPostInput"></input>
                <input type="text" placeholder="Location (Optional)" onChange={(event) => setNewLocation(event.target.value)} value={newLocation}className="newPostInput"></input>
                <div className="newPostInput">
                    Delivery Available? <input type="checkbox" onChange={() => {
                    setNewDeliveryAvail(!newDeliveryAvail)
                    }}></input>
                </div>
                <input className="newPostBttn" type="submit" value="Add Post" onClick={(event) =>{
                    event.preventDefault();
                    if(!newTitle.length){
                        event.target.classList.add("errorMessage");
                        event.target.value = "Enter a title";
                        postButtonReset(event);
                    } else if(!newDescription.length){
                        event.target.classList.add("errorMessage");
                        event.target.value = "Enter a description";
                        postButtonReset(event);
                    } else if(!newPrice.length){
                        event.target.classList.add("errorMessage");
                        event.target.value = "Enter a price";
                        postButtonReset(event);
                    } else {
                        putNewPost();
                    }
                }}></input> 
            </form>
            </div>
        </div>
    )
}

export default NewPost;
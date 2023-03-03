import react from "react";
import { useState } from "react";

const MessageSender = (props) => {
    const {currentUser, postId, BASE_URL} = props;

    const [messageFormShown, setMessageFormShown] = useState(false);
    const [messageContent, setMessageContent] = useState("");
    const [messageSent, setMessageSent] = useState(false);

    async function putMessage(){
        try {
            const respone = await fetch(`${BASE_URL}/posts/${postId}/messages`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    message: {
                        content: messageContent
                    }
                })
            })
            const promise = await respone.json();
            promise.success ? alert("Message sent successfully"): alert("Message failure")
        } catch (error) {
            console.log(error)
        }
    }

    if (!currentUser.username) return(
        <div className="detailButtonContainer">Login or register to message</div>
    )
    
    return (
        <div className="detailButtonContainer"> 
        {
            !messageFormShown ? <button onClick={()=>setMessageFormShown(true)}>Message User</button>: 
            <form className="messageForm">
                <textarea id="messageTextArea" autoFocus type="text" col="5" rows="5" onChange={(event)=> setMessageContent(event.target.value)}></textarea>
                <input id="messageSubmitButton" type="submit" value="Send Message"onClick={(event)=> {
                    event.preventDefault();
                    putMessage();
                    setMessageFormShown(false)
                    }}></input>
            </form>
        }
        </div>
        
    )
}

export default MessageSender;
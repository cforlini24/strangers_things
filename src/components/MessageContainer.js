import react from "react";

const MessageContainer = (props) => {
    let {currentUser, postId, BASE_URL} = props;
    

    return(
        <div className="messageContainer">
            <h3>Messages</h3>
            <div className="threadContainer">
            {
                currentUser.messages.map((message) => {
                    if(message.post._id == postId){
                        return(
                            <div className="individualMessage" key={message._id}>
                                <p className="fromLabel">From: {message.fromUser.username}</p>
                                <p>{message.content}</p>
                            </div>
                        )
                    }
                })
            }
            </div>
        </div>
    )
}

export default MessageContainer;
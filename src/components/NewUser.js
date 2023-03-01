import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewUser = (props) => {
    const {BASE_URL, setLoggedIn, setCurrentUser} = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function putNewUser() {
        
        try {
            const respone = await fetch(`${BASE_URL}/users/register`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password
                    }
                })
            })
            const promise = await respone.json();

            if(!promise.success){
                alert(promise.error.message)
            } else{
                localStorage.setItem("token", promise.data.token)
                let token = localStorage.getItem("token");
                async function getCurrentUser() {
                    try {
                      const response = await fetch(`${BASE_URL}/users/me`,{
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
                        }                      
                      })
                      const promise = await response.json();
                      setCurrentUser(promise.data);
                    } catch (error) {
                      console.log(error)
                    }
                  }
                getCurrentUser();
                setLoggedIn(true);
                navigate("/")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div id="newUserContainer">
            <div className="inputContainer" id="newUserFormContainer"> 
                <form id="newUserForm">
                    <input type="text" placeholder="Username" value={username} onChange={(event) => {
                        setUsername(event.target.value);
                    }}></input>
                    <input type="text" placeholder="Password" value={password} onChange={(event) => {
                        setPassword(event.target.value);
                    }}></input>
                    <input type="submit" value="Create Account" id="createAccountButton"
                    onClick={(event) => {
                        event.preventDefault();
                        putNewUser()
                    }}></input>
                </form>
            </div>
        </div>
    )
}

export default NewUser;
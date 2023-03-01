import react, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const {BASE_URL, setLoggedIn, setCurrentUser} = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function postUserLogin () {
        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
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
            });
            const promise = await response.json();
            if(!promise.success){
              console.log(promise)
                alert(promise.error.message)
            } else{
                localStorage.setItem("token", promise.data.token)
                let token = localStorage.getItem("token")
                async function getCurrentUser() {
                  try {
                    const response = await fetch(`${BASE_URL}/users/me`,{
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                      }                      
                    })
                    const promise = await response.json();
                    console.log(promise.data)
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
            console.error(error);
          }
    }

    const navigate = useNavigate();
    return(
        <div className="inputContainer">
            <form >
            <input type="text" placeholder="Username" value={username} onChange={(event) => {
                        setUsername(event.target.value);
                    }}></input>
                    <input type="text" placeholder="Password" value={password} onChange={(event) => {
                        setPassword(event.target.value);
                    }}></input>
                    <input type="submit" value="Create Account" id="createAccountButton"
                    onClick={(event) => {
                        event.preventDefault();
                        postUserLogin()
                    }}></input>
            </form>
        </div>
    )
}

export default Login;
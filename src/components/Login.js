import react, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const {BASE_URL} = props;

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
                alert("Login Failed")
            } else{
                localStorage.setItem("token", promise.data.token)
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
import { useState, useEffect } from "react";
import {createRoot} from "react-dom/client";
import { Main, NewPost, Nav, DetailPost, SearchBar, NewUser, Login, Profile} from "./components";
import { BrowserRouter,Route, Routes, Link } from "react-router-dom";


const App = () =>{
    const COHORT_NAME = "2301-FTB-MT-WEB-FT";
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
    const [postings, setPostings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentUser, setCurrentUser] = useState({})
    
    let localToken = localStorage.getItem("token");
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") != null);
    

    async function getPostingsData () {
        try {
            let respose = await fetch(`${BASE_URL}/posts`)
            let data = await respose.json();
            setPostings(data.data.posts)
        } catch (error) {
            console.log(error)
        }
    }
    async function getCurrentUser() {
        if(localToken != undefined){
            try {
                const response = await fetch(`${BASE_URL}/users/me`,{
                        headers: {
                             "Content-Type": "application/json",
                            "Authorization": `Bearer ${localToken}`
                        }                      
                    })
                const promise = await response.json();
                setCurrentUser(promise.data);
            } catch (error) {
                console.log(error)
            }
        }
        
      }

    useEffect(()=>{
        getPostingsData();
        getCurrentUser();
    } ,[])

    return (
        <BrowserRouter>
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
            <Routes>
                <Route path="/newuser" element={<NewUser BASE_URL={BASE_URL} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser}/>} />
                <Route path="/" element={<Main postings={postings} searchTerm={searchTerm} setSearchTerm={setSearchTerm} getPostingsData={getPostingsData}/>} />
                <Route path="/:postId" element={<DetailPost postings={postings} setPostings={setPostings} BASE_URL={BASE_URL} getPostingsData={getPostingsData} currentUser={currentUser}/>} />
                <Route path="/profile" element={<Profile currentUser={currentUser} getCurrentUser={getCurrentUser}/>} />
                <Route path="/newpost" element={<NewPost BASE_URL={BASE_URL} setPostings={setPostings} postings={postings}/>} />
                <Route path="/login" element={<Login BASE_URL={BASE_URL} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser}/>} />
            </Routes>
            
        </BrowserRouter>
    )
}

let appElt = document.getElementById("app");
let root = createRoot(appElt);
root.render(<App />);
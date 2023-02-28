import { useState, useEffect } from "react";
import {createRoot} from "react-dom/client";
import { Main, NewPost, Nav, DetailPost, SearchBar } from "./components";
import { BrowserRouter,Route, Routes, Link } from "react-router-dom";


const App = () =>{
    const COHORT_NAME = "2301-FTB-MT-WEB-FT"
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`
    const [postings, setPostings] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    async function getPostingsData () {
        try {
            let respose = await fetch(`${BASE_URL}/posts`)
            let data = await respose.json();
            console.log(data.data.posts)
            setPostings(data.data.posts)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getPostingsData();
    } ,[])

    return (
        <BrowserRouter>
        <Nav />
            <Routes>
                <Route path="/" element={<Main postings={postings} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>} />
                <Route path="/:postId" element={<DetailPost postings={postings}/>} />
                <Route path="/newpost" element={<NewPost BASE_URL={BASE_URL} setPostings={setPostings} postings={postings}/>} />
            </Routes>
            
        </BrowserRouter>
    )
}

let appElt = document.getElementById("app");
let root = createRoot(appElt);
root.render(<App />);
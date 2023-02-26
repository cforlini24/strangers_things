import { useState, useEffect } from "react";
import {createRoot} from "react-dom/client";
import { Main } from "./components";


const App = () =>{
    const COHORT_NAME = "2301-FTB-MT-WEB-FT"
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`
    const [postings, setPostings] = useState([])

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
        <Main postings={postings}/>
    )
}

let appElt = document.getElementById("app");
let root = createRoot(appElt);
root.render(<App />);
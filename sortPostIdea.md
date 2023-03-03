
[postings, setPostings] = useState({})
[sortBy, setSortBy] = useState("Date: Oldest to Newest")
[sortedPosts, setSortedPosts] = useState([...postings])


function sortPosts(){
    if(sortBy == "Date: Oldest to Newest"){
        setSortedPosts([...postings])
    }else if( sortBy == "Date: Newest to Oldest"){
        let tempSort = sortedPosts
        tempSort.sort((a,b)=>{
            if(a.createdAt > b.createdAt) return -1
            if(a.createdA < b.createdAt) return 1
            return 0 
        })
        setSortedPosts(tempSort)
    }
}

useEffect(()=>{
    sortPosts()
},[sortBy])


<select selected="sortBy" onChange((e)=>setSortBy(e.target.value))>
    <option value="Date: Oldeest to newest">"Date: Oldest to newest"</>
    <option value="Date: Newest to Oldest">"Date: Newest to oldest" </>
/>


{
    sortedposts.map(()=>{...})
}
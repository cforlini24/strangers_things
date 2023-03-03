import react from "react";

const SearchBar = (props) => {
    const {searchTerm, setSearchTerm} = props;



    return(
        <input id="searchBar" 
            type="text" 
            placeholder="Search post title" 
            value={searchTerm}
            onChange={(event) => {
                setSearchTerm(event.target.value);
            }}
            ></input>
    )
}

export default SearchBar;
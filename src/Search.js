import React from "react";
import { useGlobalContext } from "./context";

const Search = () =>{
    const {query, searchPost} = useGlobalContext();
 
    return(
        <>
        
           <h1>Tech News On The Go</h1>
        
           <form>
            <div>
                <input type="text" placeholder="search here"
                    value={query}
                    onChange={(e) => searchPost(e.target.value)}
                />
            </div>
           </form>
        </>
    );
};
export default Search;
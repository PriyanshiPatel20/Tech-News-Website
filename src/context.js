// import { children, useContext } from "react";

import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import { type } from "@testing-library/user-event/dist/type";

let API = "https://hn.algolia.com/api/v1/search?query=interview";
const initialState = {
 isLoading : true,
    query : "INTERVIEW",
    nbPages: 0,
    page : 0,
    hits:[],

};
const AppContext = React.createContext(); // context cretion
// to create a provider function

const AppProvider = ({ children }) => {

        // const [state, setstate] = useState(initialState);

        const [state, dispatch] = useReducer(reducer,initialState);
       

    const fecthApiData = async (url) => {
        dispatch({ type: "SET_LOADING" });
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            dispatch({ 
                type: "GET_STORIES",
                payload:{
                    hits:data.hits,
                    nbPages:data.nbPages,
                },
            });
            // isLoading = false;
        }catch (error){
            console.log(error);
        }
    };
    useEffect(()=> {
        fecthApiData(`${API}query=${state.query}&page=${state.page}`);
    }, []);

     
    // to remove the post
    const removePost = (post_ID) =>{
        dispatch({ type: "REMOVE_POST", payload:post_ID });
    };

    //search
    const searchPost = (searchQuery) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: searchQuery,
            
        });
    };

    //pagination
    const getNextPage = () =>{
        dispatch({
            type:"NEXT_PAGE",
        });
    }
    const getPrevPage = () =>{
        dispatch({
            type:"PREV_PAGE",
        });
    }

    //to call tech api func
    useEffect(()=> {
        fecthApiData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query, state.page]);

    return (<AppContext.Provider value={{  ...state, removePost, searchPost, getNextPage,getPrevPage }}>
        {children}
    </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext};
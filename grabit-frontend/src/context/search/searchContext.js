import axios from 'axios';
import {useState,createContext,useContext,useEffect} from 'react'

const SearchContext = createContext();
const SearchProvider = ({children})=>
{
    const [values,setValues] = useState
    ({
        keyword: "",
        results : []
    });
    
    return (

        <SearchContext.Provider value={[values,setValues]}>
            {children}
        </SearchContext.Provider>
    )
}

const useSearch = ()=> useContext(SearchContext);

export {SearchProvider,useSearch}

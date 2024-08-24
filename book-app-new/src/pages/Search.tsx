import '../styles/Search.css'
import { FaSearch } from "react-icons/fa";
import { useState, useEffect} from 'react';
import axios from 'axios'
import {book} from '../types'
import BookThumbnail from '../components/BookThumbnail';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'



const Search =  () =>{

    const [bookQuery, setBookQuery] = useState('')
    const [queryType, setQueryType] = useState('books')  //books or groups
    const [queryResults, setQueryResults] = useState([] as book[])
    const [queryIsLoading, setQueryIsLoading] = useState(false) 

    const handleQuerySubmit = async (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter'){
            return
        }

        setQueryIsLoading(true)
        const {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookQuery}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=40`)
        setQueryResults(data.items)
        setQueryIsLoading(false)


    }
    
    

    return(
    
    <div className="search-page-container" style={{overflowY:'scroll', width:'calc(100% - 300px)', wordWrap:'break-word', paddingBottom:'20px'}}>
        <div className='search-bar-container' style={{marginTop:'20px'}}>
            <FaSearch size={16} style={{position:'absolute', left:'10px', top:'7px'}}></FaSearch>
            <input placeholder='Search' value={bookQuery} onKeyDown={(e) => handleQuerySubmit(e)} onChange={(e) => setBookQuery(e.target.value)} type="text" className="search-bar"></input>
            <select className='drop-down pointer-on-hover' onChange={(e) =>setQueryType(e.target.value)} style={{position:'absolute',borderTopRightRadius:'6px', borderBottomRightRadius:'6px', right:'10px', top:'2px',border:'none', borderLeft:'black solid 1px', height:'calc(100% - 4px)'}}>
                <option className='pointer-on-hover' value={"books"}>BOOKS</option>
                <option className='pointer-on-hover' value={"groups"}>GROUPS</option>
            </select>
        </div>

            { queryIsLoading ? 

                    <div className='progress-container'>

                        <CircularProgress></CircularProgress>
                    </div>
                
                :   
                <div className='book-results'>
                    {queryResults.map((bookResult, index) => 
                        <BookThumbnail {...bookResult} key={index}></BookThumbnail>
                        )}
                </div>
            }

    </div>)
}

export default Search
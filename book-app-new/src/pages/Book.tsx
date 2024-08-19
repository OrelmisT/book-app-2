import { book } from "../types"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import BookThumbnail from "../components/BookThumbnail"
import '../styles/Book.css'

const Book = () =>{
    const [book, setBook] = useState({} as book)

    const {state} = useLocation()

    useEffect(()=>{
        console.log(state?.book)
        if(state?.book){
            setBook(state.book)
        }

    },[])

    return(
        <>
            <div style={{overflowY:'scroll', width:'calc(100% - 300px)', wordWrap:'break-word', paddingBottom:'20px'}}>
                <div className="book-info-panel">
                    <div className="book-image-container">
                        <img src={book?.volumeInfo?.imageLinks?.thumbnail || book?.volumeInfo?.imageLinks?.smallThumbnail}></img>
                    </div>
                    <div className="book-description">
                        <h2 style={{marginTop:'20px'}}>{book?.volumeInfo?.title}</h2>
                        <h4>{book?.volumeInfo?.authors}</h4>
                        <p>{book?.volumeInfo?.description}</p>

                    </div>


                </div>
            </div>
        </>

    )







}

export default Book
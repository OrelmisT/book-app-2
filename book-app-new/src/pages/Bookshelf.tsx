import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { book } from "../types"
import BookThumbnail from "../components/BookThumbnail"
import { CircularProgress } from "@mui/material"

const Bookshelf = ()=>{
    const axiosPrivate = useAxiosPrivate()
    const [bookList, setBookList] = useState([] as book[])
    const [isLoading, setIsLoading] = useState(true)


    const getBookList = async () =>{
        const {data}=  await axiosPrivate.get('/bookshelves')
        console.log(data)
        console.log(data.bookshelf.bookList as book[])
        setBookList(data.bookshelf.bookList as book[])
        setIsLoading(false)
    }

    useEffect( ()=>{
       getBookList()

    },[])


    return (
        <div style={{overflowY:'scroll', width:'calc(100% - 300px)', wordWrap:'break-word', paddingBottom:'20px'}}>
            {isLoading ?

                    <div className='progress-container'>

                    <CircularProgress></CircularProgress>
                    </div>
            
            : <div className='book-results'>

                {bookList.map((book, index) => <BookThumbnail key={index} bookResult={book} userBookList={bookList} setBookList={setBookList}></BookThumbnail>)}
                
                
                </div>}
        </div>
    )
}

export default Bookshelf
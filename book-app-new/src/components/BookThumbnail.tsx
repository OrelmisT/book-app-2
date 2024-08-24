import { book } from "../types"
import '../styles/BookThumbnail.css'
import { useNavigate } from "react-router-dom"
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { TbShoppingBag } from "react-icons/tb";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";



const BookThumbnail = ({bookResult, userBookList, setBookList}:{bookResult:book, userBookList:book[], setBookList:React.Dispatch<React.SetStateAction<book[]>>}) =>{

    const axiosPrivate = useAxiosPrivate()
    const [isInUserList, setIsInUserList] = useState(false)

    const nav = useNavigate()

    const goToBook = () =>{
        nav(`/books/${bookResult.id}`,  {state:{book:bookResult}})

    }

    useEffect(()=>{
       setIsInUserList(userBookList.some((book)=> book.id === bookResult.id))

    }, [])

    

    const openBuyLink = () =>{
        window.open(bookResult.saleInfo.buyLink,'_blank')
    }

    const addBookToReadingList = () => {
        
        axiosPrivate.post('/bookshelves/books', {book:bookResult})
        setIsInUserList(true)

    }

    const removeFromReadingList = () => {
        axiosPrivate.delete(`/bookshelves/books/${bookResult.id}`)
        setBookList(prev=>prev.filter((book) => book.id !== bookResult.id))
        setIsInUserList(false)
    }

    return(
        <div className='thumbnail'>
                <div className='image-container'>
                    <img  onClick={() => goToBook()} src={(bookResult.volumeInfo.imageLinks?.thumbnail || bookResult.volumeInfo.imageLinks?.smallThumbnail) || 'public/no-image-available.jpg'}></img>
                </div>
                <div className='book-info'>
                    <h4 onClick={()=>goToBook()}>{bookResult.volumeInfo.title}</h4>
                    <p>{`${(bookResult.volumeInfo?.authors && bookResult.volumeInfo?.authors[0]) || ''}${bookResult.volumeInfo?.authors && bookResult.volumeInfo?.publishedDate ? ' | ':''}${bookResult.volumeInfo?.publishedDate ? `${bookResult.volumeInfo?.publishedDate.substring(0,4)}` : '' }`}</p>
                    <br></br>
                    <div className="book-description-container">
                        <p>{bookResult.volumeInfo?.description}</p>
                    </div>
                    <div className="interaction">
                        <div className="save">
                            {isInUserList ? 
                            <button onClick={() => removeFromReadingList()} className="add-bookshelf-button">
                            <IoIosRemoveCircleOutline  size={15}style={{position:'absolute', left:'10px', top:'10px'}}></IoIosRemoveCircleOutline>
                            Remove From Bookshelf</button> 
                            :<button onClick={() => addBookToReadingList()} className="add-bookshelf-button">
                                <IoIosAddCircleOutline  size={15}style={{position:'absolute', left:'10px', top:'10px'}}></IoIosAddCircleOutline>
                                Add To Bookshelf</button>}
                            {bookResult.saleInfo.buyLink && <button onClick={() => openBuyLink()} className="buy-button">
                                <TbShoppingBag size={15} style={{position:'absolute', left:'10px', top:'10px'}}></TbShoppingBag>
                                
                                Buy
                            </button>}

                        </div>
                        <div className="ratings">

                        </div>

                    </div>
                </div>
            </div>
    )


}

export default BookThumbnail

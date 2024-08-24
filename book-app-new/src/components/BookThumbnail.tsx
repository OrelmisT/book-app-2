import { book } from "../types"
import '../styles/BookThumbnail.css'
import { useNavigate } from "react-router-dom"
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbShoppingBag } from "react-icons/tb";



const BookThumbnail = (bookResult:book) =>{



    const nav = useNavigate()

    const goToBook = () =>{
        nav(`/books/${bookResult.id}`,  {state:{book:bookResult}})

    }

    

    const openBuyLink = () =>{
        window.open(bookResult.saleInfo.buyLink,'_blank')
    }

    const addBookToReadingList = () => {
        
        return

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
                            <button className="add-bookshelf-button">
                                <IoIosAddCircleOutline  size={15}style={{position:'absolute', left:'10px', top:'10px'}}></IoIosAddCircleOutline>
                                Add To Bookshelf</button>
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

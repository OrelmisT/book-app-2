import { book } from "../types"
import '../styles/BookThumbnail.css'
import { useNavigate } from "react-router-dom"

const BookThumbnail = (bookResult:book) =>{

    const nav = useNavigate()

    return(
        <div className='thumbnail' onClick={() => {nav(`/books/${bookResult.id}`,  {state:{book:bookResult}})}} style={{ backgroundSize:'cover', width:'128px', marginBottom:'20px', height:'192px'}}>
                <div className='image-container'>
                    {/* <h1>{bookResult.volumeInfo.title}</h1> */}
                    <img src={bookResult.volumeInfo.imageLinks?.thumbnail || bookResult.volumeInfo.imageLinks?.smallThumbnail}></img>
                </div>
                <div className='book-info'>
                    <h4>{bookResult.volumeInfo.title}</h4>
                    <p>{bookResult.volumeInfo?.authors && bookResult.volumeInfo?.authors[0]}</p>
                </div>
            </div>
    )


}

export default BookThumbnail

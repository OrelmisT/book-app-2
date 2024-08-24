import {Router} from 'express'
import { verifyJWT } from '../auth/jwt'
import { collection, where, getDocs, query, addDoc, arrayUnion, updateDoc, arrayRemove  } from 'firebase/firestore'
import {db} from '../firebase_config'
import { book } from '../types'

const router = Router()

//get user's reading list
router.get('/', verifyJWT, async(req, res) =>{
    // @ts-ignore
    const userEmail = req.email

    //check if user exists
    const q = query(collection(db, 'users'), where('email', '==',  userEmail))
    const query_snaphot = await getDocs(q)

    const stored_user = query_snaphot.docs[0]?.data()

    if(!stored_user){
        res.status(404).json({'error':'User not found'})
        return
    }

    const q_2 = query(collection(db, 'bookshelves'), where('email', '==',  userEmail))
    const query_snaphot2 = await getDocs(q_2)
    const stored_bookshelf = query_snaphot2.docs[0]

    if(!stored_bookshelf){
        //create new bookshelf
        await addDoc(collection(db, 'bookshelves'), {email:userEmail, bookList:[]})
        res.status(200).json({bookshelf: {email:userEmail, bookList:[]}})
        return
    }
    else{
        //return existing bookshelf
        res.status(200).json({bookshelf: stored_bookshelf.data()})
    }

})


//add book to user's reading list
router.post('/books', verifyJWT, async(req, res) => {

    //email set by verifyJWT
    // @ts-ignore
    const userEmail = req.email
    const book = req.body.book

    if(!book){
        //bad request
        res.status(400).json({'error':'Bad request'})
    }


    //check if user exists
    const q = query(collection(db, 'users'), where('email', '==',  userEmail))
    const query_snaphot = await getDocs(q)

    const stored_user = query_snaphot.docs[0]?.data()

    if(!stored_user){
        res.status(404).json({'error':'User not found'})
        return
    }

    const q_2 = query(collection(db, 'bookshelves'), where('email', '==',  userEmail))
    const query_snaphot2 = await getDocs(q_2)
    const stored_bookshelf = query_snaphot2.docs[0]

    if(!stored_bookshelf){
        //create new bookshelf
        await addDoc(collection(db, 'bookshelves'), {email:userEmail, bookList:[book]})
        res.sendStatus(201)
        return
    }

    else{
        //append bookId to bookshelf list2
        await updateDoc(stored_bookshelf.ref,{bookList: arrayUnion(book)} ) 
        res.sendStatus(201)
        return
    }

})

router.delete('/books/:bookId', verifyJWT, async (req, res) => {
    //email set by verifyJWT
    // @ts-ignore
    const userEmail = req.email
    const bookId = req.params.bookId

    //check if user exists
    const q = query(collection(db, 'users'), where('email', '==',  userEmail))
    const query_snaphot = await getDocs(q)

    const stored_user = query_snaphot.docs[0]?.data()

    if(!stored_user){
        res.status(404).json({'error':'User not found'})
        return
    }

    const q_2 = query(collection(db, 'bookshelves'), where('email', '==',  userEmail))
    const query_snaphot2 = await getDocs(q_2)
    const stored_bookshelf = query_snaphot2.docs[0]

    if(!stored_bookshelf){
        res.status(404).json({'error':'Bookshelf not found'})
        return
    }

    const updatedBookList = (stored_bookshelf.data().bookList || []).filter((book: book) => book.id !== bookId)


    await updateDoc(stored_bookshelf.ref,{bookList: updatedBookList} )
    res.sendStatus(200) 

})



export default router
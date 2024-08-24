import {Router} from 'express'
import { verifyJWT } from '../auth/jwt'

const router = Router()

router.post('/reading_list', verifyJWT, (req, res) => {

    //email set by verifyJWT
    const userEmail = req.email
    const book_id = req.body.book_id

    

    



})



export default router
import express from "express";
import dotenv from 'dotenv'
import {db} from '../firebase_config'
import {collection, addDoc} from "firebase/firestore";
import {hash} from 'bcrypt'
dotenv.config()

const router = express.Router()


router.post('/signUp', async (req,res) => {

    
    const user = req.body
    console.log(user)
    if (!user?.email || !user?.password){
        res.status(400).json({'error':'Bad request'})
        return
    }
    const hashed_password = await hash(user.password, 10)
    await addDoc(collection(db, 'users'), {email:user.email, password:hashed_password}) 
    res.status(200).json({user: {email:user.email, password:hashed_password}})
    // const accessSecretKey = process.env.ACCESS_TOKEN_SECRET
    // const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET
    

})

export default router
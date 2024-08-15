import express from "express";
import dotenv from 'dotenv'
import {db} from '../firebase_config'
import {collection, addDoc, query, where, getDocs} from "firebase/firestore";
import {hash, compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()

const router = express.Router()


router.post('/signUp', async (req,res) => {

    
    const user = req.body
    console.log(user)
    if (!user?.email || !user?.password){
        res.status(400).json({'error':'Bad request'})
        return
    }

    const q = query(collection(db, 'users'), where('email', '==',  user.email))
    const query_snaphot = await getDocs(q)

    const stored_user = query_snaphot.docs[0]?.data()

    if(stored_user){
        res.status(409).json({error: "An account is already registered with this email"})
        return
    }

    const accessToken = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET || '', {expiresIn: '60s'})
    const refreshToken = jwt.sign({email: user.email}, process.env.REFRESH_TOKEN_SECRET || '', {expiresIn: '1d'})



    const hashed_password = await hash(user.password, 10)
    await addDoc(collection(db, 'users'), {email:user.email, password:hashed_password}) 
    res.status(200).cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 *1000, sameSite:'none', secure:true})
    .json({user: {email:user.email, password:hashed_password}, accessToken})
    
    
    // const accessSecretKey = process.env.ACCESS_TOKEN_SECRET
    // const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET
    

})

router.post('/login', async (req, res) => {
    const user = req.body
    console.log(user)
    if (!user?.email || !user?.password){
        res.status(400).json({'error':'Bad request'})
        return
    }

    const q = query(collection(db, 'users'), where('email', '==',  user.email))
    const query_snaphot = await getDocs(q)

    const stored_user = query_snaphot.docs[0]?.data()

    if(!stored_user){
        res.status(404).json({'error':'Account not found'})
        return
    }
    
    const correct_password=  await compare(user.password, stored_user.password)
    console.log(correct_password)
    if(!correct_password){
        res.status(401).json({'error':'Incorrect password'})
        return
    }



    res.sendStatus(200)
})

export default router
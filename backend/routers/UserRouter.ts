import express from "express";
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()


router.post('/signUp', (req,res) => {

    const user = req.body
    const accessSecretKey = process.env.ACCESS_TOKEN_SECRET
    const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET
    res.send(accessSecretKey)

})

export default router
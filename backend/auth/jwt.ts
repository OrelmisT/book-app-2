// @ts-nocheck
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if(!authHeader?.startsWith('Bearer')) return res.sendStatus(401)
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
        console.log(decoded)
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        next()
    })

}

export const refreshJWT = (req, res) =>{
    const email = req.body.email
    const cookies = req.cookies 
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt
    console.log(refreshToken)
    console.log(cookies)
    console.log(email)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        console.log(decoded)
        if(err || email !== decoded.email) return res.sendStatus(403)
        const accesToken = jwt.sign({email:decoded.email}, process.env.ACCESS_TOKEN_SECRET || '', {expiresIn: '30s'})
        res.json({accesToken})
    })

}




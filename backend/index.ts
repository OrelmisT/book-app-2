import express from 'express'
import cors from 'cors'
import AuthRouter from './routers/AuthRouter'
import UserRouter from './routers/UserRouter'
import cookieParser from 'cookie-parser'


const port = 4000

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('HELLO WORLD!')
})


app.use('/auth', AuthRouter)

app.use('/users', UserRouter)


app.listen(port, () =>{
    console.log(`Server listening on port ${port}`)
})



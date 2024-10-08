import express from 'express'
import cors from 'cors'
import AuthRouter from './routers/AuthRouter'
import UserRouter from './routers/UserRouter'
import cookieParser from 'cookie-parser'
import BookShelfRouter from './routers/BookShelfRouter'


const port = 4000

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
	credentials: true}
))
app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('HELLO WORLD!')
})


app.use('/auth', AuthRouter)

app.use('/users', UserRouter)

app.use('/bookshelves', BookShelfRouter)


app.listen(port, () =>{
    console.log(`Server listening on port ${port}`)
})



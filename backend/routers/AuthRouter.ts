import { Router } from "express";

const router = Router()


router.get('/test_auth_router', (req, res) =>{
    res.send('auth router up and running')
})


export default router
import { Router } from "express";
import { refreshJWT, verifyJWT} from "../auth/jwt";

const router = Router()


router.post('/refresh_token', refreshJWT)
router.post('/testverify', verifyJWT, (req, res) => {
    res.send('yes')
})


export default router
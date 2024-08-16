import {useDispatch, useSelector } from "react-redux"
import {login, logout} from '../store/authSlice'
import { useNavigate } from "react-router-dom"
import { UseDispatch } from "react-redux"
import axios from '../axios/axios_config'
import useRefreshToken from "../hooks/useRefreshToken"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

const Discussions = () =>{
    const userId = useSelector((state) => state.auth.email)
    const accessToken = useSelector((state) => state.auth.accessToken)
    const nav = useNavigate()
    const dispatch = useDispatch()
    const refresh = useRefreshToken()
    const axios_private = useAxiosPrivate()

    const signOut = () =>{
        dispatch(logout())
        nav('/login')


    }

    const testJWTVerify = async () => {
        
        const response = await axios_private.post('/auth/testverify')
        console.log(response)
        

    }

    const testRefresh = () =>{
        // console.log(userId)
        refresh()

    }


    return(
    <div style={{overflowY:'scroll', width:'calc(100% - 300px)', wordWrap:'break-word'}}>
        <p style={{wordWrap:'break-word'}}>{userId}</p>
        <p>{accessToken}</p>
        <button onClick={() => testJWTVerify()}>Test JWT Verify</button>
        <button onClick={() => testRefresh()}>Test JWT Refresh</button>
        <button onClick={() => signOut()}>Sign Out</button>
    </div>
    )

}


export default Discussions
import { UseSelector, useDispatch, useSelector } from "react-redux"
import {login, logout} from '../store/authSlice'

const Discussions = () =>{
    const userId = useSelector((state) => state.auth.userId)


    return(<h1>
        {userId}
    </h1>)

}


export default Discussions
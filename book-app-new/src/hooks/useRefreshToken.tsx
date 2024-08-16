import axios from '../axios/axios_config'
import { useDispatch, useSelector} from 'react-redux'
import { login } from '../store/authSlice'


const useRefreshToken = () =>{
    const dispatch = useDispatch()
    const email = useSelector((state) => state.auth.email)


    const refresh = async () =>{
        const {data} = await axios.post('/auth/refresh_token', {email}, {withCredentials:true, secure:true})
        console.log(data)
        dispatch(login({email, accessToken: data.accessToken}))
    }

    return refresh
    

}


export default useRefreshToken
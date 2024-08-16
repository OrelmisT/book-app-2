import { axios_private } from "../axios/axios_config";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector} from "react-redux";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const accessToken = useSelector((state) => state.auth.accessToken)

    useEffect(() => {
        const requestIntercept = axios_private.interceptors.request.use((config) => {
            if(!config.headers['authorization']){
                config.headers['authorization'] = `Bearer ${accessToken}`
            }
            return config
        }, (error) => {
            Promise.reject(error)
        })

        const responseIntercept =  axios_private.interceptors.response.use((response) => response, async(error) =>{
            const prevRequest = error?.config
            if(error?.response?.status === 403 && !prevRequest?.sent){
                prevRequest.sent = true
                const newAccessToken = await refresh()
                prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`
                return axios_private(prevRequest)
            }
            return Promise.reject(error)

        })
   
        return () => {
            axios_private.interceptors.response.eject(responseIntercept)
            axios_private.interceptors.request.eject(requestIntercept)
        }
   
    })




}

export default useAxiosPrivate
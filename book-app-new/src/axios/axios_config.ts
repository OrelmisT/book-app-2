import axios from "axios";


const axios_instance = axios.create({baseURL:import.meta.env.VITE_BASE_URL, withCredentials:true})

export const axios_private = axios.create({baseURL:import.meta.env.VITE_BASE_URL, withCredentials:true})

export default axios_instance
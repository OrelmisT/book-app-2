import React, {useState, createContext} from 'react'
import {auth} from '../types'

const AuthContext = createContext({} as {auth: auth, setAuth:React.Dispatch<React.SetStateAction<auth>>})

export const AuthProvider = ({children}: React.PropsWithChildren) => {

    const [auth, setAuth] = useState({} as auth)

    return(
    <AuthContext.Provider value={{auth, setAuth}}>
        {children}
    </AuthContext.Provider>
    )

}

export default AuthContext


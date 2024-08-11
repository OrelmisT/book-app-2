import useAuth from "../hooks/useAuth";

const Home = () =>{

    const{auth, setAuth} = useAuth()


    return(
        <>
            <h1>{auth.userId}</h1>
            <h1>{auth.accessToken}</h1>
        </>
    )

}

export default Home
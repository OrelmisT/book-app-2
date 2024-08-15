import { useEffect, useState } from 'react';
import '../styles/Login.css'
import { MdOutlineMail } from "react-icons/md";
import { PiPassword } from "react-icons/pi";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import{login} from '../store/authSlice'
import axios from '../axios/axios_config'
import { GoAlertFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";



const Login = () => {

    const [view, setView] = useState('signUp')
    const [signUpPassVisible, setSignUpPassVisible] = useState(false)
    const [signUpPassConfirmVisible, setSignUpPassConfirmVisible] = useState(false)
    const [loginPassVisible, setLoginPassVisible] = useState(false)
    const [emailSignUpInput, setEmailSignUpInput] = useState('')
    const [passwordSignUpInput, setPasswordSignUpInput] = useState('')
    const [confirmPasswordSignUpInput, setConfirmPasswordSignUpInput] = useState('')
    const [emailLoginUpInput, setEmailLoginInput] = useState('')
    const [passwordLoginInput, setPasswordLoginInput] = useState('')
    const [emailSignUpValid, setEmailSignUpValid] = useState(false)
    const [passwordSignUpValid, setPasswordSignUpValid] = useState(false)
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false)
    const [emailLoginValid, setEmailLoginValid] = useState(false)
    const [passwordLoginValid, setPasswordLoginValid] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const nav = useNavigate()
    const dispatch = useDispatch()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    useEffect(()=>{

        setEmailSignUpValid(emailRegex.test(emailSignUpInput))
        
    },[emailSignUpInput])

    useEffect(()=>{

        setPasswordSignUpValid(passwordRegex.test(passwordSignUpInput))

    },[passwordSignUpInput])

    useEffect(()=>{

        setConfirmPasswordValid(confirmPasswordSignUpInput === passwordSignUpInput)

    },[confirmPasswordSignUpInput])

    useEffect(()=>{

        setEmailLoginValid(emailRegex.test(emailLoginUpInput))


    },[emailLoginUpInput])

    useEffect(()=>{
        setPasswordLoginValid(passwordRegex.test(passwordLoginInput))
    },[passwordLoginInput])

    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(login(emailSignUpInput))
        nav('/discussions')

    }

    const handleSignUp = async (e:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
        if(!emailSignUpValid){
            displayErrorMessage('Invalid email format')
            return
        }

        if(!passwordSignUpValid){
            displayErrorMessage('Invalid password format')
            return
        }

        if(!confirmPasswordValid){
            displayErrorMessage('Password confirmation doesn\'t match password')
            return
        }

        try{
            await axios.post('/users/signup', {email: emailSignUpInput, password: passwordSignUpInput})
        }
        catch(error){
            const response_body = error.response?.data
            if (!response_body){
                displayErrorMessage('Something Went Wrong')
            }
            else{
                console.log(response_body.error)
                displayErrorMessage(response_body.error)
            }

            return
        }
        dispatch(login(emailSignUpInput))
        nav('/discussions')

    }

    const handleLogin = async (e:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
        
        if(!emailLoginValid){
            displayErrorMessage('Invalid email format')
            return
        }

        if(!passwordLoginValid){
            displayErrorMessage('Invalid password format')
            return
        }

        try{
            await axios.post('/users/login', {email: emailLoginUpInput, password: passwordLoginInput})
        }
        catch(error){
            const response_body = error.response?.data
            if (!response_body){
                displayErrorMessage('Something Went Wrong')
            }
            else{
                console.log(response_body.error)
                displayErrorMessage(response_body.error)
            }

            return
        }
        
        dispatch(login(emailLoginUpInput))
        nav('/discussions')

    }

    const displayErrorMessage = (error_message:string) =>{
        setErrorMessage(error_message)
        setShowErrorMessage(true)
    }


    return(<>
        <header className='login-header'>
            <h1>THE BOOKSHELF SOCIETY</h1>
            <img src='../../public/open-book.png' style={{height:'4rem', width:'4rem'}}></img>
        </header>
        {showErrorMessage && <div  className={`error-modal ${showErrorMessage ? 'modal-active':''}`}>
            <GoAlertFill size={40}></GoAlertFill>
            <p>{errorMessage}</p>
            <IoMdClose className='pointer-on-hover' style={{position:'absolute', top:'10px', right:'10px'}} onClick={() => setShowErrorMessage(false)}></IoMdClose>
            </div>}
        <main className='main'>
            <div className='description-container'>
                <h2>FIND <span className='pink '>COMMUNITY</span></h2>
                <h2>IN READING</h2>
                <p style={{marginTop:'20px'}}>BOOKS, CLUBS, DISCUSSION FORUMS, AND MORE!</p>
            </div>
            <div className='login-panel-container'>
                <div className='login-panel' >
                    

                    <div className={`sign-up ${view === 'signUp'? '':'shiftLeft'}`} style={{'width':'500px', height:'100%'}}>
                        <form onSubmit={(e) => handleSubmit(e)} style={{'display': 'flex',  'flexDirection':'column'}}>
                            <h3>SIGN UP</h3>
                            <label className='input-label'>
                            EMAIL:
                            </label>
                            <input type='email' className={`${!emailSignUpValid && emailSignUpInput !== '' ? 'invalidInput': ''}`} value={emailSignUpInput} onChange={(e) => setEmailSignUpInput(e.target.value)} placeholder='example@email.com'></input>
                            <MdOutlineMail  size={28} style={{position:'absolute', right:'42px', top:'105px'}}></MdOutlineMail>
                            <label className='input-label' style={{marginTop:'15px'}}>
                                PASSWORD:
                            </label>
                            <input value={passwordSignUpInput} className={`${!passwordSignUpValid && passwordSignUpInput !== '' ? 'invalidInput': ''}`} type={signUpPassVisible? 'text': 'password'} onChange={(e) => setPasswordSignUpInput(e.target.value)} placeholder='password'></input>
                            <PiPassword size={28}  style={{position:'absolute', right:'43px', top:'185px'}}></PiPassword>
                            {signUpPassVisible ? <FaRegEye className='pointer-on-hover' style={{position:'absolute', 'right': '45px', 'top': '223px'}} onClick={() => setSignUpPassVisible(false)}/> : <FaRegEyeSlash className='pointer-on-hover' onClick={() => setSignUpPassVisible(true)} style={{position:'absolute', 'right': '45px', 'top': '223px'}}/>}
                            <label className='input-label' style={{marginTop:'15px'}}>
                                CONFIRM PASSWORD:
                            </label>
                            <input value={confirmPasswordSignUpInput} className={`${!confirmPasswordValid && confirmPasswordSignUpInput !== '' ? 'invalidInput': ''}`} onChange={(e) => {setConfirmPasswordSignUpInput(e.target.value)}} type={signUpPassConfirmVisible ? 'text': 'password'} placeholder='password'></input>
                            <PiPassword size={28} style={{position:'absolute', right:'43px', top:'267px'}}></PiPassword>
                            {signUpPassConfirmVisible ? <FaRegEye className='pointer-on-hover' onClick={() => setSignUpPassConfirmVisible(false)} style={{position:'absolute', 'right': '45px', 'top': '305px'}}/> : <FaRegEyeSlash onClick={() => setSignUpPassConfirmVisible(true)} className='pointer-on-hover' style={{position:'absolute', 'right': '45px', 'top': '305px'}}/>}
                            <button type='submit' onClick={(e) => handleSignUp(e)} className="sign-up-button" style={{backgroundColor:'#FF9090', width: '125px', marginLeft:'auto', marginRight:'auto', marginTop: '30px', height:'45px', borderRadius:'10px'}}>
                                SIGN UP
                            </button>
                            <p style={{marginLeft:'auto', marginRight:'auto', marginTop:'20px'}}>Already have an account? <span style={{textDecoration:'underline'}} className='pointer-on-hover' onClick={() => setView('login')}>Login here</span></p>
                        </form>
                    </div>
                    <div className={`login ${view === 'signUp'? '':'shiftLeft'}`} style={{'width':'100%', 'height': '100%'}}>
                        <form onSubmit={(e) => handleSubmit(e)} style={{'display': 'flex',  'flexDirection':'column'}}>
                            <h3>LOG IN</h3>
                            <label className='input-label'>
                            EMAIL:
                            </label>
                            <input value={emailLoginUpInput} className={`${!emailLoginValid && emailLoginUpInput !== '' ? 'invalidInput': ''}`} onChange={(e) => setEmailLoginInput(e.target.value)} type='email' placeholder='example@email.com'></input>
                            <MdOutlineMail  size={28} style={{position:'absolute', right:'42px', top:'105px'}}></MdOutlineMail>
                            <label className='input-label' style={{marginTop:'15px'}}>
                                PASSWORD:
                            </label>
                            <input value={passwordLoginInput} className={`${!passwordLoginValid && passwordLoginInput !== '' ? 'invalidInput': ''}`} onChange={(e)=>setPasswordLoginInput(e.target.value)} type={loginPassVisible ? 'text':`password`} placeholder='password'></input>
                            {loginPassVisible ? <FaRegEye className='pointer-on-hover' style={{position:'absolute', 'right': '45px', 'top': '223px'}} onClick={() => setLoginPassVisible(false)}/> : <FaRegEyeSlash className='pointer-on-hover' onClick={() => setLoginPassVisible(true)} style={{position:'absolute', 'right': '45px', 'top': '223px'}}/>}
                            <PiPassword size={28}  style={{position:'absolute', right:'43px', top:'185px'}}></PiPassword>
                            <button type='submit' onClick={(e) => handleLogin(e)} className="sign-up-button" style={{backgroundColor:'#FF9090', width: '125px', marginLeft:'auto', marginRight:'auto', marginTop: '30px', height:'45px', borderRadius:'10px'}}>
                                LOG IN
                            </button>
                            <p style={{marginLeft:'auto', marginRight:'auto', marginTop:'50px'}}>Don't have an account? <span style={{textDecoration:'underline'}} className='pointer-on-hover' onClick={()=>setView('signUp')}>Signup here</span></p>
                            <p style={{marginLeft:'auto', marginRight:'auto', marginTop:'15px'}}>or <span style={{textDecoration:'underline'}} className='pointer-on-hover' onClick={() => nav('/discussions')} >continue as guest</span></p>

                            

                        </form>
                    
                    </div>

                </div>
            </div>

        </main>
    
    </>)
}


export default Login
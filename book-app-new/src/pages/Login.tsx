import { useState } from 'react';
import '../styles/Login.css'
import { MdOutlineMail } from "react-icons/md";
import { PiPassword } from "react-icons/pi";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [view, setView] = useState('signUp')
    const [signUpPassVisible, setSignUpPassVisible] = useState(false)
    const [signUpPassConfirmVisible, setSignUpPassConfirmVisible] = useState(false)
    const [loginPassVisible, setLoginPassVisible] = useState(false)
    const nav = useNavigate()
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        nav('/discussions')

    }


    return(<>
        <header className='login-header'>
            <h1>THE BOOKSHELF SOCIETY</h1>
            <img src='../../public/open-book.png' style={{height:'4rem', width:'4rem'}}></img>
        </header>
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
                            <input type='email' placeholder='example@email.com'></input>
                            <MdOutlineMail  size={28} style={{position:'absolute', right:'42px', top:'105px'}}></MdOutlineMail>
                            <label className='input-label' style={{marginTop:'15px'}}>
                                PASSWORD:
                            </label>
                            <input type={signUpPassVisible? 'text': 'password'} placeholder='password'></input>
                            <PiPassword size={28}  style={{position:'absolute', right:'43px', top:'185px'}}></PiPassword>
                            {signUpPassVisible ? <FaRegEye className='pointer-on-hover' style={{position:'absolute', 'right': '45px', 'top': '223px'}} onClick={() => setSignUpPassVisible(false)}/> : <FaRegEyeSlash className='pointer-on-hover' onClick={() => setSignUpPassVisible(true)} style={{position:'absolute', 'right': '45px', 'top': '223px'}}/>}
                            <label className='input-label' style={{marginTop:'15px'}}>
                                CONFIRM PASSWORD:
                            </label>
                            <input type={signUpPassConfirmVisible ? 'text': 'password'} placeholder='password'></input>
                            <PiPassword size={28} style={{position:'absolute', right:'43px', top:'267px'}}></PiPassword>
                            {signUpPassConfirmVisible ? <FaRegEye className='pointer-on-hover' onClick={() => setSignUpPassConfirmVisible(false)} style={{position:'absolute', 'right': '45px', 'top': '305px'}}/> : <FaRegEyeSlash onClick={() => setSignUpPassConfirmVisible(true)} className='pointer-on-hover' style={{position:'absolute', 'right': '45px', 'top': '305px'}}/>}
                            <button type='submit' onClick={(e) => handleSubmit(e)} className="sign-up-button" style={{backgroundColor:'#FF9090', width: '125px', marginLeft:'auto', marginRight:'auto', marginTop: '30px', height:'45px', borderRadius:'10px'}}>
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
                            <input type='email' placeholder='example@email.com'></input>
                            <MdOutlineMail  size={28} style={{position:'absolute', right:'42px', top:'105px'}}></MdOutlineMail>
                            <label className='input-label' style={{marginTop:'15px'}}>
                                PASSWORD:
                            </label>
                            <input type={loginPassVisible ? 'text':`password`} placeholder='password'></input>
                            {loginPassVisible ? <FaRegEye className='pointer-on-hover' style={{position:'absolute', 'right': '45px', 'top': '223px'}} onClick={() => setLoginPassVisible(false)}/> : <FaRegEyeSlash className='pointer-on-hover' onClick={() => setLoginPassVisible(true)} style={{position:'absolute', 'right': '45px', 'top': '223px'}}/>}
                            <PiPassword size={28}  style={{position:'absolute', right:'43px', top:'185px'}}></PiPassword>
                            <button type='submit' onClick={(e) => handleSubmit(e)} className="sign-up-button" style={{backgroundColor:'#FF9090', width: '125px', marginLeft:'auto', marginRight:'auto', marginTop: '30px', height:'45px', borderRadius:'10px'}}>
                                LOG IN
                            </button>
                            <p style={{marginLeft:'auto', marginRight:'auto', marginTop:'50px'}}>Don't have an account? <span style={{textDecoration:'underline'}} className='pointer-on-hover' onClick={()=>setView('signUp')}>Signup here</span></p>
                            <p style={{marginLeft:'auto', marginRight:'auto', marginTop:'15px'}}>or <span style={{textDecoration:'underline'}} className='pointer-on-hover' >continue as guest</span></p>

                            

                        </form>
                    
                    </div>

                </div>
            </div>

        </main>
    
    </>)
}


export default Login
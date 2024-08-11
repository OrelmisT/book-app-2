import {Outlet} from 'react-router-dom'
import '../styles/Nav.css'
import { IoPersonSharp } from "react-icons/io5";
import { RiSettings4Fill } from "react-icons/ri";

const Nav = () =>{

  






    return (
        <div className='page-wrapper'>
            <div className='header'>
                <div className='logo'>
                    <img src='../../public/open-book.png' style={{maxWidth:'70px'}}></img>
                    <h1 className='page-title'>BOOKSHELF SOCIETY</h1>
                </div>
                <div className='options'>
                    <div className='icon-container'>
                        <IoPersonSharp size={30}/>
                    </div>
                    <div className='icon-container'>
                        <RiSettings4Fill size={30}/>
                    </div>

                </div>
            </div>
            <div className='body'>
                <nav>
                    
                </nav>

                <Outlet></Outlet>
            </div>
        </div>
    )


}

export default Nav

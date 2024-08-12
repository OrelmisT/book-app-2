import {Outlet, NavLink} from 'react-router-dom'
import '../styles/Nav.css'
import { IoPersonSharp } from "react-icons/io5";
import { RiSettings4Fill } from "react-icons/ri";
import { IoChatbubbleSharp } from "react-icons/io5";
import { RiGroupFill } from "react-icons/ri";
import { PiBooksFill } from "react-icons/pi";
import { IoSearchSharp } from "react-icons/io5";
import { HiMiniBookmark } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';








const Nav = () =>{
    const nav = useNavigate()



    return (
        <div className='page-wrapper'>
            <div className='header'>
                <div className='logo' onClick={() => nav('/discussions')}>
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
                    <NavLink to={'/discussions'} className={'nav-link'}>
                        <IoChatbubbleSharp size={30}></IoChatbubbleSharp>
                        <p className='nav-link-text'>DISCUSSIONS</p>
                    </NavLink>
                    <NavLink to={'/groups'} className={'nav-link'}>
                        <RiGroupFill size={30}></RiGroupFill>
                        <p className='nav-link-text'>GROUPS</p>
                    </NavLink>
                    <NavLink to={'/bookshelf'} className={'nav-link'}>
                        <PiBooksFill size={30}></PiBooksFill>
                        <p className='nav-link-text'>BOOKSHELF</p>
                    </NavLink>
                    <NavLink to={'/search'} className={'nav-link'}>
                        <IoSearchSharp size={30}></IoSearchSharp>
                        <p className='nav-link-text'>SEARCH</p>
                    </NavLink>
                    <NavLink to={'/bookmarks'} className={'nav-link'}>
                        <HiMiniBookmark size={30}></HiMiniBookmark>
                        <p className='nav-link-text'>BOOKMARKS</p>
                    </NavLink>
                </nav>

                <Outlet></Outlet>
            </div>
        </div>
    )


}

export default Nav

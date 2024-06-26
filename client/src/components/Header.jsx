import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const Header = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:9000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, [setUserInfo])

    const logout = () => {
        fetch('http://localhost:9000/logout', {
            credentials: 'include',
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                setUserInfo(null);
                alert("로그아웃이 되었습니다.");
            } else {
                alert("로그아웃에 실패했습니다.")
            }
        })
    }

    const youName = userInfo?.youName;

    const toggleProfile = (e) => {
        e.preventDefault();
        setIsProfileOpen(!isProfileOpen);
    }

    return (
        <header id='header'>
            <div className='header__inner container'>
                <h1 className='logo'>
                    <Link to='/'>websloper</Link>
                </h1>

                <nav className='nav'>
                    <ul>
                        <li className='active'><Link to='/'>홈</Link></li>
                        <li><Link to='/register'>회원가입</Link></li>
                        <li><Link to='/login'>로그인</Link></li>
                        <li><Link to='/bload'>게시판</Link></li>
                        <li><Link to='/blog'>블로그</Link></li>
                    </ul>
                </nav>

                <div className='utils'>
                    <button className='search'>
                        <span className='blind'>search</span>
                    </button>
                    <button className='dark'>
                        <span className='blind'>dark mode</span>
                    </button>
                    <button className='navBtn'>

                    </button>
                    {youName && (
                        <span className='face' onClick={toggleProfile}></span>
                    )}

                    {isProfileOpen && (
                        <div className='profile'>
                            <ul>
                                <li className='profile-id'>kingsong</li>
                                <li className='profile-email'>kingsong@naver.com</li>
                                <span className='profile-logout' onClick={logout}>
                                    <span className='blind'>logout</span>
                                </span>
                            </ul>
                            <ul>
                                <li><a href='/'>프로필</a></li>
                                <li><a href='/'>내가 쓴글</a></li>
                                <li><a href='/'>댓글</a></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
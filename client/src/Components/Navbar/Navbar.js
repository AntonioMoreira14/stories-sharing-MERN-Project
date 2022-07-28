import React, {useContext} from 'react'
import UserContext from "../../Context/Context"
import { Link } from "react-router-dom"
import './navbar.css'
import navbar_logo from '../../Images/navbar_logo.png'

export default function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext)

  function logoutHandler () {
    setUserInfo({
      token: '',
      username: ''
    })
    localStorage.setItem("authentication-token", '')
  }

  return (
    <div>
      <div className='link-container'>
      <Link className='link-home' to='/'>Home</Link>
      <Link to='/posts' className='link-posts'>Posts</Link>
      <img src={navbar_logo} alt="" className='navbar-logo'/>
      {userInfo.username ? (
        <div className='link-auth'>
          <Link to='/post' className='link-create-post'>Create Post</Link>
          <Link to='/userpage' className='link-user'>Hello, {userInfo.username.username}!</Link>
          <Link to='/' className='link-logout' onClick={logoutHandler}>Logout</Link>
        </div>
      ) : (
        <div className='link-auth'>
          <Link className='link-register' to='/register'>Register</Link>
          <Link className='link-login' to='/login'>Sign In</Link>
        </div>
      )}
      </div>
    </div>
  )
}


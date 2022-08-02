import React, { useContext, useState } from 'react'
import UserContext from '../../Context/Context'
import Error from "./Error"
import './login.css'
import { axiosInstance } from '../../utils';

export default function Login() {
  const {userInfo, setUserInfo} = useContext(UserContext);

  const [user, setUser] = useState({username: "", password: ""});

  const [error, setError] = useState('');

  async function handleSubmit (e) {
    try {
      e.preventDefault();
    const loginUser = {
      username: user.username,
      password: user.password
    };
    const resLogin = await axiosInstance.post('/user/login', loginUser);
    setUserInfo({
      token: resLogin.data.token,
      username: resLogin.data.username
    });
    localStorage.setItem("authentication-token", resLogin.data.token)
    setUser({
      username: "",
      password: ""
    });
    window.location='/userpage'
    } catch (err) {
      err.response.data.msg ?
      setError(err.response.data.msg) :
      setError("Something went wrong!")
    } 
  }

 function handleChange (e) {
    const {name, value} = e.target
    setUser(user => {
      return {
        ...user,
        [name] : value
      }
    })
  }

  return (
    <div className='login'>
    <h2 className='login-title'>Sign In!</h2>
    {error && <Error msg={error} />}
    <form className='login-form' onSubmit={handleSubmit}>
      <label>Username</label>
      <input 
        type="text" 
        name="username" 
        value={user.username} 
        onChange={handleChange}
        className="input-login"
        required 
      /><br />
      <label>Password </label>
      <input 
        type="password" 
        name="password" 
        value={user.password}
        onChange={handleChange}
        className="input-login"
        required
      />
      <br />
      <button type="submit" className='login-btn'>Sign in?</button>
    </form>
  </div>
  )
}

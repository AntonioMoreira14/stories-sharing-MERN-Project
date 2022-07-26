import axios from 'axios';
import React, { useState, useContext } from 'react'
import UserContext from '../../Context/Context';
import Error from './Error';
import './register.css'

export default function Register() {
  const {userInfo, setUserInfo} = useContext(UserContext);

  const [newUser, setNewUser] = useState({username: "", email: "", password: ""})

  const [error, setError] = useState('')

  async function handleSubmit (e) {
    e.preventDefault();
    
    try {
      const createUser = {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password
      }
      
     await axios.post('/user/register', createUser)
  
      setNewUser({
        username: "",
        email: "",
        password: ""
      });
  
      window.location = '/login'
    } catch (err) {
      err.response.data.msg ? 
      setError(err.response.data.msg) : setError('Something went wrong!')
    }
  }

 function handleChange (e) {
    const {name, value} = e.target
    setNewUser(user => {
      return {
        ...user,
        [name] : value
      }
    })
  }

  return (
    <div className='register'>
    <h1 className='register-title'>Create your account!</h1>
    {error && <Error msg={error}/>}
    <form className="register-form" onSubmit={handleSubmit}>
      <label>Username</label>
      <input 
        type="text" 
        name="username" 
        value={newUser.username} 
        onChange={handleChange}
        className="input-register"
        required 
      /><br />
      <label>Email </label>
      <input 
        type="text" 
        name="email" 
        value={newUser.email}
        onChange={handleChange}
        className="input-register"
        required
      />
      <br />
      <label>Password </label>
      <input 
        type="password" 
        name="password" 
        value={newUser.password}
        className="input-register"
        onChange={handleChange}
        required
      />
      <br />
      <button className="register-btn" type="submit">Regist?</button>
    </form>
  </div>
  )
}

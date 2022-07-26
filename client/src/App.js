import React, { useState, useEffect } from "react"
import UserContext from "./Context/Context"
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Posts from "./Components/Posts/Posts";
import CreatePost from "./Components/CreatePost/CreatePost";
import UpdatePost from "./Components/UpdatePost/UpdatePost";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import Profile from "./Components/User/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

export default function App() {
  
  const [userInfo, setUserInfo] = useState({
    token: '',
    username: '',
    email: ''
  })

  useEffect(() => {
    const loggedIn = async () => {
      let token = localStorage.getItem("authentication-token")
      if(token === null) {
        localStorage.setItem("authentication-token", "")
        token = ""
      }
      const resToken = await axios.post('/user/tokenValid', null, {headers: {"authentication-token": token}});
      
      if(resToken.data) {
        const resUser = await axios.get('/user/profile', {headers: {'authentication-token': token}});
        setUserInfo({
          token: token,
          username: resUser.data,
          email: resUser.data
        })
      }
    }
    loggedIn()
  }, [])

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/posts' element={<Posts />}/>
            <Route path='/post' element={<CreatePost />}/>
            <Route path='/posts/:id' element={<UpdatePost />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/profile' element={<Profile />}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}
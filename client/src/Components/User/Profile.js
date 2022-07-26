import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../Context/Context'
import axios from "axios"
import { Link } from "react-router-dom"
import './profile.css'

export default function Profile() {
  const {userInfo, setUserInfo} = useContext(UserContext)
  
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('/posts')
    .then(res => setPosts(res.data))
  },[])

  return (
    <div className='profile'>
      <h1 className='profile-title'>Your Profile Page!</h1><br />
      <h3 className='profile-info'>Username: <u>{userInfo.username.username}</u></h3>
      <h3 className='profile-info'>Email: <u>{userInfo.username.email}</u></h3>
      <h3 className='profile-info'>Date: <u>{new Date().toDateString()}</u></h3>
      <h4 className='user-post-title'>{userInfo.username.username}, your added posts: </h4>
      <ul>
        {posts
          .filter((post) => {
            if (post.user === userInfo.username.username) {
              return post;
            }
          })
          .map((post) => {
            return (
              <div key={post._id} className="user-posts-list">
                <Link
                  className='user-single-post-title'
                  to={`/posts/${post._id}`} 
                  state={{id: post._id}}>
                  <b>{post.title}</b>
                </Link>
                <li className='user-posts-desc'>{post.desc}</li>
                <li>{post.user}</li>
              </div>
            );
          })}
      </ul>
    </div>
  )
}

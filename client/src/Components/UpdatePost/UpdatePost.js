import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import UserContext from "../../Context/Context"
import './updatePost.css'
import { axiosInstance } from '../../utils';

export default function UpdatePost() {
  const {userInfo, setUserInfo} = useContext(UserContext)

  const [post, setPost] = useState({
    title: "",
    desc: "",
    user: ""
  })

  const location = useLocation()

  useEffect(() => {
    const id = location.state.id
    axiosInstance.get(`/posts/${id}`)
      .then(res => { 
        setPost(res.data)
    })
  }, [location.state.id])

  function handleChange (e) {
    const {name, value} = e.target
    setPost(post => {
    return {
      ...post,
      [name] : value
      }
    })
  }

  function handleUpdate(e) {
    e.preventDefault();
    const id = location.state.id
    axiosInstance.put('/posts/' + id, post, {
      headers: {
        "authentication-token": userInfo.token
      }}).then(window.location = 'https://stories-sharing-app.herokuapp.com/posts')
  }

  function handleDelete() {
    const id = location.state.id
    axiosInstance.delete('/posts/' + id, {
      headers: {
        "authentication-token": userInfo.token
      }}).then(window.location = 'https://stories-sharing-app.herokuapp.com/posts')
  }

  return (
    <div className='update-post'>
      <h2 className='post-title'>{post.title}</h2>
      <p className='post-desc'>{post.desc}</p>
      <h2 className='post-user'>User: {post.user}</h2>
        {userInfo.username.username === post.user ? (
          <form onSubmit={handleUpdate}>
            <hr className='line-update'/>
            <h2 className='update-title'>Update your post!</h2>
            <input 
              type="text" 
              name="title" 
              value={post.title} 
              onChange={handleChange}
              className="input-update-title"
              maxLength="24"
              required
            />
            <textarea 
              type="text" 
              name="desc" 
              value={post.desc}
              onChange={handleChange}
              className="update-desc"
              cols="40" rows="5"
              required
            >
            </textarea>
            <button className="update-btn" type="submit">Update</button>
            <button className="delete-btn" onClick={handleDelete} type="submit">Delete</button>
          </form>
        ) : (
          <p className='post-error'>You are not authorized to update/delete this post!</p>
        )}
    </div>
  )
}

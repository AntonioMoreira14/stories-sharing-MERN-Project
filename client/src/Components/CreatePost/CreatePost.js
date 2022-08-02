import React, { useState, useContext } from 'react'
import UserContext from '../../Context/Context';
import { axiosInstance } from '../../utils';
import './createPost.css'

export default function CreatePost() {
  const {userInfo, setUserInfo} = useContext(UserContext)

  const [newPost, setNewPost] = useState({title: "", desc: ""})

  function handleSubmit (e) {
    e.preventDefault();
  
      const createPost = {
        title: newPost.title,
        desc: newPost.desc,
        user: userInfo.username.username
      }
      
      axiosInstance.post('/post', createPost, {
        headers: {
          "authentication-token": userInfo.token
        }}).then(window.location = '/userpage')
        
      setNewPost({
        title: "",
        desc:""
      });
  }

 function handleChange (e) {
    const {name, value} = e.target
    setNewPost(post => {
      return {
        ...post,
        [name] : value
      }
    })
  }

  return (
    <div className='create-post'>
      <h2 className='create-post-title'>Share something with the others!</h2>
      <form onSubmit={handleSubmit} className='create-post-form'>
        <label>Title (Max: 24 chars)</label>
        <input 
          type="text" 
          name="title" 
          value={newPost.title} 
          onChange={handleChange}
          className='input-create-post'
          maxLength="24"
          required
        /><br />
        <label>Description</label>
        <textarea 
          type="text" 
          name="desc" 
          value={newPost.desc}
          onChange={handleChange}
          className='textarea-create-post'
          cols="40" rows="5"
          required>
        </textarea><br />
        {userInfo.username ? (
          <button className="create-post-btn" type="submit">Submit</button>
        ) : (
          <p className='create-post-error'>You need to sign in to share something!</p>
        )}
      </form>
    </div>
  )
}

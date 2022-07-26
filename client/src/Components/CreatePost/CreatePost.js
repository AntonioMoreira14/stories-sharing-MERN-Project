import axios from 'axios';
import React, { useState, useContext } from 'react'
import UserContext from '../../Context/Context';
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
      
      axios.post('/post', createPost, {
        headers: {
          "authentication-token": userInfo.token
        }})
      .then(window.location = '/posts')
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
        <label>Title</label>
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
          <p>You need to be logged in to create a new Post</p>
        )}
      </form>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import './posts.css'
import axios from 'axios'
import { Link } from "react-router-dom"

export default function Posts() {

  const [posts, setPosts] = useState([])
  const [searchPost, setSearchPost] = useState('')

  useEffect(() => {
    axios.get('/posts')
    .then(res => setPosts(res.data))
  },[])
  
  return (
    <div className='posts'>
      <h1 className="posts-title">Posts</h1>
      <br />
      <input
        className='search-posts'
        type="text" 
        placeholder='Search Post...' 
        onChange={(e) => {
          setSearchPost(e.target.value)
        }}
      />
      <ul>
        {posts
          .filter((post) => {
            if (post.title.toLowerCase().includes(searchPost.toLowerCase())) {
              return post;
            }
          })
            .map(post => {
          return (
            <div key={post._id} className="posts-list">
              <Link
                className='single-post-title'
                to={`/posts/${post._id}`} 
                state={{id: post._id}}>
                <b>{post.title}</b>
              </Link>
              <li className='posts-desc'>{post.desc}</li>
              <li><b>Added by user: {post.user}</b></li>
            </div>)
          })}
      </ul>
    </div>
  )
}

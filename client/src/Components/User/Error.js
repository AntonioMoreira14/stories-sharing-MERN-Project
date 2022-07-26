import React from 'react'
import './error.css'

export default function Error(props) {
  return (
    <div>
      <span className='error'>{props.msg}</span>
    </div>
  )
}

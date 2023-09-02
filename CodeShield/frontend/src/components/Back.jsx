import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Back() {
  return (
    <div className='absolute top-5 left-5'>
      <NavLink to={'/'}>
        <i className="fa-solid fa-arrow-left fa-2xl cursor-pointer" style={{color: '#fff'}} />
      </NavLink>
    </div>
    
  )
}

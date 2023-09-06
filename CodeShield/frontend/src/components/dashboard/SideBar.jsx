import React from 'react'
import { NavLink } from 'react-router-dom'
export default function SideBar() {
  return (
    <div>
        <div className='w-56 h-screen bg-gradient5 border-r-[1px] border-[rgba(255,255,255,.3)] pt-4 px-5 text-white backdrop-blur'>
            <NavLink to={'/'} className='block space-x-4 cursor-pointer hover:bg-gradient6 rounded py-3 px-2 transition-all duration-150'>
                <i className='fa-solid fa-house fa-xl'/>
                <span className='text-center'>Home</span>
            </NavLink>
            <NavLink className='block space-x-4 cursor-pointer hover:bg-gradient6 rounded py-3 px-2 transition-all duration-150'>
                <i className="fa-solid fa-cart-shopping fa-xl"/>
                <span className='text-center'>Buyed Courses</span>
            </NavLink>
            <NavLink className='block space-x-4 cursor-pointer hover:bg-gradient6 rounded py-3 px-2 transition-all duration-150'>
                <i className="fa-solid fa-cart-plus fa-xl" />
                <span className='text-center'>Buy Course</span>
            </NavLink>
            <NavLink className='block space-x-4 cursor-pointer hover:bg-gradient6 rounded py-3 px-2 transition-all duration-150'>
                <i className="fa-solid fa-basket-shopping fa-xl" />
                <span className='text-center'>Cart</span>
            </NavLink>
            <NavLink className='block space-x-4 cursor-pointer hover:bg-gradient6 rounded py-3 px-2 transition-all duration-150'>
                <i className="fa-solid fa-plus fa-xl" />
                <span className='text-center'>Sell Courses</span>
            </NavLink>
            <NavLink className='block space-x-4 cursor-pointer hover:bg-gradient6 rounded py-3 px-2 transition-all duration-150'>
                <i className="fa-solid fa-chart-line fa-lg" />
                <span className='text-center'>statistics</span>
            </NavLink>
            <canvas id='test'/>
        </div>
    </div>
  )
}

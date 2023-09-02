/* eslint-disable no-unused-vars */
import React from 'react'
export default function Card(info) {
    return (
        <div className={`m-5 text-white w-64 backdrop-blur bg-gradient5 rounded-lg`}>
            <div className='flex items-center justify-center h-56 '>
                <img src={info.img} className='rounded w-48'/>
            </div>
            <div className='px-2'>
                <div className='text-xl flex justify-between items-center'>
                    <span>{info.title}</span>
                    <span className='text-sm'>{info.rate} <i className="fa-regular fa-star" style={{color: '#ffffff',}}></i></span>
                </div>
                <div className='text-custom1 text-slate-300 mt-1'>From <b>{info.companie}</b></div>
                <div className='text-sm'>with <b>{info.price === '0$' ? <><span className='text-red-500 line-through'>{info.price}</span> Free</> : info.price}</b></div>
                <div className='my-4'>
                    <button className='w-full h-8 rounded-md text-center bg-blue-600 hover:bg-blue-700'>Buy Now</button>
                </div>
            </div>
        </div>
    )
}

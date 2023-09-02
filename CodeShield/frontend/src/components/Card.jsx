/* eslint-disable no-unused-vars */
import React from 'react'
export default function Card(info) {
    return (
        <div className={`m-5 text-white w-64 ${info.bg ? ' backdrop-blur bg-gradient5 rounded-lg' : ''}`}>
            <img src={info.img} className='rounded w-full'/>
            <div className={info.bg ? 'px-2' : ''}>
                <div className='text-xl -leading-2 mt-2 mb-1'>{info.title}</div>
                <div className=' text-gray-300 text-custom1 w-5/6 text-left tracking-[-0.5px]'>{info.description}</div>
                <b className='text-gray-100 text-xs text-center ml-2 tracking-[0.2px]'>{info.ways}</b>
            </div>
        </div>
    )
}

/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { CartContext } from '../data/cartcontext'
import Cookies from 'universal-cookie'
export default function Card(info) {
    const cart = React.useContext(CartContext)
    const cookie = new Cookies()
    const saveCart = (info) => {
        axios.post('http://localhost:8000/api/cart?action=add',{item:info}, {
            withCredentials: true,
            headers: {
                Authorization: cookie.get('code')
            }
        })
        .then((e) => {cart.setData(e.data);})
        .catch((err) => console.log(err))
    }
    return (
        <div className={`m-5 text-white w-64 backdrop-blur bg-gradient5 rounded-lg`}>
            <div className='flex items-center justify-center h-56 '>
                <img src={info.img} className='rounded w-48'/>
            </div>
            <div className='px-2'>
                <div className='text-xl flex justify-between items-center'>
                    <span className=' md:text-lg text-sm'>{info.title}</span>
                    <span className='text-sm'>{info.rate} <i className="fa-regular fa-star" style={{color: '#ffffff',}}></i></span>
                </div>
                <div className='md:text-custom1 text-sm text-slate-300 mt-1'>From <b>{info.companie}</b></div>
                <div className='text-sm'>with <b>{info.price === '0$' ? <><span className='text-red-500 line-through'>{info.price}</span> Free</> : info.price}</b></div>
                <div className='my-4'>
                    <button onClick={() => {
                        if (info.home) location.pathname = '/courses'
                        else  {
                            saveCart(info)
                        }
                    }} className='w-full h-8 rounded-md text-center bg-blue-600 hover:bg-blue-700'>{info.home ? 'Buy Now' : 'Add to Cart'}</button>
                </div>
            </div>
        </div>
    )
}

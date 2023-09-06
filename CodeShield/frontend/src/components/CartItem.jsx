/* eslint-disable react/prop-types */
import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';
import { CartContext } from '../data/cartcontext';

export default function CartItem({ data }) {
    const token = new Cookies().get('code')
    const cart = React.useContext(CartContext) 
    const handleDeleteItem = (id) => {
        axios.post(`http://localhost:8000/api/cart?action=removecartitem&id=${id}`,null,{
            withCredentials: true,
            headers: {
                Authorization: token
            }
        })
        .then((e) => {cart.setData(e.data)})
    }
  return (
    <>
    <div className="flex custom5:flex-row flex-col md:w-full w-[calc(100vw - 80px)] items-center space-x-2 mt-5 bg-[rgba(255,255,255,.1)] pr-10 pl-3 py-4 rounded">
        <div>
            <img src={data.img} className='w-32 h-32'/>
        </div>
        <div className="flex-1 text-white space-y-1">
            <div className='flex justify-between items-center'>
                <div className='flex space-x-2 items-center'>
                    <div className='text-md'>{data.title.toUpperCase()}</div>
                    <div className='text-sm text-gray-400'>x{data.count || 1}</div>
                </div>
                <i onClick={(e) => handleDeleteItem(data.id)} className='fa-solid fa-trash text-red-500 cursor-pointer'/>
            </div>
            <div className="text-sm w-2/3 text-slate-300">from {data.companie}</div>
            <div className='flex justify-between items-center'>
                <div className='text-sm'>Price: {data.price}$</div>
                <div className='block text-sm'>{data.rate} <i className="fa-solid fa-star fa-sm" style={{color: '#ffffff'}} /></div>
            </div>
        </div>
    </div>
    </>
  );
}

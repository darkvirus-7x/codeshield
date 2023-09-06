import React from 'react'
import Navbar from '../components/Navbar'
import { useOutletContext } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { CartContext } from '../data/cartcontext';
import CartItem from '../components/CartItem';

export default function Cart() {
    const data = useOutletContext()
    const token = new Cookies().get('code')
    const cart = React.useContext(CartContext)
    const [filterData,setFilterData] = React.useState([])
    const price = cart.data.items.map((e) => {
        return Number(e.price) * (e.count || 1) 
    })
    React.useEffect(() => {
        !data.login && (location.pathname = '/')
        axios.post('http://localhost:8000/api/cart?action=getcartitems',null,{
            withCredentials: true,
            headers: {
                Authorization: token
            }
        }).then((e) => cart.setData(e.data))
    }, []);
    const Filter = (value) => {
        const filterData = cart.data.items.filter((e) => {
            return e.title.toUpperCase().includes(value.toUpperCase()) || e.companie.toUpperCase().includes(value.toUpperCase())
        })
        setFilterData(filterData)
    }

  return (
    <>
        <Navbar page={''} data={data}/>
        <div className=' flex flex-col px-10 lg:px-56 py-40'>
            <div>
                <div className=' bg-gradient5 py-3 px-5 space-x-4 rounded-md text-white lg:w-2/6 inline-flex'>
                    <i className="fa-solid fa-magnifying-glass md:fa-lg " style={{color: '#ffffff'}} />
                    <input placeholder='Search For Item...' onChange={(e) => Filter(e.target.value)} className='bg-transparent outline-none md:text-md text-xs'/>
                </div>
            </div>
            <div>
                {
                    filterData.length === 0 ? (
                        cart.data.items.length > 0 ?
                            cart.data.items.map((e,i) => {
                                return <CartItem data={e} key={i}/>
                            }) : (
                                <div className='text-white mt-5'>No Item On cart</div>
                            )
                    ) : (
                        filterData.map((e,i) => {
                            return <CartItem data={e} key={i}/>
                        })
                    )
                }
            </div>
            {
                cart.data.items.length !== 0 && 
                <div className=' text-white flex justify-between px-8 py-2 items-center'>
                    <div>Total: {price.reduce((a,c) => {
                        return a + c
                    })}$</div>
                    <div className='px-5 bg-blue-500 py-2 rounded cursor-pointer hover:bg-blue-600'>Purchase</div>
                </div>
            }
        </div>
    </>
  )
}

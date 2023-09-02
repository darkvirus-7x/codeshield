/* eslint-disable no-unused-vars */
import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login'
import Register from './pages/Register'
import CheckAuth from './Check/checkAuth'
import CheckUser from './Check/CheckUser'
export default function App() {
    return (
        <Routes>
            <Route element={<CheckUser/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/contact' element={<ContactUs/>}/>
            </Route>
            <Route element={<CheckAuth/>}>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Route>
        </Routes>
    )
}

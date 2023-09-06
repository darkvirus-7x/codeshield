/* eslint-disable no-unused-vars */
import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login'
import Register from './pages/Register'
import CheckUser from './Check/CheckUser'
import Dashboard from './pages/dashboard/Dashboard'
import Profile from './components/dashboard/profile/Profile'
import Courses from './pages/Courses'
import Cart from './pages/Cart'
export default function App() {
    return (
        <Routes>
            <Route element={<CheckUser/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/contact' element={<ContactUs/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/courses' element={<Courses/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/dashboard' element={<Dashboard/>}>
                    <Route path='profile' element={<Profile/>}/>
                    <Route path='test' element={<h1>Hello</h1>}/>
                </Route>
            </Route>
        </Routes>
    )
}

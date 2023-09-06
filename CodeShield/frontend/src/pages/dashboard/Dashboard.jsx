import React from 'react'
import NavbarDashboard from '../../components/dashboard/NavbarDashboard'
import { Navigate, Outlet, useOutletContext } from 'react-router-dom'
import SideBar from '../../components/dashboard/SideBar'

export default function Dashboard() {
    const userdata = useOutletContext()
    if (!userdata.login) location.pathname = '/'
    return (
        <div>
            <NavbarDashboard data={userdata}/>
            <div className='flex justify-center h-screen md:items-baseline items-center'>
                <div className='md:ml-32 md:mt-20'>
                    <Outlet context={userdata}/>
                </div>
            </div>
        </div>
    )
}
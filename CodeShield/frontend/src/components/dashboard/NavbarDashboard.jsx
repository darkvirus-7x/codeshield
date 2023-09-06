import React from 'react'
import Logo from '/logo.png'
import { NavLink } from 'react-router-dom'
import SideBar from './SideBar'
import axios from 'axios'
import Cookies from 'universal-cookie'
export default function NavbarDashboard(info) {
    const userdata = info.data.data
    const [sideBar,setSidebar ] = React.useState(false)
    const cookie = new Cookies()
    const handleLogout = () => {
        axios.get('http://localhost:8000/api/logout',{
            headers: {
                Authorization: cookie.get('code')
            }
        })
        cookie.remove('code')
        location.reload()
      }
    return (
        <div className='fixed w-full z-50'>
            <nav className=' w-full'>
                <div className=' flex text-white w-full justify-between items-center px-8 py-6 bg-gradient5 shadow-[0_0_10px_0_rgba(255,255,255,.1)]'>
                    <NavLink to='/' className='items-center lg:flex hidden'>
                        <img src={Logo} className='md:w-32 md:h-32 h-24 w-24 absolute'/>
                    </NavLink>
                    <div className='lg:hidden block' onClick={(e) => setSidebar((e) => !e)}>
                        <i className="fa-solid fa-bars fa-xl"></i>
                    </div>
                    <div className='flex items-center space-x-4 cursor-pointer'>
                        <img src={userdata.profile || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFE0lEQVR4nO2ay29VVRTGL23BgkTbgi0gKL4iKOCLP4FEJKmIxoGgcWAUR9LWgRODJoao4ABD1TgxToxEJwK+U4114KMioAMtPoM8oinWxMQWKZefWfY7YXlz7jl7n56CGlZyc29y1rfW3mevtfZ63ErlLP1PCWgBbgY2A7uAr4EhYFQf+/0VsFM8ncD5lX8DAecA64C3gRPEk2HeAtaarMoZ2EAz0AMcdos6BnwAPAKsAa4GZom3Wb+XALeKpx/40+EPAV3Ge7o2cRPwnVvA58B6oLWArFZh9zh53wI3TvYpPOsUmvKVJcmeohe0z8nfVrq5AR3AbikYATYAjaUqGdfTBHQrOBgNAO1lCV+o4zYaBJbm8F8BbAT6gCPynT8UxZ4GLg7QeQ3wjXTa98IyTiLZxCfmsDn2/iJQzYlUvwN3Aefl6J4NfOo20z4Rn0jM6WNgZgbvXL3xZKEvyOYXATP0sYj1uAvTZj5b7VmG3JluMwOFfAZ4zpnTrBxH7XcR7KIcuXfr3jkuzIdZC2T8ZBIz643dxCrn2Hk+sVq8Q1kbTsEt0d1h9FAO77UuAISFZmA68L1ADwTwvyTentBNOKylKUYHAni7nb/kmxjwoLsnckMs8Kv4L4vYgzdLO0mjeQGh+Qvxbghx8MOhRwicmzh47CacjPckY0WEyR/KPBXgTjHuDlzEAvEfjFy/l2GZslFn4Akm6cwdWYzviunewEW0J28ocv1pOoPSHeB+8b+ZdaGd0E3cEii0UReghdIpkXtIZCT3z7JA/jZlzWOp9QxwiwS+H7mQn4S7MAbnfOy4FjY9Atdf1xyBp/RwY+RiXhNudQxO2BXCfhSJe1S4zWkPXy+yIGCTcJticMI+JuzWSNwa4XamPUzSgMURAhtckfVwzGJq3qwlpg0ROKs+jQbTHh7Vw5g0Y54wwxHrr5UxLBlzIzCWfxkNpT1M6udpEQKnKR+rhka6lEhZlYypkU0Po2OlbEQ464IgH1segVvu/DL9Tii4kcS02iKFXgf8IuwTEbgnhfnZZETqnJ1lWomzL4oRKuwNwu6LwCQJYNQmjICrspy9UPh10etgaKqh6tHoQJGMgFOX967SLkSHt+aa0Q9Zjq/WqvHkp+N1SA2+uhdioRTF4ae6+np/QG41EBOpPKmjWTdFiU4aM9L6agZP0mVZUFBHW2bSWJNS31dQSVJonczgOSmeGQV1rM8N2a6w2lNQidm/0WgGj504RUYK/LOwWptX6h4JjT51uoxGRzN4kvvq8gLyVwWVujXNB2soN0Uome+cfUcG3w7X9JsfIb8J+DI42tW0g7oC+Jda40z5UhJ+6zqyNfBc+B0RNrc6ZHweE94OqjnC0TQlqtWtI/+Z+P6OVMD2kOxZkeflmj7xXvWu5pTSoEtpme633MYJ3K7Ql9BvwDPWOYxScKqu2OZ6Y+gKeBW4XjwXuEZ6XMu0ThO7173BMbVxbi9jVKZs9jb5T/KSqnqZNgUo3sR2b8NOBCf8FeDKiS4+Zx7zfM2pWxXaMVHBlzrn/zGvqV0GActcQLBNXFKW4DkaGaDpU/ckjd4aFZ1GnDl1lK2k2QUAdMOWNn1Var/Xye+d1Nl7nfH0PQVr9hZha8fTKydn9emXZo9LZ1DHsE8tHpt7LFZG3aBPqyq7TvH0uakVmgJ0nbY/DKSYmyWa70zwLxzrzshfODLMxMZwW4A3NHscVhgd0+9BPdsi3kJ1z1mq/AfoL3hzLb7qNxrGAAAAAElFTkSuQmCC'} className='md:w-10 md:h-10 w-8 h-8 rounded-full object-cover'/>
                        <span>{userdata.username}</span>
                        <NavLink to={'profile'} className="fa-solid fa-gear fa-sm md:fa-lg" style={{color: '#ffffff'}} />
                        <i className="fa-regular fa-bell fa-sm md:fa-lg" style={{color: '#ffffff'}} />
                        <i onClick={() => handleLogout()} className="fa-solid fa-right-from-bracket fa-sm md:fa-lg text-white" />
                    </div>
                </div>
            </nav>
            <div className={`fixed ${!sideBar ? '-left-[100%]' : 'left-0'} lg:left-0 transition-all duration-[1s]`}>
                <SideBar/>
            </div>
        </div>
    )
}
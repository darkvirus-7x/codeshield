/* eslint-disable no-unused-vars */
import React from 'react'
import Logo from '/logo.png'
import { NavLink } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'
export default function Navbar(info) {
  let [page, setPage] = React.useState(info.page)
  const [isClicked, setClick] = React.useState(false)
  const [isLogin,setLogin] = React.useState(info.data.login)
  console.log(info)
  const [bar,setBar] = React.useState(false)
  const cookie = new Cookies()
  const handleLogout = () => {
    axios.get('http://localhost:8000/api/logout',{
      headers: {
        Authorization: cookie.get('code')
      }
    })
    .then((e) => {
      if (e.data === 'OK') {
        cookie.remove('code')
        location.reload()
      }
    })
    .catch(err => {
      if (err.response.data.message === 'Invalid token') {
        cookie.remove('code')
        location.reload()
      }
    })
  }
  return (
    <div>
      <nav className='bg-gradient5 z-50 backdrop-blur left-0 fixed top-0 flex w-full items-center justify-between p-5 py-10 text-white shadow-custom h-24'>
          <div className='flex'>
              <img src={Logo} alt='logo' className='custom2:w-36 w-32 -ml-4'/>
          </div>
          <div className='custom2:block hidden'>
            <div className='flex text-lg tracking-wide items-center'>
                <div>
                  <NavLink to={'/'} className={page === 'h' ? 'mr-5 cursor-pointer border-b-2 border-transparent transition-all linear duration-100 border-white': 'mr-5 cursor-pointer border-b-2 border-transparent transition-all linear duration-100 hover:border-white'}>Home</NavLink>
                  <NavLink to={'/courses'} className={page === 'c' ? 'mr-5 cursor-pointer border-b-2 border-transparent transition-all linear duration-100 border-white': 'mr-5 cursor-pointer border-b-2 border-transparent transition-all linear duration-100 hover:border-white'}>Courses</NavLink>
                  <NavLink to={'/contact'} className={page === 'co' ? 'mr-5 cursor-pointer border-b-2 border-transparent transition-all linear duration-100 border-white': 'mr-5 cursor-pointer border-b-2 border-transparent transition-all linear duration-100 hover:border-white'}>Contact us</NavLink>
                </div>
                <div className='ml-10'>
                  {!isLogin ? (
                    <>
                      <NavLink to={'/login'} className='mr-5 pb-1 cursor-pointer transition-all linear duration-100 hover:border-b-2'>Login</NavLink>
                      <NavLink to={'/register'}>
                        <button className='mr-5 px-4 py-2 bg-gradient-to-br from-gradient1 to-gradient2 rounded-xl transition-all duration-75 hover:scale-105'>Register</button>
                      </NavLink>
                    </>
                    )
                    :
                    ( 
                      <div className='flex flex-col justify-center items-center space-y-4'>
                        <div className='flex items-center space-x-4 cursor-pointer' onClick={() => setBar((e) => !e)}>
                          <img src={info.data.profile || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFE0lEQVR4nO2ay29VVRTGL23BgkTbgi0gKL4iKOCLP4FEJKmIxoGgcWAUR9LWgRODJoao4ABD1TgxToxEJwK+U4114KMioAMtPoM8oinWxMQWKZefWfY7YXlz7jl7n56CGlZyc29y1rfW3mevtfZ63ErlLP1PCWgBbgY2A7uAr4EhYFQf+/0VsFM8ncD5lX8DAecA64C3gRPEk2HeAtaarMoZ2EAz0AMcdos6BnwAPAKsAa4GZom3Wb+XALeKpx/40+EPAV3Ge7o2cRPwnVvA58B6oLWArFZh9zh53wI3TvYpPOsUmvKVJcmeohe0z8nfVrq5AR3AbikYATYAjaUqGdfTBHQrOBgNAO1lCV+o4zYaBJbm8F8BbAT6gCPynT8UxZ4GLg7QeQ3wjXTa98IyTiLZxCfmsDn2/iJQzYlUvwN3Aefl6J4NfOo20z4Rn0jM6WNgZgbvXL3xZKEvyOYXATP0sYj1uAvTZj5b7VmG3JluMwOFfAZ4zpnTrBxH7XcR7KIcuXfr3jkuzIdZC2T8ZBIz643dxCrn2Hk+sVq8Q1kbTsEt0d1h9FAO77UuAISFZmA68L1ADwTwvyTentBNOKylKUYHAni7nb/kmxjwoLsnckMs8Kv4L4vYgzdLO0mjeQGh+Qvxbghx8MOhRwicmzh47CacjPckY0WEyR/KPBXgTjHuDlzEAvEfjFy/l2GZslFn4Akm6cwdWYzviunewEW0J28ocv1pOoPSHeB+8b+ZdaGd0E3cEii0UReghdIpkXtIZCT3z7JA/jZlzWOp9QxwiwS+H7mQn4S7MAbnfOy4FjY9Atdf1xyBp/RwY+RiXhNudQxO2BXCfhSJe1S4zWkPXy+yIGCTcJticMI+JuzWSNwa4XamPUzSgMURAhtckfVwzGJq3qwlpg0ROKs+jQbTHh7Vw5g0Y54wwxHrr5UxLBlzIzCWfxkNpT1M6udpEQKnKR+rhka6lEhZlYypkU0Po2OlbEQ464IgH1segVvu/DL9Tii4kcS02iKFXgf8IuwTEbgnhfnZZETqnJ1lWomzL4oRKuwNwu6LwCQJYNQmjICrspy9UPh10etgaKqh6tHoQJGMgFOX967SLkSHt+aa0Q9Zjq/WqvHkp+N1SA2+uhdioRTF4ae6+np/QG41EBOpPKmjWTdFiU4aM9L6agZP0mVZUFBHW2bSWJNS31dQSVJonczgOSmeGQV1rM8N2a6w2lNQidm/0WgGj504RUYK/LOwWptX6h4JjT51uoxGRzN4kvvq8gLyVwWVujXNB2soN0Uome+cfUcG3w7X9JsfIb8J+DI42tW0g7oC+Jda40z5UhJ+6zqyNfBc+B0RNrc6ZHweE94OqjnC0TQlqtWtI/+Z+P6OVMD2kOxZkeflmj7xXvWu5pTSoEtpme633MYJ3K7Ql9BvwDPWOYxScKqu2OZ6Y+gKeBW4XjwXuEZ6XMu0ThO7173BMbVxbi9jVKZs9jb5T/KSqnqZNgUo3sR2b8NOBCf8FeDKiS4+Zx7zfM2pWxXaMVHBlzrn/zGvqV0GActcQLBNXFKW4DkaGaDpU/ckjd4aFZ1GnDl1lK2k2QUAdMOWNn1Var/Xye+d1Nl7nfH0PQVr9hZha8fTKydn9emXZo9LZ1DHsE8tHpt7LFZG3aBPqyq7TvH0uakVmgJ0nbY/DKSYmyWa70zwLxzrzshfODLMxMZwW4A3NHscVhgd0+9BPdsi3kJ1z1mq/AfoL3hzLb7qNxrGAAAAAElFTkSuQmCC'} className={`w-10 h-10 rounded-full object-cover`}/>
                          <span className='text-[15px] font-semibold tracking-[0.5px]'>{info.data.username}</span>
                        </div>
                        <div className={`absolute top-[58px] mr-12 flex flex-col justify-center items-center p-0 space-y-[.7px] ${!bar ? 'hidden' : 'block'}`}>
                          <i className="fa-solid fa-caret-up fa-lg text-white"></i>
                          <div className='w-40 h-full py-2 space-y-2 bg-[rgba(0,0,0,.3)] rounded-lg border-[1px] border-white text-sm font-bold tracking-[-.2px] px-4'>
                            <NavLink to={'/dashboard'} className='flex items-center space-x-2'>
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAABJklEQVR4nO3UvyvFURjH8e/1I3YMysDdzJQymCQpBhlMMim7y3DzF4jBxCSllIkig9EfIAMpLMrMf/DSyaHT9f1+c8XmU596znme3uec56mTZf/6EFbxhMdfcmDVAngLszkHdqAPLVkTCqzAzAWjBXW84Bkr3z2gEIwp3OM2wntxiANUkroZLCUeKARjGNexBaG4HvcruMBcAl7AWuLBMvAxxmL8CY7rSZz+qBXep9oe40U8xJsGX+ImAewkueCJMvAV+mPcimr0EO7QlYC7k3w1uVAueBl7Oc/bwHrDXlPgCvZxhvkwLBzhBG0N4O+3omFQ29jEdNaESsF5Cs/NTXyty23FCHYL/BqGV5IfLQN3Y7zA5+gsyfcUgn9DKbj2J9/mv7KoN1NUE0YKWfoxAAAAAElFTkSuQmCC"/>
                              <span>Dashboard</span>
                            </NavLink>
                            <div className='flex items-center space-x-[10px] cursor-pointer' onClick={handleLogout}>
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjElEQVR4nM3V0QnCMBAA0CAOINhN3MkRXEK38CN1gw6R6khP8iNS60fTQzy4n8A9Ane5JNxwR1mYtaZP08CYGmO2FmUFWKLBIRrswkDscMYm8oYnZGxDwDe0f6FrwQ/0G4gDjgvygevvwObmiGlKDmlK6Nhgj0v0YHd/vxzK3GH4gq1PZmz4AmpNnoJPzdmI9IQCQIQAAAAASUVORK5CYII="/>
                              <span>Logout</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
            </div>
          </div>
          <div className='custom2:hidden block'>
            <i onClick={(e) => setClick((e) => !e)} className={isClicked ? ' fa-solid fa-xmark fa-2xl' : 'fa-solid fa-bars fa-2xl'} style={{color: '#ffffff'}}></i>
          </div>
      </nav>
      <div className={`z-40 custom2:hidden block fixed transition-all duration-1000 ease-out ${isClicked ? 'right-0' : '-right-80'} top-0 h-screen custom3:w-[50vw] w-screen  bg-gradient5 backdrop-blur`}>
        <div className='mt-28 text-white text-sm pl-10 space-y-12'>
          <div className='space-y-4'>
            <div>
              <div className='inline-block mr-8 w-0'><i className="fa-solid fa-home text-white"></i></div>
              <NavLink to={'/'}>Home</NavLink>
            </div>
            <div>
              <div className='inline-block mr-8 w-0'><i className="fa-solid fa-graduation-cap text-white"></i></div>
              <NavLink to={'/courses'}>Courses</NavLink>
            </div>
            <div>
              <div className='inline-block mr-8 w-0'><i className="fa-solid fa-comments text-white"></i></div>
              <NavLink to={'/contact'}>Contact us</NavLink>
            </div>
            {isLogin &&
            <div>
              <img className='inline-block mr-3' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAABJklEQVR4nO3UvyvFURjH8e/1I3YMysDdzJQymCQpBhlMMim7y3DzF4jBxCSllIkig9EfIAMpLMrMf/DSyaHT9f1+c8XmU596znme3uec56mTZf/6EFbxhMdfcmDVAngLszkHdqAPLVkTCqzAzAWjBXW84Bkr3z2gEIwp3OM2wntxiANUkroZLCUeKARjGNexBaG4HvcruMBcAl7AWuLBMvAxxmL8CY7rSZz+qBXep9oe40U8xJsGX+ImAewkueCJMvAV+mPcimr0EO7QlYC7k3w1uVAueBl7Oc/bwHrDXlPgCvZxhvkwLBzhBG0N4O+3omFQ29jEdNaESsF5Cs/NTXyty23FCHYL/BqGV5IfLQN3Y7zA5+gsyfcUgn9DKbj2J9/mv7KoN1NUE0YKWfoxAAAAAElFTkSuQmCC"/>
              <NavLink to={'/dashboard'}>Dashboard</NavLink>
            </div>
            }
          </div>
          <div className='space-y-4'>
            {!isLogin ? (
            <>
              <div>
                <div className='inline-block mr-8 w-0'><i className="fa-solid fa-door-open text-white"></i></div>
                <NavLink to={'/login'}>Login</NavLink>
              </div>
              <div className=''>
                <div className='inline-block mr-8 w-0'><i className="fa-solid fa-arrow-right-to-bracket text-white"></i></div>
                <NavLink to={'/register'}>Register</NavLink>
              </div>
            </>
            ):(
              <>
                <NavLink to={'/dashboard'} className='flex items-center space-x-2 -ml-[3px]'>
                  <img src={info.data.profile || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFE0lEQVR4nO2ay29VVRTGL23BgkTbgi0gKL4iKOCLP4FEJKmIxoGgcWAUR9LWgRODJoao4ABD1TgxToxEJwK+U4114KMioAMtPoM8oinWxMQWKZefWfY7YXlz7jl7n56CGlZyc29y1rfW3mevtfZ63ErlLP1PCWgBbgY2A7uAr4EhYFQf+/0VsFM8ncD5lX8DAecA64C3gRPEk2HeAtaarMoZ2EAz0AMcdos6BnwAPAKsAa4GZom3Wb+XALeKpx/40+EPAV3Ge7o2cRPwnVvA58B6oLWArFZh9zh53wI3TvYpPOsUmvKVJcmeohe0z8nfVrq5AR3AbikYATYAjaUqGdfTBHQrOBgNAO1lCV+o4zYaBJbm8F8BbAT6gCPynT8UxZ4GLg7QeQ3wjXTa98IyTiLZxCfmsDn2/iJQzYlUvwN3Aefl6J4NfOo20z4Rn0jM6WNgZgbvXL3xZKEvyOYXATP0sYj1uAvTZj5b7VmG3JluMwOFfAZ4zpnTrBxH7XcR7KIcuXfr3jkuzIdZC2T8ZBIz643dxCrn2Hk+sVq8Q1kbTsEt0d1h9FAO77UuAISFZmA68L1ADwTwvyTentBNOKylKUYHAni7nb/kmxjwoLsnckMs8Kv4L4vYgzdLO0mjeQGh+Qvxbghx8MOhRwicmzh47CacjPckY0WEyR/KPBXgTjHuDlzEAvEfjFy/l2GZslFn4Akm6cwdWYzviunewEW0J28ocv1pOoPSHeB+8b+ZdaGd0E3cEii0UReghdIpkXtIZCT3z7JA/jZlzWOp9QxwiwS+H7mQn4S7MAbnfOy4FjY9Atdf1xyBp/RwY+RiXhNudQxO2BXCfhSJe1S4zWkPXy+yIGCTcJticMI+JuzWSNwa4XamPUzSgMURAhtckfVwzGJq3qwlpg0ROKs+jQbTHh7Vw5g0Y54wwxHrr5UxLBlzIzCWfxkNpT1M6udpEQKnKR+rhka6lEhZlYypkU0Po2OlbEQ464IgH1segVvu/DL9Tii4kcS02iKFXgf8IuwTEbgnhfnZZETqnJ1lWomzL4oRKuwNwu6LwCQJYNQmjICrspy9UPh10etgaKqh6tHoQJGMgFOX967SLkSHt+aa0Q9Zjq/WqvHkp+N1SA2+uhdioRTF4ae6+np/QG41EBOpPKmjWTdFiU4aM9L6agZP0mVZUFBHW2bSWJNS31dQSVJonczgOSmeGQV1rM8N2a6w2lNQidm/0WgGj504RUYK/LOwWptX6h4JjT51uoxGRzN4kvvq8gLyVwWVujXNB2soN0Uome+cfUcG3w7X9JsfIb8J+DI42tW0g7oC+Jda40z5UhJ+6zqyNfBc+B0RNrc6ZHweE94OqjnC0TQlqtWtI/+Z+P6OVMD2kOxZkeflmj7xXvWu5pTSoEtpme633MYJ3K7Ql9BvwDPWOYxScKqu2OZ6Y+gKeBW4XjwXuEZ6XMu0ThO7173BMbVxbi9jVKZs9jb5T/KSqnqZNgUo3sR2b8NOBCf8FeDKiS4+Zx7zfM2pWxXaMVHBlzrn/zGvqV0GActcQLBNXFKW4DkaGaDpU/ckjd4aFZ1GnDl1lK2k2QUAdMOWNn1Var/Xye+d1Nl7nfH0PQVr9hZha8fTKydn9emXZo9LZ1DHsE8tHpt7LFZG3aBPqyq7TvH0uakVmgJ0nbY/DKSYmyWa70zwLxzrzshfODLMxMZwW4A3NHscVhgd0+9BPdsi3kJ1z1mq/AfoL3hzLb7qNxrGAAAAAElFTkSuQmCC'} className={`w-6 h-6 rounded-full object-cover`}/>
                  <span className='text-[15px] font-semibold tracking-[0.5px]'>{info.data.username}</span>
                </NavLink>
                <div className='flex items-center space-x-[10px] cursor-pointer' onClick={handleLogout}>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjElEQVR4nM3V0QnCMBAA0CAOINhN3MkRXEK38CN1gw6R6khP8iNS60fTQzy4n8A9Ane5JNxwR1mYtaZP08CYGmO2FmUFWKLBIRrswkDscMYm8oYnZGxDwDe0f6FrwQ/0G4gDjgvygevvwObmiGlKDmlK6Nhgj0v0YHd/vxzK3GH4gq1PZmz4AmpNnoJPzdmI9IQCQIQAAAAASUVORK5CYII="/>
                  <span>Logout</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

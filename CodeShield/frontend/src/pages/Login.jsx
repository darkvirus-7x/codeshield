/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Back from '../components/Back';
import Logo from '/logo.png'; // Make sure to provide the correct path to your logo image
import { MyContext } from '../data/context';
import Alert from '../components/Alert';
import Cookies from 'universal-cookie'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAMessage] = useState('');
    const [color, setColor] = useState('');
    const [hide,setHide] = useState('')
    const cookie = new Cookies()
    const data = useContext(MyContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let updatedColor = '';
        let updatedAlertMessage = '';

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            updatedAlertMessage = 'Please Enter a valid Email';
            updatedColor = 'red';
        } else if (password === '') {
            updatedAlertMessage = 'Please Enter Your Password';
            updatedColor = 'red';
        } else {
            try {
                const response = await axios.post('http://localhost:8000/api/login', { email, password });
                cookie.set('code',response.data.token)
                updatedAlertMessage = response.data.message;
                updatedColor = 'green';
                setTimeout(() => {
                    <NavLink to={'/'}/>
                    console.log(1)
                }, 1000)
            } catch (err) {
                console.log(err);
                updatedAlertMessage = err.response.data.message || 'An error occurred during login';
                updatedColor = 'red';
            }
        }

        setAMessage(updatedAlertMessage);
        setColor(updatedColor);

        data.setOpa({
            opacity: true,
            color: updatedColor,
            message: updatedAlertMessage,
        });
    };

    return (
        <>
            <Back />
            <div className='flex w-full h-screen justify-center items-center'>
                <div className='w-[400px] p-5 h-auto bg-[url("/blob-scene-haikei.svg")] bg-cover bg-center shadow-custom2 rounded-xl flex flex-col items-center px-4 text-white'>
                    <div>
                        <img src={Logo} className='sm:ml-6 ml-2 w-44' alt='CodeShield Logo' />
                        <div className='text-center -mt-10 font-extrabold tracking-[0.5px] sm:text-xl text-lg'>Login to CodeShield</div>
                    </div>
                    <form onSubmit={handleSubmit} className=' space-y-3'>
                        <input placeholder='Email' type='text' onChange={(e) => setEmail(e.target.value)} value={email} className='w-full p-2 py-3 resize-none outline-none bg-transparent border-b-[1.5px] border-[rgba(255,255,255,.5)]' />
                        <div className='flex items-center'>
                            <input placeholder='Password' type={hide ? 'password' : 'text'} onChange={(e) => {setPassword(e.target.value);setHide(true)}} value={password} className='w-full py-2  p-2 resize-none outline-none bg-transparent border-b-[1.5px] border-[rgba(255,255,255,.5)]'/>
                            <i className={`text-white fa-regular fa-eye${hide !== '' ? hide ? '-slash' : '' : ' hidden'} -ml-6 cursor-pointer`} onClick={() => setHide((e) => !e)}></i>
                        </div>
                        <button className='w-[350px] rounded py-2 bg-blue-500 hover:bg-blue-600'><i className="fa-solid fa-arrow-right-to-bracket fa-lg" style={{ color: '#ffffff' }} /> Login</button>
                    </form>
                    <NavLink to={'/register'} className='mt-5 text-sm underline hover:no-underline'>Don't Have An Account ?</NavLink>
                    <a href='http://localhost:8000/api/google' className='mt-5 space-x-2 flex items-center justify-center ml-2 bg-white text-black px-2 py-[.5px] rounded cursor-pointer transition-all duration-750 hover:scale-[1.02]'>
                        <svg className='inline-block' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                        <span className='font-bold'>Continue with Google</span>
                    </a>
                </div>
                <Alert />
            </div>
        </>
    );
}

/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Back from '../components/Back';
import Alert from '../components/Alert';
import { MyContext } from '../data/context';
import Cookies from 'universal-cookie'

export default function Register() {
    const user = useOutletContext()
    user.login && (location.pathname = '/')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [image, setImage] = useState('');
    const [alert,setAlert] = useState(false)
    const [hide,setHide] = useState('')
    const cookie = new Cookies()
    const data = useContext(MyContext);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const isImage = selectedFile.type.split('/')[0] === 'image'
        if (isImage && !selectedFile.type.includes('xml' || 'svg')) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }else {
            setAlert(true)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let updatedColor = '';
        let updatedAlertMessage = '';
        
        if (name === '') {
            updatedAlertMessage = 'Please Enter Your Name';
            updatedColor = 'red';
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            updatedAlertMessage = 'Please Enter a valid Email';
            updatedColor = 'red';
        } else if (password === '') {
            updatedAlertMessage = 'Please Enter Your Password';
            updatedColor = 'red';
        } else {
            const form = new FormData();
            form.append('username', name);
            form.append('email', email);
            form.append('password', password);
            form.append('profile', file);
            try {
                const response = await axios.post('http://localhost:8000/api/register', form);
                cookie.set('code',response.data.data.token)
                updatedAlertMessage = 'Account Created';
                updatedColor = 'green';
                setTimeout(() => {
                    location.pathname = '/'
                }, 1000);
            } catch (err) {
                updatedAlertMessage = err.response.data.message;
                updatedColor = 'red';
            }
        }
        
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
                <div className='w-auto h-auto m-3 p-3 bg-[url("/blob-scene-haikei.svg")] bg-cover bg-center shadow-custom2 rounded-xl flex flex-col items-center px-4 text-white'>
                    <div>
                        <div className='text-center mb-4 mt-10 font-extrabold tracking-[0.5px] sm:text-xl text-lg'>Register to CodeShield</div>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} className=' space-y-3'>
                        <input placeholder='Name' type='text' onChange={(e) => setName(e.target.value)} value={name} className='w-full p-2 py-2 resize-none outline-none bg-transparent border-b-[1.5px] border-[rgba(255,255,255,.5)]'/>
                        <input placeholder='Email' type='text' onChange={(e) => setEmail(e.target.value)} value={email} className='w-full p-2 py-2 resize-none outline-none bg-transparent border-b-[1.5px] border-[rgba(255,255,255,.5)]'/>
                        <div className='flex items-center'>
                            <input placeholder='Password' type={hide ? 'password' : 'text'} onChange={(e) => {setPassword(e.target.value);setHide(true)}} value={password} className='w-full py-2  p-2 resize-none outline-none bg-transparent border-b-[1.5px] border-[rgba(255,255,255,.5)]'/>
                            <i className={`text-white fa-regular fa-eye${hide !== '' ? hide ? '-slash' : '' : ' hidden'} -ml-6 cursor-pointer`} onClick={() => setHide((e) => !e)}></i>
                        </div>
                        <div className='flex flex-col justify-center items-center space-y-2'>
                            <img src={image} className={`${image ? 'block' : 'hidden'} object-cover w-28 h-28 rounded-full`} alt='image'/>
                            <input onChange={handleFileChange} accept='image' type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "/>
                            <div className={`text-red-500 text-[15px] ${alert ? 'block' : 'hidden'}`}>You can just Upload  Image</div>
                        </div>
                        <button className='w-full rounded py-2 bg-blue-500 hover:bg-blue-600'><i className="fa-solid fa-arrow-right-to-bracket fa-lg" style={{color: '#ffffff'}} /> Register</button>
                    </form>
                    <NavLink to={'/login'} className='mt-5 text-sm underline hover:no-underline'>Already Have An Account ?</NavLink>
                    <a href='http://localhost:8000/api/google' className='mt-5 space-x-2 flex items-center justify-center ml-2 bg-white text-black px-2 py-[.5px] rounded cursor-pointer transition-all duration-750 hover:scale-[1.02]'>
                        <svg className='inline-block' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                        <span className='font-bold'>Continue with Google</span>
                    </a>
                </div>
            </div>
            <Alert />
        </>
    );
}

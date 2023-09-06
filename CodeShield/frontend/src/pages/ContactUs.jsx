import React from 'react'
import ContactLogo from '/contact_us.svg'
import Navbar from '../components/Navbar'
import { NavLink, useOutletContext } from 'react-router-dom'
import Alert from '../components/Alert'
import { MyContext } from '../data/context'
export default function ContactUs() {
    const data = React.useContext(MyContext)
    const [name,setName] = React.useState("")
    const [email,setEmail] = React.useState("")
    const [message,setMessage] = React.useState("")
    const [alertMessage,setAMessage] = React.useState("")
    const [color,setColor] = React.useState("")
    const userdata = useOutletContext()
    React.useEffect(() => {
        if (userdata.login) {
            setName(userdata.data.username)
            setEmail(userdata.data.email)
        }
    },[userdata])
    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedColor = '';
        let updatedAlertMessage = '';
    
        if (name === '') {
            updatedAlertMessage = 'Please Enter Your Name';
            updatedColor = 'red';
        } else if (email === '' || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            updatedAlertMessage = 'Please Enter a valid Email';
            updatedColor = 'red';
        } else if (message === '') {
            updatedAlertMessage = 'Please Enter Your Message';
            updatedColor = 'red';
        } else {
            updatedAlertMessage = 'Message Sent!';
            updatedColor = 'green';
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
        <div>
            <div>
                <Navbar page={'co'} data={userdata}/>
            </div>
            <div className='flex justify-center items-center w-full h-screen'>
            <div className='w-[620px] h-[430px] sm:bg-color6 rounded mt-20'> 
                <div className='flex justify-center sm:flex-row flex-col items-center h-full w-full space-x-2 p-4'>
                    <div>
                        <img src={ContactLogo} className='w-3/4'/>
                    </div>
                    <div className='flex flex-col items-center space-y-2 h-full w-full py-4 text-white '>
                        <NavLink to={'/contact'} className='text-sm text-center tracking-[0.5px] underline hover:no-underline cursor-pointer text-blue-100'>Have you a Question ?</NavLink>
                        <div className='text-lg trakcing-[.5px] flex items-center space-x-3'><span>Contact us</span><span className="material-icons">mail</span></div>
                        <form onSubmit={(e) => handleSubmit(e)} className=' space-y-3'>
                            <input placeholder='Name' type='text' onChange={(e) => !userdata.data.username && setName(e.target.value)} value={name} className='w-full px-2 resize-none py-1 outline-none bg-transparent border-b-[1.5px] border-[rgba(255,255,255,.5)]'/>
                            <input placeholder='Email' type='text' onChange={(e) => !userdata.data.email && setEmail(e.target.value)} value={email} className='w-full px-2 resize-none py-1 outline-none bg-transparent border-b-[1.5px] border-[rgba(255,255,255,.5)]'/>
                            <textarea placeholder='Message' onChange={(e) => setMessage(e.target.value)} value={message} className='w-full h-24 px-2 resize-none py-1 outline-none bg-transparent border-b-[1.5px] border-[rgba(255,255,255,.5)]'/>
                            <button className='w-full rounded py-2 bg-blue-500 hover:bg-blue-600'><i className="fa-solid fa-paper-plane" style={{color: "#fff"}}></i> Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <Alert/>
            </div>
        </div>
    )
}

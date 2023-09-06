/* eslint-disable react/no-unescaped-entities */
import axios from 'axios'
import React from 'react'
import { useOutletContext } from 'react-router-dom'
import Cookies from 'universal-cookie'

export default function Profile() {
    const data = useOutletContext()
    const [username,setUsername] = React.useState({isEdit:false,username: data.data.username})
    const [email,setEmail] = React.useState({isEdit:false,email: data.data.email})
    const [file,setFile] = React.useState()
    const [image,setImage] = React.useState(data.data.profile)
    const [oldPass,setOldPass] = React.useState({error:false})
    const [newPass, setnewPass] = React.useState({error:false});
    const [alert,setAlert] = React.useState(false)
    const cookie = new Cookies()
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
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = new FormData()
        if (oldPass) {
            if (!newPass) {
                setAlert({alert:true,message: 'Password doesn\'t  Match'})
            }else {
                form.append('username',username.username)
                form.append('email',email.email)
                form.append('profile',file)
                if (oldPass.password !== undefined) {
                    form.append('oldpassword', oldPass.password);
                }
                if (newPass.password !== undefined) {
                    form.append('newpassword', newPass.password);
                }
                changeData(form)
            }
        }
    }
    const changeData = (form) => {
        axios.post('http://localhost:8000/api/changedata', form, {
            headers: {
                Authorization: cookie.get('code')
            }
        })
        .then((e) => {cookie.set('code',e.data.token);location.reload()})
        .catch(err => {setAlert({alert:true,message:err.response.data.message})})
    }
    return (
        <div className='flex flex-col w-full pt-20 items-center space-y-6'>
            <div className=''>
                <input type='file' id='inputFile' hidden onChange={(e) => handleFileChange(e)}/>
                <div className='flex items-end'>
                    <img src={image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFE0lEQVR4nO2ay29VVRTGL23BgkTbgi0gKL4iKOCLP4FEJKmIxoGgcWAUR9LWgRODJoao4ABD1TgxToxEJwK+U4114KMioAMtPoM8oinWxMQWKZefWfY7YXlz7jl7n56CGlZyc29y1rfW3mevtfZ63ErlLP1PCWgBbgY2A7uAr4EhYFQf+/0VsFM8ncD5lX8DAecA64C3gRPEk2HeAtaarMoZ2EAz0AMcdos6BnwAPAKsAa4GZom3Wb+XALeKpx/40+EPAV3Ge7o2cRPwnVvA58B6oLWArFZh9zh53wI3TvYpPOsUmvKVJcmeohe0z8nfVrq5AR3AbikYATYAjaUqGdfTBHQrOBgNAO1lCV+o4zYaBJbm8F8BbAT6gCPynT8UxZ4GLg7QeQ3wjXTa98IyTiLZxCfmsDn2/iJQzYlUvwN3Aefl6J4NfOo20z4Rn0jM6WNgZgbvXL3xZKEvyOYXATP0sYj1uAvTZj5b7VmG3JluMwOFfAZ4zpnTrBxH7XcR7KIcuXfr3jkuzIdZC2T8ZBIz643dxCrn2Hk+sVq8Q1kbTsEt0d1h9FAO77UuAISFZmA68L1ADwTwvyTentBNOKylKUYHAni7nb/kmxjwoLsnckMs8Kv4L4vYgzdLO0mjeQGh+Qvxbghx8MOhRwicmzh47CacjPckY0WEyR/KPBXgTjHuDlzEAvEfjFy/l2GZslFn4Akm6cwdWYzviunewEW0J28ocv1pOoPSHeB+8b+ZdaGd0E3cEii0UReghdIpkXtIZCT3z7JA/jZlzWOp9QxwiwS+H7mQn4S7MAbnfOy4FjY9Atdf1xyBp/RwY+RiXhNudQxO2BXCfhSJe1S4zWkPXy+yIGCTcJticMI+JuzWSNwa4XamPUzSgMURAhtckfVwzGJq3qwlpg0ROKs+jQbTHh7Vw5g0Y54wwxHrr5UxLBlzIzCWfxkNpT1M6udpEQKnKR+rhka6lEhZlYypkU0Po2OlbEQ464IgH1segVvu/DL9Tii4kcS02iKFXgf8IuwTEbgnhfnZZETqnJ1lWomzL4oRKuwNwu6LwCQJYNQmjICrspy9UPh10etgaKqh6tHoQJGMgFOX967SLkSHt+aa0Q9Zjq/WqvHkp+N1SA2+uhdioRTF4ae6+np/QG41EBOpPKmjWTdFiU4aM9L6agZP0mVZUFBHW2bSWJNS31dQSVJonczgOSmeGQV1rM8N2a6w2lNQidm/0WgGj504RUYK/LOwWptX6h4JjT51uoxGRzN4kvvq8gLyVwWVujXNB2soN0Uome+cfUcG3w7X9JsfIb8J+DI42tW0g7oC+Jda40z5UhJ+6zqyNfBc+B0RNrc6ZHweE94OqjnC0TQlqtWtI/+Z+P6OVMD2kOxZkeflmj7xXvWu5pTSoEtpme633MYJ3K7Ql9BvwDPWOYxScKqu2OZ6Y+gKeBW4XjwXuEZ6XMu0ThO7173BMbVxbi9jVKZs9jb5T/KSqnqZNgUo3sR2b8NOBCf8FeDKiS4+Zx7zfM2pWxXaMVHBlzrn/zGvqV0GActcQLBNXFKW4DkaGaDpU/ckjd4aFZ1GnDl1lK2k2QUAdMOWNn1Var/Xye+d1Nl7nfH0PQVr9hZha8fTKydn9emXZo9LZ1DHsE8tHpt7LFZG3aBPqyq7TvH0uakVmgJ0nbY/DKSYmyWa70zwLxzrzshfODLMxMZwW4A3NHscVhgd0+9BPdsi3kJ1z1mq/AfoL3hzLb7qNxrGAAAAAElFTkSuQmCC'} className='w-24 h-24 rounded-full object-cover'/>
                    <label htmlFor='inputFile' className='mt-1 -ml-6 cursor-pointer'>
                        <i className="fa-solid fa-pen bg-white p-[5px] rounded-full"/>
                    </label>
                </div>
            </div>
            <div>
                <form onSubmit={(e) => handleSubmit(e)} className=' space-y-4 text-white'>
                    <div className='flex md:flex-row flex-col text-white md:space-x-16 items-centers md:space-y-0 space-y-2'>
                        <div className='space-y-2'>
                            <div className='flex items-center space-x-2 bg-[rgba(0,0,0,.5)] w-full rounded pr-3'>
                                <input id="1"  readOnly={!username.isEdit} onChange={(e) => setUsername({...username,username:e.target.value})} value={username.username} className=' p-2 px-3 pr-4 resize-none bg-transparent outline-none  rounded'/>
                                <i  onClick={() => {setUsername({...username,isEdit: !username.isEdit});document.getElementById('1').focus()}} className="fa-solid fa-pen cursor-pointer  -ml-6 " />
                            </div>
                            <div className='flex items-center space-x-2 bg-[rgba(0,0,0,.5)] w-full rounded pr-3'>
                                <input id='2' readOnly={!email.isEdit} onChange={(e) => setEmail({...email,email:e.target.value})} value={email.email} className={`p-2 px-3 pr-4 resize-none bg-transparent outline-none  rounded ${data.data.isGoogle && 'cursor-not-allowed'}`}/>
                                <i onClick={() => {!data.data.isGoogle &&  setEmail({...email,isEdit: !email.isEdit});document.getElementById('2').focus()} } className={`fa-solid  cursor-${data.data.isGoogle ? 'not-allowed' : 'pointer' } fa-pen -ml-`} />
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <div className={`space-x-2 bg-[rgba(0,0,0,.5)] w-full rounded pr-3`}>
                                <input readOnly={data.data.isGoogle} value={oldPass.password} onChange={(e) => setOldPass({...oldPass,password:e.target.value})} className={`p-2 px-3 pr-4 resize-none ${data.data.isGoogle && 'cursor-not-allowed'} bg-transparent outline-none rounded`} placeholder='Password...'/>
                            </div>
                            <div className={`space-x-2 bg-[rgba(0,0,0,.5)] w-full rounded pr-3`}>                                
                                <input readOnly={data.data.isGoogle} value={newPass.password} onChange={(e) => setnewPass({...newPass,password:e.target.value})} className={`p-2 px-3 pr-4 resize-none ${data.data.isGoogle && 'cursor-not-allowed'} bg-transparent  outline-none  rounded`} placeholder='New Password...'/>
                            </div>
                        </div>
                    </div>
                    <div className={`w-full flex items-center space-x-2 justify-center rounded`}>
                        <button className='md:w-2/4 w-full rounded bg-blue-500 p-2 hover:bg-blue-600'>Submit</button>
                    </div>
                    <div className={`text-center text-red-500 ${!alert.alert ? 'hidden' : 'block'}`}>{alert.message}</div>
                </form>
            </div>
        </div>
    )
}

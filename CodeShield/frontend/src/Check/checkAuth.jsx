import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Outlet, Navigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Home from '../pages/Home';
export default function CheckAuth() {
    const [islogin,setlogin] = React.useState(false)
    const [loading,setLoading] = React.useState(true)
    const cookies = new Cookies();    
    React.useEffect(() => {
        if (cookies.get('code')) {
            axios.get('http://localhost:8000/api/getme',{
                headers: {
                    Authorization: cookies.get('code')
                }
            }).then((e) => {setlogin(true)})
            .catch(() => {cookies.remove('code')}) 
            .finally(() => setLoading(false))
        }else {
            setLoading(false)
        }
    }, []);
    console.log(islogin)
    return loading ? <Loading/> : islogin ? location.pathname = '/' : <Outlet/>
}

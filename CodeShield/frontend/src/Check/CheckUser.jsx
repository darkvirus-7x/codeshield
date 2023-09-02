/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
export default function CheckUser() {
    const [islogin,setlogin] = React.useState(false)
    const [loading,setLoading] = React.useState(true)
    const [data,setData] = React.useState({})
    const cookies = new Cookies();    
    React.useEffect(() => {
        if (cookies.get('code')) {
            axios.get('http://localhost:8000/api/getme',{
                headers: {
                    Authorization: cookies.get('code')
                }
            }).then((e) => {setData({...e.data.data,login:true});setlogin(true)})
            .catch(() => {cookies.remove('code')}) 
            .finally(() => setLoading(false))
        }else {
            setLoading(false)
        }
    }, []);
    return loading ? <Loading/> : islogin ? <Outlet context={data}/> : <Outlet context={{login: false}}/>
}

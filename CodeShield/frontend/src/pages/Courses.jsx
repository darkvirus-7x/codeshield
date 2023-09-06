import axios from 'axios'
import React from 'react'
import Navbar from '../components/Navbar'
import { useOutletContext } from 'react-router-dom'
import Card from '../components/Course'
function Courses() {
    const [courses,setCourses] = React.useState([])
    const data = useOutletContext()
    React.useEffect(() => {
        axios.get('http://localhost:8000/api/courses')
        .then((e) => setCourses(e.data))
        .catch(err => console.log(err))
    },[])
    return (
        <>
            <Navbar page={'c'} data={data}/>
            <div className='flex mt-32  flex-wrap md:justify-start justify-center '>
                {courses.map((e, i) => {
                    return (
                        <Card id={e.id} img={e.images} title={e.title} companie={e.companie} rate={e.rate} price={e.price} key={i} />
                    );
                })}
            </div>
        </>
    )
}

export default Courses
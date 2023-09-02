/* eslint-disable no-unused-vars */
import React from 'react';
import Navbar from '../components/Navbar';
import { NavLink, useOutletContext } from 'react-router-dom';
import Card from '../components/Card';
import Terminal from '../components/Terminal';
import {cardsData, coursData} from '../data/cards'
import Course from '../components/Course'
import Logo from '/logo.png'
export default function Home() {
  const data = useOutletContext()
  return (
    <main>
        <Navbar page={'h'} data={data}/>
        <section className='mt-48 sm:ml-20 ml-5 text-white'>
          <div className=''>
            <h1 className='font-bold md:text-4xl md:w-2/4 text-2xl w-full'>Get Official Courses From Biggest Companies In Different Fields:</h1>
            <Terminal/>
          </div>
          <div className='mt-4'>
            <div className='text-base w-3/4 text-gray-300 tracking-base sm:w-2/4'>Cyber Security, Programming, Networking, Computer Science...</div>
          </div>
          <div className='mt-4'>
            <NavLink to={'/register'}>
              <button className="learn-more">
                <span className="circle" >
                  <span className="icon arrow" />
                </span>
                <span className="button-text">Learn More</span>
              </button>
            </NavLink>
          </div>
        </section>
        <section className='mt-80 grid custom1:grid-cols-4 sm:grid-cols-2 justify-items-center'>
        {
          cardsData.map((e,i) => {
            return (
                <Card img={e.img}  key={i} title={e.title} description={e.description} ways={e.ways}/>
            )
          })
        }
        </section>
        <section className='h-full mt-72 w-full bg-[url("/blob-scene-haikei.svg")] bg-no-repeat bg-cover bg-center p-10'>
          <div className='text-5xl text-center text-white font-extrabold tracking-[0.5px]'>Our Popular Courses</div>
          <div className=' flex m-4  justify-center mt-32 flex-wrap'>
            {
              coursData.map((e,i) => {
                return (
                    <Course img={e.img} title={e.name} companie={e.Companie} rate={e.Rate} price={e.Price} key={i}/>
                )
              })
            }
          </div>
        </section>
    </main>
  );
}

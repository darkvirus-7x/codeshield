/* eslint-disable react/prop-types */
import React from 'react'
import { MyContext } from '../data/context'

export default function Alert() {
    const data = React.useContext(MyContext)
    return (   
        <div className={`z-50 fixed right-0 top-28 ${!data.opa.opacity ? 'hidden' : 'block'}`}>
            <div className={`info bg-${data.opa.color}-700 rounded-l-lg shadow-sm flex items-center p-3 w-80`}>
            <div className="info__icon w-5 h-5 transform -translate-y-0.5 mr-2">
                {data.opa.color === 'red' ? <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" height={24} fill="none">
                <path fill="#fff" d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z" />
                </svg> : <svg className="succes-svg mt-[1px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
}
            </div>
            <div className="info__title font-semibold text-white text-sm">{data.opa.message}</div>
            <div onClick={(e) => data.setOpa({
                ...data.opa,
                opacity: false
            })} className="info__close ml-auto cursor-pointer">
                <svg height={20} viewBox="0 0 20 20" width={20} xmlns="http://www.w3.org/2000/svg">
                <path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#fff" />
                </svg>
            </div>
            </div>
        </div>
    )
}

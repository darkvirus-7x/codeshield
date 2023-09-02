import React from 'react'

export default function Terminal() {
    return (
            <div className='absolute w-96 right-[100px] h-full top-1/4 custom1:block hidden  opacity-50 animate-terminal'>
                <div className=' bg-slate-400 rounded-t-custom2 h-6 flex items-center'>
                    <div className='w-3 h-3 rounded-full bg-red-700 ml-2 cursor-pointer'></div>
                    <div className='w-3 h-3 rounded-full bg-yellow-400 ml-2 cursor-pointer'></div>
                    <div className='w-3 h-3 rounded-full bg-green-700 ml-2 cursor-pointer'></div>
                </div>
                <div className='bg-black h-80 rounded-b-custom2 p-10 opacity-0 animate-terminal'>
                        <div className='w-22'> 
                            <div>
                                <div className='w-96'>SELECT <span className='text-red-700'>*</span></div>
                            </div>
                            <div>
                                <div>FROM <span className='text-red-700'>World</span></div>
                            </div>
                            <div>
                                <div>WHERE <span className='text-red-700'>Someone</span></div>
                            </div>
                            <div>
                                <div>LIKE <span className='text-red-700'>%You%</span></div>
                            </div>
                            <div className='mt-5  ' >
                                <div>...</div>
                            </div>
                            <div>
                                <div>/&gt; no results!</div>
                            </div>
                        </div>
                </div>
            </div>
    )
}

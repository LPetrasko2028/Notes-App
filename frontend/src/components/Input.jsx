import React from 'react'

const Input = ({icon:Icon, ...props}) => {
  return (
    <div className='relative mb-6'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Icon className='size-5 text-green-500' />
        </div>
        <input
        {...props}
        className='w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-inner py-2 px-4 pl-10 text-gray-100 focus:outline-none focus:ring focus:ring-green-500'
        />
    </div>
  )
}

export default Input
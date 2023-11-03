import React from 'react'
import {SiConvertio} from 'react-icons/si'

const Nav = () => {
  return (
    <nav className='bg-emerald-300 text-gray-900 border-gray-200 fixed w-full z-20 top-0 left-0 border-b'>
      <div className="max-w-screen-xxl flex flex-wrap items-center justify-between p-3">
        <a href='/' className="flex items-center font-extrabold text-red-700 ">
        <SiConvertio/>  <span className='p-2'> Currency Converter</span>
        </a>
      </div>
    </nav>
  )
}

export default Nav
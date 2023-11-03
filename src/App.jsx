import React from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='text-red-600 flex flex-col'>
      <Nav/>
      <Hero/>
      <Footer/>
    </div>
  )
}

export default App
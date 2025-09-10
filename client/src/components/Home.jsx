import React from 'react'
import Navbar from './shared/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import useGetAllUsers from '@/hooks/useGetAllUsers'
import Footer from './shared/Footer'
import HeroSection from './HeroSection'
import AboutUs from './AboutUs'

const Home = () => {
  useGetAllUsers();
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <AboutUs/>
      <Footer/>
    </div>
  )
}

export default Home

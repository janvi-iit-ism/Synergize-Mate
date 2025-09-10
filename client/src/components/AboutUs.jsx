import React from 'react'
import upwards from './CardsImg/upwards.png'
import jigsaw from './CardsImg/jigsaw.png'
import { CheckCircle, Handshake, Lock, Users } from 'lucide-react'


const AboutUs = () => {
  return (
  
          <div className='bg-white mx-w-7xl'>
       
      <div className="flex mt-0 grid grid-cols-1 md:grid-cols-3 gap-0 p-6 mx-auto  max-w-7xl">
      {/* First Column */}
      <div className="bg-white p-6 rounded-lg shadow-xl">
      
        <img src={jigsaw} className='w-full h-full object-fill ' alt="jigsaw"></img>
        </div>
    

      {/* Second Column */}
      <div className="bg-slate-400 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700">
        The official NVCTI College Project Collaboration Platform is a user-friendly website for students and faculty to seamlessly connect and find teammates for projects. With advanced search filters, detailed profiles, and integrated collaboration tools, it fosters innovation and teamwork, ensuring successful project outcomes in a secure, supportive environment.</p>
      </div>

      {/* Third Column */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Find your Purpose</h2>
        <p className="text-gray-700 mb-4">Insides to the Website:</p>
        <ul className="list-disc list-inside space-y-2">
        <li className="flex items-start space-x-2">
        <CheckCircle className="text-green-500" />
        <div>
          <strong className="text-lg">Seamless Team Matching:</strong>
          <p className="text-gray-600">Find perfect teammates based on skills, interests, and expertise effortlessly.</p>
        </div>
      </li>
      <li className="flex items-start space-x-2">
        <Handshake className="text-green-500" />
        <div>
          <strong className="text-lg">Networking</strong>
          <p className="text-gray-600">Find perfect teammates based on skills, interests, and expertise effortlessly.</p>
        </div>
      </li>
          <li className="flex items-start space-x-2">
        <Lock className="text-green-500" />
        <div>
          <strong className="text-lg">Secure and Reliable</strong>
          <p className="text-gray-600">Find perfect teammates based on skills, interests, and expertise effortlessly.</p>
        </div>
      </li>
        </ul>
      </div>
    </div>

   </div>
    
  )
}

export default AboutUs

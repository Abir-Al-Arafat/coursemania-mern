import React from 'react'
import InstructorSidebar from '../../Molecules/Sidebar/Instructor';
import InstructorNavbar from '../../Molecules/Navbar/Instructor';

const InstructorLayout:React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <InstructorSidebar/>
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <InstructorNavbar/>
        {children}
      </div>
    </div>
  )
}

export default InstructorLayout
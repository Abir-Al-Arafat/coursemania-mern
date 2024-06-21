import React from 'react'
// import Sidebar from '../../Pages/LearnerDashboard/Sidebar';
import LearnerNavbar from '../../Molecules/Navbar/Learner'
import LearnerSidebar from '../../Molecules/Sidebar/Learner';

const LearnerLayout:React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className="flex bg-gray-100">
      <LearnerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <LearnerNavbar />
        <div className='mt-[75px] ml-[260px]'>
            {children}

        </div>
      </div>
    </div>

  )
}

export default LearnerLayout
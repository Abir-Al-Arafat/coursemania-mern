import React from 'react'
import { ToastContainer } from 'react-toastify';

const CustomToast: React.FC = () => {
  return (
    <ToastContainer 
        // style={{
        //     position: "fixed", 
        //     color: "white", 
        //     width: "150px", 
        //     display: "flex"
        // }}
        position="top-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    //     {message}
    // <ToastContainer />
    )
}

export default CustomToast
import React from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
      <div className='bank-container'>
            <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      theme='dark'
    />
        {props.children}
        {props.modal}
      </div>
  )
}


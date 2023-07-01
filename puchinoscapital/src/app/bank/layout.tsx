'use client'
import React from 'react';
import SideMenu from '@/components/SidebarMenu'
import { ToastContainer } from 'react-toastify'

export default function Layout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme='dark'
      />
      <div className='bank-container'>
        <SideMenu />
        {props.modal}
        {props.children}
      </div>
    </div>
  )
}


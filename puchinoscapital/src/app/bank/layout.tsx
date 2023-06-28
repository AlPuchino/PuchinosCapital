import React from 'react';
import SideMenu from '@/components/SidebarMenu'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className='bank-container'>
        <SideMenu />
        {children}
      </div>
  )
}


import React from 'react'
import Header from './_components/Header'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
        <Header/>
        <div className='pt-20 px-10 md:px-20 lg:px-40'>
      {children}
    </div>
    </div>
    
  )
}

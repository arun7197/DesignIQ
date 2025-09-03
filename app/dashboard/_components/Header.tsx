"use client";
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useContext } from 'react'
import { userDetailContext } from '@/app/_context/userDetailContext'
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const pathname = usePathname();
    const { userDetail, setUserDetail } = useContext(userDetailContext) as {
        userDetail: { credits: number } | null;
        setUserDetail: React.Dispatch<React.SetStateAction<{ credits: number } | null>>;
    };
    console.log(userDetail)
    
  return (
     <div className='flex items-center justify-between px-6 py-2 bg-white/80 backdrop-blur-sm border-b'>
      <div className='flex items-center space-x-3'>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={36}
            height={36}
            className='hover:scale-105 transition-transform'
          />
        </Link>
        <h2 className='text-xl font-semibold'>
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Design</span>
          <span className="text-blue-800">IQ</span>
        </h2>
      </div>

      <div className='flex items-center space-x-4'>
        {pathname !== '/dashboard' && (
          <Link href="/dashboard">
            <Button variant="ghost">Back to Dashboard</Button>
          </Link>
        )}
        <div className='hover:scale-105 transition-transform'>
          <UserButton />
        </div>
      </div>
    </div>
  )
}

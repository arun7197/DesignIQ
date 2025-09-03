import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function EmptyState() {
  return (
    <div className='flex items-center justify-center min-h-[60vh] flex-col gap-6 text-center max-w-md mx-auto px-4'>
        <div className='relative bg-gray-100 p-6 rounded-full'>
            <Image 
                src="/room.png" 
                alt="Empty room illustration"
                width={80} 
                height={80}
                className='opacity-80'
            />
        </div>
        <div className='space-y-2'>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
                Create New AI Interior Design
            </h2>
            <p className='text-gray-600'>
                Transform your room with our AI-powered interior design tool
            </p>
        </div>
    </div>
  )
}

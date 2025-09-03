"use client"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { Plus, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import EmptyState from './EmptyState';
import Link from 'next/link';
import { db } from '@/utils/db';
import { aiGeneratedImages } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import RoomCard from './RoomCard';

export default function Main() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetUserRoomList();
  }, [user])

  const GetUserRoomList = async () => {
    try {
      setIsLoading(true);
      const result = await db.select().from(aiGeneratedImages)
        .where(eq(aiGeneratedImages.userEmail, user?.primaryEmailAddress?.emailAddress));
      setUserRoomList(result);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8 bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Welcome back, {user?.fullName}
          </h2>
          <p className="text-gray-500">Manage and create your room designs</p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={GetUserRoomList}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Link href="dashboard/create-new">
            <Button className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 rounded-lg transition-all">
              <Plus className="h-4 w-4" />
              New Design
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : userRoomList.length === 0 ? (
        <EmptyState />
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRoomList.map((room, index) => (
              <RoomCard key={index} room={room} />
            ))}
          </div>
      )}
    </div>
  )
}

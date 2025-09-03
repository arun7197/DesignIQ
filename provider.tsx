"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { userDetailContext } from './app/_context/userDetailContext';

const provider = ({children}:{children:React.ReactNode}) => {

  const {user} = useUser();
  const [userDetail,setUserDetail] = useState()

  useEffect(()=>{
    user && isUser();
  },[user])

  const isUser =async ()=>{
    const data = await axios.post('/api/is-user',{user: user});
    setUserDetail(data.data.result)
  }
  return (
    <userDetailContext.Provider value={{userDetail,setUserDetail}}>
    <div>
      {children}
    </div>
    </userDetailContext.Provider>
  )
}

export default provider
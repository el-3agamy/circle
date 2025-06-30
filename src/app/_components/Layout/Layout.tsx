'use client'
import { getUserData } from '@/lib/slices/authSlice'
import { AppDispatch } from '@/lib/store'
import React, { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'


export default function Layout({children}:{children : ReactNode}) {

    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        
        dispatch(getUserData())
    } , [dispatch])
  return (
    <>{children}</>
  )
}

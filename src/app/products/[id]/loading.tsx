import React from 'react'
import { DotLoader } from 'react-spinners'

export default function LoadingPage() {
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
        <DotLoader />
        <p className='font-bold text-3xl my-3'>Loading . . .</p>
    </div>
  )
}

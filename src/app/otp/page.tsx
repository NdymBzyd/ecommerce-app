"use client"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/card'


export default function OTPPage() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  interface Inputs{
    resetCode:string;
  }
  const {register, handleSubmit, formState:{errors} } = useForm<Inputs>()
  const router = useRouter();

  async function onSubmit(values: Inputs){
    console.log(values, "resetcode");
    setIsLoading(true);
    
    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
      console.log(response);
      if (response.status === 200){
        router.push("/reset-password")
      }

    } catch (error : unknown) {

      if (axios.isAxiosError(error)){
        console.log(error.response?.data.message);
        setErrorMessage(error.response?.data.message || "Something went wrong");
        
      }
    } finally {
      setIsLoading(false);
    }

  }


  return (

<Card className='w-1/4 mx-auto my-40 bg-gradient-to-br from-slate-600 to-pink-800 shadow-lg'>
<div className='px-10 text-black'>
        <h2 className="text-3xl font-bold my-5 text-slate-50 text-shadow-lg/30">Verification Code</h2>
        <p className='text-slate-50 text-shadow-lg/30'>{`Thank you. An email will be sent containing the verification code to reset your password. Please do not share this code with anyone.`}</p>
        {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>

        <Input type='text' placeholder='Enter your code . . .' className='p-5 my-5 bg-blue-50'
        {...register("resetCode", {required:"Verification code is required."},)} />
        {errors.resetCode && <p className='text-red-600'>{errors.resetCode.message}</p>}


        <Button type='submit' disabled={isLoading} className='px-7 hover:bg-slate-900 hover:text-white'>{`Verify code`}</Button>
        </form>
        <div className='mt-[-30px] w-full text-end'>
                <Link href="/login" className="text-cyan-300 underline hover:text-blue-600">
                Back to login
                </Link>
            </div>    
    </div>

</Card>

  )
}

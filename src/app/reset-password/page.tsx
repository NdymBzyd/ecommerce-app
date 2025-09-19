"use client"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'


export default function ResetPasswordPage() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  interface Inputs{
    email:string;
    newPassword:string;
  }
  const { register, handleSubmit, formState: { errors }, watch } = useForm<Inputs>({
    mode: "onChange"
  })
  const router = useRouter();

  async function onSubmit(values: Inputs){
    console.log(values,"reset password");
    setIsLoading(true);

    try {
      const response = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      console.log(response);
      if (response.status === 200){
        router.push("/login")
      }

    } catch (error : unknown) {

      if (axios.isAxiosError(error)){
        console.log(error.response?.data.message);
        setErrorMessage(error.response?.data.message);
        
      }
    } finally {
      setIsLoading(false);
    }

  }


  return (

<Card className='w-1/4 mx-auto my-40 bg-gradient-to-br from-slate-600 to-pink-800 shadow-lg'>
<div className='px-10 text-black'>
        <h2 className="text-3xl font-bold my-5 text-slate-50 text-shadow-lg">Reset password</h2>
        {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>


        <Input type='email' placeholder='Your Email . . .' className='p-5 my-5 bg-blue-50'
        {...register("email", {required:"Email is required."})} />
        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}


        <Input type='password' placeholder='New Password . . .' className='p-5 my-5 bg-blue-50'
            {...register("newPassword", {
              required: "Password is required.",
              pattern: {
                value: /^[A-Za-z][A-Za-z0-9]{5,8}$/,
                message: "Password must start with a letter, be 6-9 characters, and no special characters."
              }
        })} />
        {errors.newPassword && <p className='border rounded-xl p-2 my-4 bg-red-500 text-white'>{errors.newPassword.message}</p>}


        <Button type='submit' disabled={isLoading} className='px-7 hover:bg-slate-900 hover:text-white'>{`Reset password`}</Button>
      </form>

    </div>

</Card>

  )
}

"use client"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link';
import { Card } from '@/components/ui/card'

export default function LoginPage() {

  
  const [errorMessage, setErrorMessage] = useState(null)

  interface Inputs{
    email:string;
    password:string;
  }
  const {register, handleSubmit, formState:{errors} } = useForm<Inputs>()
  const router = useRouter();

  async function onSubmit(values: Inputs){
    console.log(values,"login");
    try{
      const response = await signIn("credentials",{
        email:values.email,
        password:values.password,
        redirect:false
      })
      console.log(response);
      if(response?.ok){
        router.push("/")
      }
    }
    catch (error){
      console.log(error);
      
    }

  }



  return (
    <Card className='w-1/4 mx-auto my-40 bg-gradient-to-br from-slate-600 to-pink-800 shadow-lg'>
          <div className='px-10 text-black'>
        <h2 className="text-3xl font-bold my-5 text-slate-50 text-shadow-lg">Login</h2>
        {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>

        <Input type='email' placeholder='Your Email . . .' className='p-5 my-5 bg-blue-50'
        {...register("email", {required:"Email is required."})} />
        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}


        <Input type='password' placeholder='Your Password . . .' className='p-5 my-5 bg-blue-50'
        {...register("password", {required:"Password is required."})} />
        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

        <p className="text-start text-sm text-slate-50">Don't have an account?<span> </span>
          <Link href='/register'>
            <span className='text-cyan-300 underline'>Sign-Up!</span>
            </Link>
        </p>

        <Button type='submit' className='px-7 my-5'>Login</Button>
      </form>

    </div>

    </Card>
  )
}

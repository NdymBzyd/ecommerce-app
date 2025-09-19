"use client"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/card'


export default function RegisterPage() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  interface Inputs{
    name:string;
    email:string;
    password:string;
    rePassword:string;
    phone:string;
  }
  const {register, handleSubmit, formState:{errors}, watch } = useForm<Inputs>()
  const router = useRouter();

  async function onSubmit(values: Inputs){
    console.log(values,"signup");
    setIsLoading(true);

    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      console.log(response);
      if (response.status === 201){
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
        <h2 className="text-3xl font-bold my-5 text-slate-50 text-shadow-lg/30">Register</h2>
        {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type='text' placeholder='Your Name . . .' className='p-5 my-5 bg-blue-50'
        {...register("name", {required:"Name is required."})} />
        {errors.name && <p className='text-red-600'>{errors.name.message}</p>}


        <Input type='email' placeholder='Your Email . . .' className='p-5 my-5 bg-blue-50'
        {...register("email", {required:"Email is required."})} />
        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}


        <Input type='password' placeholder='Your Password . . .' className='p-5 my-5 bg-blue-50'
            {...register("password", {
              required: "Password is required.",
              pattern: {
                value: /^[A-Za-z][A-Za-z0-9]{5,8}$/,
                message: "Password must start with a letter, be 6–9 characters, and contain only letters and numbers."
              }
        })} />
        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

        <Input type='password' placeholder='Confirm Password . . .' className='p-5 my-5 bg-blue-50'
        {...register("rePassword", {required:"Confirming your Password is required.",
        validate: (value) => value === watch("password") || "Passwords do not match."
        })} />
        {errors.rePassword && <p className='text-red-600'>{errors.rePassword.message}</p>}

        <Input type='tel'
          onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ""); }}
          placeholder='Your phone number . . .' className='p-5 my-5 bg-blue-50'
        {...register("phone", {required:"Phone number is required."})} />
        {errors.phone && <p className='text-red-600'>{errors.phone.message}</p>}

        <p className="text-start text-sm text-slate-50">Already a member?<span> </span>
          <Link href='/login'>
            <span className='text-cyan-300 underline hover:text-blue-600'>Login here!</span>
            </Link>
        </p>


        <Button type='submit' disabled={isLoading} className='px-7 hover:bg-slate-900 hover:text-white'>{`Register`}</Button>
      </form>

    </div>

</Card>

  )
}

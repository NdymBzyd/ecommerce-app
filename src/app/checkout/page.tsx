"use client"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { watch } from 'fs'
import { useCart } from '../Context/CartContext'
import { getCashCheckout, getOnlineCheckout } from '@/actions/payment.action'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CheckOutPage() {
    interface Inputs{
        details: string;
        phone: number;
        city: string;
    }
    const [errorMessage, setErrorMessage] = useState(null)
    const { cartDetails, setCartDetails } = useCart()
    const cartId = cartDetails?.cartId
    const {register, handleSubmit, formState:{errors}, watch } = useForm<Inputs>()
    const router = useRouter();
    const [checkoutType, setCheckoutType] = useState<"cash" | "online"> ("cash")
  async function onSubmit(values: Inputs) {

      // console.log(checkoutType,"checkout type");
      // console.log(values,"checkout");
      
    if (checkoutType === "cash") {
      try {
        const response = await getCashCheckout(cartId as string, values)

        if (response?.status === 201) {
          setCartDetails(null)
          router.push('/thankyou')
        }
        console.log(response, "cash checkout response");
          
      } catch (error) {
        console.log(error);
      }

    } else if (checkoutType === "online") { 

        //online payment action
        try {
          const response = await getOnlineCheckout(cartId as string, values)
  
          if (response?.status === 200) {
            window.location.href = response?.data.session.url
          }
          console.log(response, "online checkout response");
            
        } catch (error) {
          console.log(error);
        }
  
      }
  }
  
  
    return (
      <>
            <div className='w-1/2 mx-auto my-10'>
          <h2 className="text-3xl tracking-tighter font-bold my-5">Checkout</h2>
          {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>

          <Input type='text' placeholder='Your Name . . .' className='p-5 my-5'
          {...register("details", {required:"Details is required."})} />
          {errors.details && <p className='text-red-600'>{errors.details.message}</p>}
  
          <Input type='text' placeholder='Your Name . . .' className='p-5 my-5'
          {...register("city", {required:"City is required."})} />
          {errors.city && <p className='text-red-600'>{errors.city.message}</p>}
  
          <Input type='tel' placeholder='Your phone number' className='p-5 my-5'
          {...register("phone", {required:"Phone number is required."})} />
          {errors.phone && <p className='text-red-600'>{errors.phone.message}</p>}
        <div>
          <RadioGroup onValueChange={(val)=> setCheckoutType(val as "online" | "cash")} defaultValue="cash">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash">Cash on delivery</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online">Online payment</Label>
            </div>
          </RadioGroup>
            </div>
            {checkoutType === "online" ? 
              <Button onClick={() => {
                localStorage.setItem("fromCheckout", "true");
              }} type='submit' className='px-7 my-5 bg-violet-700'>Pay with Stripe</Button> :
              <Button type='submit' className='px-7 my-5'>Proceed to Checkout</Button>
            }
        </form>
        </div>
      </>
    )
  }
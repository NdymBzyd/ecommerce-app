"use client"
import React, { useEffect, useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"
import Link  from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Badge } from "@/components/ui/badge"
import { useCart } from '@/app/Context/CartContext';
import { useWishlist } from '@/app/Context/WishlistContext';
import Image from 'next/image';

export default function Navbar() {

  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  },[lastScrollY] )

  const session = useSession()
  // console.log(session, "session at brands page");

  const { cartDetails } = useCart()
  // console.log(cartDetails, "cartDetails at navbar");

  const { wishlistDetails } = useWishlist()

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
      visible ? "translate-y-0" : "-translate-y-full"
    } py-4 drop-shadow-2xl text-white bg-gradient-to-br from-slate-600 to-slate-900`}>
          <NavigationMenu className='max-w-7xl mx-auto flex justify-between'>
        <NavigationMenuList>

          <NavigationMenuItem className='text-3xl font-bold tracking-tighter flex flex-row items-center'>
          <div className='w-[96px]'>
          <Image className='w-full' src='/logo/online-shop-logo-only.png' width={32} height={32} sizes='(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw' alt='logo-company-name' />
            </div>
            <h1 className='bg-gradient-to-l from-pink-700 to-teal-200 bg-clip-text text-transparent px-2'>Chic-Shack</h1>
        
    </NavigationMenuItem>
  </NavigationMenuList>

  <NavigationMenuList className='gap-7'>
    <NavigationMenuItem className='text-md font-bold gap-4 transition-all duration-200 hover:text-teal-400'>
        <Link href="/">Home</Link>
    </NavigationMenuItem>
    <NavigationMenuItem className='text-md font-bold gap-4 transition-all duration-200 hover:text-teal-400'>
        <Link href="/products">Products</Link>
    </NavigationMenuItem>
    <NavigationMenuItem className='text-md font-bold gap-4 transition-all duration-200 hover:text-teal-400'>
        <Link href="/categories">Categories</Link>
    </NavigationMenuItem>
    <NavigationMenuItem className='text-md font-bold gap-4 transition-all duration-200 hover:text-teal-400'>
        <Link href="/brands">Brands</Link>
    </NavigationMenuItem>
    
    </NavigationMenuList>
    
    <NavigationMenuList className='gap-4'>

      <NavigationMenuItem className='text-md font-bold gap-4 transition-all duration-200 hover:text-teal-400'>
          <Link href="/cart">
              <button className='relative cursor-pointer'>
                {cartDetails?.numOfCartItems >= 0 ? (
              <Badge className='bg-teal-800 rounded-full absolute top-[-18px] right-[-13px] text-[10px]'>{cartDetails?.numOfCartItems}</Badge>
              ):null}
            <ShoppingCart />
            </button>
            </Link>
      </NavigationMenuItem>

      <NavigationMenuItem className='text-md font-bold gap-4 transition-all duration-200 hover:text-rose-400'>
          <Link href="/wishlist">
              <button className='relative cursor-pointer'>
                {wishlistDetails?.count >= 0 ? (
              <Badge className='bg-pink-800 rounded-full absolute top-[-18px] right-[-13px] text-[10px]'>{wishlistDetails?.count}</Badge>
                ) :null }
                <Heart />
              </button>
            </Link>
      </NavigationMenuItem>

      {!session.data? <>
      <NavigationMenuItem className='text-md font-bold gap-4 transition-all duration-200 hover:text-teal-400'>
          <Link href="/login">Login</Link>
      </NavigationMenuItem>
      <NavigationMenuItem className='text-md font-bold gap-4 transition-all duration-200 hover:text-teal-400'>
          <Link href="/register">Register</Link>
      </NavigationMenuItem>
      </>
      :
      <NavigationMenuItem className='text-md font-bold gap-4 transition-all duration-200 hover:text-pink-800'>
          <Link href="/" onClick={()=> signOut({callbackUrl:"/login"})} >Logout</Link>
      </NavigationMenuItem>
      }

    <NavigationMenuList/>

  </NavigationMenuList>

</NavigationMenu>

    </div>
  )
}

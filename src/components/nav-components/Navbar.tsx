"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { Badge } from "@/components/ui/badge"
import { useCart } from '@/app/Context/CartContext'
import { useWishlist } from '@/app/Context/WishlistContext'
import Image from 'next/image'
import { getUserData } from '@/actions/user.action'

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [userName, setUserName] = useState<string | null>(null)
  const [mobileMenu, setMobileMenu] = useState(false)

  const session = useSession()
  const { cartDetails } = useCart()
  const { wishlistDetails } = useWishlist()

  const firstName = userName?.split(" ")[0] || null

  // Hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < lastScrollY)
      setLastScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Fetch user when session changes
  useEffect(() => {
    if (!session.data) {
      setUserName(null)
      return
    }

    const fetchData = async () => {
      try {
        const userData = await getUserData()
        if (userData?.decoded?.name) setUserName(userData.decoded.name)
      } catch (err) {
        console.log("User fetch error:", err)
      }
    }

    fetchData()
  }, [session.data])

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
      visible ? "translate-y-0" : "-translate-y-full"
    } py-4 drop-shadow-2xl text-white bg-gradient-to-br from-slate-600 to-slate-900`}>
      
      <NavigationMenu className="max-w-7xl mx-auto flex justify-between items-center px-4">

        {/* Logo */}
        <NavigationMenuList>
          <NavigationMenuItem className="text-3xl font-bold tracking-tighter flex flex-row items-center">
            <div className="w-[96px]">
              <Image className="w-full" src="/logo/online-shop-logo-only.png" width={32} height={32} alt="logo-company-name" />
            </div>
            <h1 className="bg-gradient-to-l from-pink-700 to-teal-200 bg-clip-text text-transparent px-2">Chic-Shack</h1>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* Desktop Links */}
        <NavigationMenuList className="hidden sm:flex gap-7">
          <NavigationMenuItem className='text-md font-bold transition-all duration-200 hover:text-teal-400'><Link href="/">Home</Link></NavigationMenuItem>
          <NavigationMenuItem className='text-md font-bold transition-all duration-200 hover:text-teal-400'><Link href="/products">Products</Link></NavigationMenuItem>
          <NavigationMenuItem className='text-md font-bold transition-all duration-200 hover:text-teal-400'><Link href="/categories">Categories</Link></NavigationMenuItem>
          <NavigationMenuItem className='text-md font-bold transition-all duration-200 hover:text-teal-400'><Link href="/brands">Brands</Link></NavigationMenuItem>
        </NavigationMenuList>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link href="/cart">
            <button className="relative cursor-pointer">
              {cartDetails?.numOfCartItems ? (
                <Badge className="bg-teal-800 rounded-full absolute -top-3 -right-3 text-[10px]">{cartDetails.numOfCartItems}</Badge>
              ) : null}
              <ShoppingCart className='transition-all duration-200 hover:text-teal-400' />
            </button>
          </Link>

          {/* Wishlist */}
          <Link href="/wishlist">
            <button className="relative cursor-pointer">
              {wishlistDetails?.count ? (
                <Badge className="bg-pink-800 rounded-full absolute -top-3 -right-3 text-[10px]">{wishlistDetails.count}</Badge>
              ) : null}
              <Heart className='transition-all duration-200 hover:text-pink-800' />
            </button>
          </Link>

          {/* User Menu */}
          {session.data ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-transparent border-0 hover:bg-slate-900 hover:text-white" variant="outline">{firstName}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 px-3 text-white bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" align="start">
                <DropdownMenuLabel>Welcome back!</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem><Link href="/allorders">My Orders</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/settings">Settings</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Link></DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
              <div className="hidden sm:flex gap-4">
                <div className='text-md font-bold gap-4 transition-all duration-200 hover:text-teal-400'>
                  <Link href="/login">Login</Link>
                </div>
                <div className='text-md font-bold gap-4 transition-all duration-200 hover:text-teal-400'>
                <Link href="/register">Register</Link>
                </div>
            </div>
          )}

          {/* Hamburger (mobile only) */}
          <Button className="sm:hidden bg-transparent" variant="outline" onClick={() => setMobileMenu(!mobileMenu)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenu && (
  <div className="absolute top-full right-0 w-48 bg-slate-700 text-white shadow-lg rounded-md p-4 flex flex-col gap-3 sm:hidden z-50 mt-2">
    {session.data ? (
      <>
        {/* Links for logged-in users */}
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/brands">Brands</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/wishlist">Wishlist</Link>
        <Link href="/settings">Settings</Link>
        <Link href="/" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Link>
      </>
    ) : (
      <>
        {/* Only show Login/Register if not logged in */}
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </>
    )}
  </div>
)}

      </NavigationMenu>
    </div>
  )
}

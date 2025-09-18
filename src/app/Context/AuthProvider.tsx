"use client"
import { SessionProvider } from "next-auth/react"
import CartContextProvider from './CartContext';
import { Toaster } from "react-hot-toast";
import WishlistContextProvider from "./WishlistContext";


export function AuthProvider({children}: {children: React.ReactNode}) {



  return (
    <>
      <SessionProvider>
        <WishlistContextProvider>
        <CartContextProvider>
        {children}
        </CartContextProvider>
        </WishlistContextProvider>

        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </SessionProvider>
    </>
  )
}
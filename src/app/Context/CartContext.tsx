"use client"
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getCart } from "../../actions/cart.action";
import { CartData } from "../types/cartDetails.model";

interface CartContextType{
    cartDetails: CartData | null
    fetchCart: () => Promise<void>
    setCartDetails: (cart: CartData | null) => void;
}

const CartContext = createContext<CartContextType>({
    cartDetails: null,
    fetchCart: async () => { },
    setCartDetails: () => { }
})


export default function CartContextProvider({children}:{children: React.ReactNode}){

    const [cartDetails, setCartDetails] = useState<CartData | null >(null)

    async function fetchCart(){

        const response = await getCart()

        setCartDetails(response?.data)
    }

    useEffect(()=>{

        fetchCart()

    },[])

    return <CartContext.Provider value={{cartDetails , fetchCart , setCartDetails }}>
        {children}
    </CartContext.Provider>
}

export function useCart(){

    const myContext = useContext(CartContext)

    return myContext
}
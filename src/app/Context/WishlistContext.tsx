"use client"
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { WishlistData } from '../types/wishlistDetails.model';
import { getWishlist } from "@/actions/wishlist.action";

interface WishlistContextType{
    wishlistDetails: WishlistData | null
    fetchWishlist: () => Promise<void>
    setWishlistDetails: (wishlist: WishlistData | null) => void;
}

const WishlistContext = createContext<WishlistContextType>({
    wishlistDetails: null,
    fetchWishlist: async () => { },
    setWishlistDetails: () => { }
})


export default function WishlistContextProvider({children}:{children: React.ReactNode}){

    const [wishlistDetails, setWishlistDetails] = useState<WishlistData | null>(null)

    async function fetchWishlist(){

        const response = await getWishlist()
        console.log(response,"wishlist context");
        setWishlistDetails(response)
    }

    useEffect(()=>{

        fetchWishlist()

    },[])

    return <WishlistContext.Provider value={{wishlistDetails , fetchWishlist , setWishlistDetails }}>
        {children}
    </WishlistContext.Provider>
}

export function useWishlist(){

    const myContext = useContext(WishlistContext)

    return myContext
}
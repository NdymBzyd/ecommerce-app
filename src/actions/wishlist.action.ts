"use server"

import { WishlistData } from "@/app/types/wishlistDetails.model"
import { getUserToken } from "@/lib/token.utils"
import axios from "axios"

export async function getWishlist() {
    try {
        
        const token = await getUserToken()
        
        const response = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers:{
                    token: token as string,
                }
            })

            console.log(response.data,"wishlist data");
            

        return response.data as WishlistData

    } catch (error : unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "An error has occurred");
            }
        throw new Error("An unexpected error has occurred");
    }
}

export async function addToWishlist(productId : string) {
    try {
        
        const token = await getUserToken()
        
        const response = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/wishlist", {productId}, {
                
                headers:{
                    token: token as string,
                }
            })

            console.log(response.data,"add to wishlist data");
            

        return{
            data:response?.data,
            status:response.status || 200,
            message:response?.data.message || "success"
        }

    } catch (error : unknown) {
        if (axios.isAxiosError(error)){

            return{
                data:[],
                status:error.response?.status || 500,
                message:error.response?.data.message || "An error has occurred"
            }
            
        }
            // Handle non-Axios errors
    return {
        data: [],
        status: 500,
        message: "An unexpected error has occurred",
    };
    }
}

export async function removeFromWishlist(productId : string) {
    try {
        
        const token = await getUserToken()
        
        const response = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                
                headers:{
                    token: token as string,
                }
            })

            console.log(response.data,"remove from wishlist data");
            

        return{
            data:response?.data,
            status:response.status || 200,
            message:response?.data.message || "success"
        }

    } catch (error : unknown) {
        if (axios.isAxiosError(error)){

            return{
                data:[],
                status:error.response?.status || 500,
                message:error.response?.data.message || "An error has occurred"
            }
            
        }
            // Handle non-Axios errors
    return {
        data: [],
        status: 500,
        message: "An unexpected error has occurred",
    };
    }
}


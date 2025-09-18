"use server"

import { getUserToken } from "@/lib/token.utils"
import axios from "axios"

export async function getCart() {
    try {
        
        const token = await getUserToken()
        
        const response = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/cart", {
                headers:{
                    token: token as string,
                }
            })

            console.log(response.data,"cart data");
            

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
    }
}

export async function addToCart(productId : string) {
    try {
        
        const token = await getUserToken()
        
        const response = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/cart", {productId}, {
                
                headers:{
                    token: token as string,
                }
            })

            console.log(response.data,"add to cart data");
            

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

export async function removeFromCart(productId : string) {
    try {
        
        const token = await getUserToken()
        
        const response = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                
                headers:{
                    token: token as string,
                }
            })

            console.log(response.data,"remove from cart data");
            

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

export async function updateItemInCart(productId : string , count: number) {
    try {
        
        const token = await getUserToken()
        
        const response = await axios.put(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {count}, {
                
                headers:{
                    token: token as string,
                }
            })

            console.log(response.data,"remove from cart data");
            

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

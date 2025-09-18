"use server"

import { getUserToken } from "@/lib/token.utils"
import axios from "axios"
interface ShippingAddressTypes{
    details: string,
    phone: number,
    city: string
}

export async function getCashCheckout(cartId:string, shippingAddress:ShippingAddressTypes) {
    try {
        
        const token = await getUserToken()
        
        const response = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {shippingAddress}, {
                headers:{
                    token: token as string,
                }
            })

            console.log(response.data,"checkout cash data");
            

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

export async function getOnlineCheckout(cartId:string, shippingAddress:ShippingAddressTypes) {
    try {
        
        const token = await getUserToken()
        
        const response = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {shippingAddress}, {
                headers:{
                    token: token as string,
                }
            })

            console.log(response.data,"checkout online payment data");
            

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

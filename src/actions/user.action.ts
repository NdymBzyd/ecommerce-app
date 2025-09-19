"use server"

import { OrderDetails } from "@/app/types/orders.model"
import { UserData } from "@/app/types/user.model"
import { getUserToken } from "@/lib/token.utils"
import axios from "axios"

export interface PasswordChange {
    currentPassword: string;
    Password: string;
    rePassword: string;
  }

export async function getUserData() {
    try {
        
        const token = await getUserToken()
        if (!token) {
            throw new Error("No token found");
        }
        
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
                headers:{
                    token: token as string,
                }
        })

            console.log(response.data,"userData response");
            

        return response.data as UserData

    } catch (error : unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "An error has occurred");
            }
        throw new Error("An unexpected error has occurred");
    }
}

export async function getUserOrders(userId : string) {
    try {
        
        const token = await getUserToken()
        if (!token) {
            throw new Error("No token found");
        }
        
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
                headers:{
                    token: token as string,
                }
        })

            console.log(response.data,"userOrders response");
            

        return response.data as OrderDetails[];

    } catch (error : unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "An error has occurred");
            }
        throw new Error("An unexpected error has occurred");
    }
}

export async function changeUserPassword(payload: PasswordChange) {
    try {
      const token = await getUserToken();
      if (!token) throw new Error("No token found");
  
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        payload,
        {
          headers: {
            token: token as string,
        },
        }
      );
  
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "An error has occurred");
      }
      throw new Error("Unexpected error occurred");
    }
  }
"use server"

import axios from "axios"


export async function getCategories() {
    try {
    
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        console.log(response, "response from get categories");
        
        return{
            data:response?.data?.data,
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

export async function getCategoryDetails(id) {
    try {
    
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        console.log(response, "response from categories details");

        return{
            data:response?.data?.data,
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

export async function getProductsByCategory(categoryId: string) {
    try {
    
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`)
        console.log(response, "response from products by category");

        return{
            data:response?.data?.data,
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

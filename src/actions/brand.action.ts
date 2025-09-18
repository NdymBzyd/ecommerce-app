"use server"

import axios from "axios"


export async function getBrands() {
    try {
    
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
        console.log(response, "response from get brands");
        
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

export async function getBrandDetails(id) {
    try {
    
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
        console.log(response, "response from brands details");

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

export async function getProductsByBrand(categoryId: string) {
    try {
    
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${categoryId}`)
        console.log(response, "response from products by brand");

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

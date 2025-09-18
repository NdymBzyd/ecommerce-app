"use server"

import axios from "axios"

async function getProducts() {
    try {
    
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
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

async function getProductsDetails(id) {
    try {
    
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
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

export{

    getProducts,
    getProductsDetails
}
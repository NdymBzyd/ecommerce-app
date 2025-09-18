import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getUserToken(){

        // Get the encrypted token from cookies
    const encryptedToken = (await cookies()).get("next-auth.session-token")?.value
    console.log("Encrypted Token:", encryptedToken);

        // Decrypt the token to get the actual JWT
        const decodedToken = await decode({ token : encryptedToken , secret : process.env.AUTH_SECRET as string})
        console.log(decodedToken, "decodedToken");
    
        const token = decodedToken?.token

    return token
}
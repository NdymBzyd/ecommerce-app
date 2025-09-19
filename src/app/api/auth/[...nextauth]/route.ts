import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

//  Providers credentials
//  JWT session
//  Pages login
//  Encryption
//  Callbacks


export const options : NextAuthOptions = {

    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "Email", type: "email", placeholder: "JohnDoe@domain.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            // You need to provide your own logic here that takes the credentials
            // submitted and returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            // You can also use the `req` object to obtain additional parameters
            // (i.e., the request IP address)
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
              method: 'POST',
              body: JSON.stringify({
                email:credentials?.email,
                password:credentials?.password
              }),
              headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()
      
            // If no error and we have user data, return it
            if (res.ok && user) {
              return user
            }
            // Return null if user data could not be retrieved
            return null
          }
        })
      ],

      session: {
        strategy: "jwt",
      },
      pages: {
        signIn: "/login"
      },
      callbacks:{
        async session({ session, token, user }) {
            return {... session, ...token, ...user}
          },
          async jwt({ token, user}) {
            return {...token, ...user}
          }
      },
      secret: process.env.NEXTAUTH_SECRET

}


const handler = NextAuth(options)

export { handler as GET, handler as POST }
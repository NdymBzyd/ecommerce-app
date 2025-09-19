"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image  from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/app/Context/WishlistContext';
import { removeFromWishlist } from '@/actions/wishlist.action';
import { StarRating } from 'react-flexible-star-rating';
import { Button } from '../ui/button';
import { useCart } from '@/app/Context/CartContext';
import { addToCart } from '@/actions/cart.action';
import toast from 'react-hot-toast';

export default function WishlistGrid() {
    const {wishlistDetails, fetchWishlist} = useWishlist()
    const { fetchCart } = useCart()

    async function handleRemoveWishlistItem(productId: string) {
            const response = await removeFromWishlist(productId)
            console.log(response, "response from remove cart item");
            toast.success(response.message)
            await fetchWishlist()
          }
        
          async function handleAddToCart(productId:string) {
            const response = await addToCart(productId)
            console.log(response, "response from add to cart");
            toast.success(response.message)
            await fetchCart()
          }
  return (
      <>

          
      {wishlistDetails?.count === 0 ? (
                  <div className="container mx-auto">
                  <h1 className="text-start text-4xl tracking-tighter my-7 font-bold">Wishlist</h1>
                    <p className="text-center text-2xl text-slate-600">Your wishlist is empty. Start adding items to your wishlist!</p>
                          </div>
          ) : (
                  
<div className="container mx-auto">
  <h1 className="text-start text-4xl tracking-tighter my-7 font-bold">Wishlist</h1>
  <p className="text-start text-2xl text-slate-600 my-5">Items added to your wishlist will appear here!</p>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {wishlistDetails?.data.map((item) => (
        <Card key={item._id} className="relative group overflow-hidden">
            {item.priceAfterDiscount && item.priceAfterDiscount > 0 ? (
                <div className="absolute right-0 top-0 h-16 w-16">
                  <div
                    className="absolute transform rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-65px] top-[18px] w-[200px]">
                    {Math.round(((item.price - item.priceAfterDiscount) / item.price) * 100)}% OFF
                  </div>
                </div>
            ): null}
        <Link href={`/products/${item._id}`}>
          <CardHeader className="text-2xl">
            <CardTitle>{item.title.split(" ").slice(0,2).join(" ")}</CardTitle>
            <CardDescription>{item.description?.split(" ").slice(0,8).join(" ")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[320px] overflow-hidden">
              <Image
                src={item.imageCover}
                alt={item.title}
                fill 
                sizes="(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw"
                className='object-cover transition-all duration-300 hover:scale-110 '
              />
            </div>
          </CardContent>
        </Link>
            <CardFooter className="flex-row justify-between gap-1">
                <div>
                    {item.priceAfterDiscount && item.priceAfterDiscount > 0 ? (
                                <h2 className="text-xl">
                            <div>
                            <span className='line-through text-slate-500'>{item.price}</span> EGP
                            </div>
                            <span className='text-green-600 font-bold'>{item.priceAfterDiscount}</span> EGP
                              </h2>
                    
                    ) : (
                        <h2 className="text-xl">
                <span>{item.price}</span> EGP
              </h2>
    )}
                    <div className="flex">
            <StarRating
              initialRating={Math.floor(item.ratingsAverage)}
              dimension={7}
            />
            <span className="text-[16px] text-slate-500">
              ({item.ratingsQuantity})
            </span>
                </div>

                </div>
                <div className='flex flex-col gap-2'>
                <Button
                    onClick={() => handleAddToCart(item._id)}
                    className="border-1 border-green-600 rounded-md text-sm  bg-green-600 text-white hover:bg-green-900"
                >
                    Add to Cart
                </Button>
                <Button
                    onClick={() => handleRemoveWishlistItem(item._id)}
                    className="border-1 border-red-600 rounded-md text-sm px-7 bg-red-600 text-white hover:bg-red-900"
                >
                    Remove
                </Button>
                </div>
        </CardFooter>
      </Card>
    ))}
  </div>
</div>
      )}
    </>
  )
}


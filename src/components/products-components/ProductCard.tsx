"use client"
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Product } from '@/app/types/products.model'
import Image from 'next/image';
import { StarRating } from 'react-flexible-star-rating';
import { Heart, ShoppingCart, ZoomIn } from 'lucide-react';
import Link from 'next/link';
import { addToCart } from '@/actions/cart.action';
import { useCart } from '@/app/Context/CartContext';
import toast from 'react-hot-toast';
import { useWishlist } from '@/app/Context/WishlistContext';
import { addToWishlist, removeFromWishlist } from '@/actions/wishlist.action';

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '@/components/ui/button';

export default function ProductCard({ product }: { product: Product }) {
  const { fetchCart } = useCart()
  const { fetchWishlist, wishlistDetails } = useWishlist()
  const isInWishlist = wishlistDetails?.data?.some(item => item._id === product._id);

  async function handleAddToCart(productId: string) {
    const response = await addToCart(productId)
    toast.success(response.message)
    await fetchCart()
  }

  async function handleAddToWishlist(productId: string) {
    const response = await addToWishlist(productId)
    toast.success(response.message)
    await fetchWishlist()
  }
  async function handleRemoveFromWishlist(productId: string) {
    const response = await removeFromWishlist(productId)
    toast.success(response.message)
    await fetchWishlist()
  }

  return (
    <div className="text-md text-start transition-all duration-300 hover:scale-110">
      <Card className={`relative group overflow-hidden transition-all duration-300 ${isInWishlist ? "border-2 border-red-400" : ""}`}>
        
        {/* discount badge */}
        {product.priceAfterDiscount > 0 && (
          <div className="absolute right-0 top-0 h-16 w-16">
            <div
              className="absolute transform text-sm rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-65px] top-[18px] w-[200px]">
              {Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}% OFF
            </div>
          </div>
        )}

        {/* floating buttons */}
        <div className="absolute z-1 top-[150px] right-[-100] transition-all duration-500 flex flex-col gap-3 group-hover:right-2 ">
          <button
            onClick={() => handleAddToCart(product._id)}
            className="px-2 py-2 bg-slate-200 transition-all duration-300 text-black hover:bg-teal-400 hover:text-white cursor-pointer rounded-2xl"
          >
            <ShoppingCart />
          </button>

          {isInWishlist ? (
            <button
              onClick={() => handleRemoveFromWishlist(product._id)}
              className="px-2 py-2 transition-all duration-300 bg-red-400 text-white hover:text-black hover:bg-red-200 cursor-pointer rounded-2xl"
            >
              <Heart />
            </button>
          ) : (
            <button
              onClick={() => handleAddToWishlist(product._id)}
              className="px-2 py-2 transition-all duration-300 bg-slate-200 text-black hover:text-white hover:bg-red-400 cursor-pointer rounded-2xl"
            >
              <Heart />
            </button>
          )}

          {/* open modal with slider */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-2 py-2 transition-all duration-300 bg-slate-200 text-black hover:text-white cursor-pointer rounded-2xl hover:bg-slate-800">
                <ZoomIn />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <Swiper
                spaceBetween={10}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="w-full h-[400px]"
              >
                {product.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-[400px]">
                      <Image
                        src={img}
                        alt={`${product.title} ${index}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <h2 className="mt-4 text-xl font-bold">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>
              <div className='w-full flex justify-end items-end'>
              <Link href={`/products/${product._id}`}>
                <Button className='bg-green-800 text-2xl text-white'>Details</Button>
              </Link>

              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* main card */}
        <Link href={`/products/${product._id}`}>
          <CardHeader className='text-2xl'>
            <CardTitle>{product.title?.split(" ").slice(0, 2).join(" ")}</CardTitle>
            <CardDescription className='line-clamp-1'>
              {product.description?.split(" ").slice(0, 4).join(" ")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[320px] overflow-hidden">
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                sizes='(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw'
                className='transition-all duration-300 group-hover:scale-110'
              />
            </div>
          </CardContent>
        </Link>

        {/* footer */}
        <CardFooter className='flex-col items-start gap-1'>
          {product.priceAfterDiscount > 0 ? (
            <h2 className="text-xl">
              <div>
                <span className='line-through text-slate-500'>{product.price}</span> EGP
              </div>
              <span className='text-green-600 font-bold'>{product.priceAfterDiscount}</span> EGP
            </h2>
          ) : (
            <h2 className="text-xl py-[.87rem]">
              <span>{product.price}</span> EGP
            </h2>
          )}

          <div className='flex'>
            <StarRating initialRating={Math.floor(product.ratingsAverage)} dimension={7} />
            <span className='text-[16px] text-slate-500'>({product.ratingsQuantity})</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

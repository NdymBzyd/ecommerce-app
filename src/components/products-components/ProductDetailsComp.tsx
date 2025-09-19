"use client"
import { ProductDetails } from '@/app/types/productDetails.model'
import React from 'react'
import { StarRating } from 'react-flexible-star-rating';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function ProductDetailsComp({productDetails}:{productDetails:ProductDetails}) {
    // console.log(productDetails,"details");
  return (
    <div className='flex justify-between items-center gap-5'>

        <div className="w-full md:w-1/2">
            
        <Swiper
      slidesPerView={1}
        spaceBetween={1}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[ Navigation, Pagination]}
        className="mySwiper"
      >

        {productDetails.images.map((src, index)=>
        <>
        <SwiperSlide key={index} className='py-10 px-15'>
        <div className="w-full relative h-[650px]">
            <Image className='object-cover opacity-80'
            priority
            fill 
            sizes='(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw' 
            src={src} 
            alt='slider-image' 
            loading='eager' />
            </div>
        </SwiperSlide>
        </>
    )}

      </Swiper>

            
        </div>
        <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold tracking-tighter">{productDetails.title}</h2>
                <p className="text-slate-500 text-xl tracking-tighter my-7">{productDetails.description}</p>
                <div className="flex justify-between items-center">
                    <div>
                        <p className='text-lg my-4'>{productDetails.category.name}</p>
                        <p className='text-lg my-4'>{productDetails.price} EGP</p>
                    </div>
                    <div className='flex gap-2'>
                    <StarRating initialRating={Math.floor(productDetails.ratingsAverage)} dimension={7}/><span className='text-[16px] text-slate-500'>({productDetails.ratingsQuantity})</span>
                    </div>
                </div>
                <button className='bg-green-700 text-white w-full cursor-pointer rounded-lg py-3'>Add to Cart</button>
            </div>

    </div>
  )
}

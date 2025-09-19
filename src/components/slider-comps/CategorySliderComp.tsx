"use client"
import { Categories } from '@/app/types/category.model'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {  Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';


export default function CategorySliderComp({category} : { category:Categories[]}) {
  return (
    <>
    <div className="container mx-auto">
        <h2 className="text-start text-4xl tracking-tighter py-7 font-bold px-4">Categories</h2>
      <Swiper
      slidesPerView={1}
        spaceBetween={5}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[ Navigation, Pagination]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 1, spaceBetween: 5,
             }, 
            640: {
              slidesPerView: 3, spaceBetween: 5,
             },
            1024: { slidesPerView: 5, spaceBetween: 5 },
          }}
      >
        {category.map((cat)=>
        <>
            <SwiperSlide key={cat._id} className='py-10 px-5 group overflow-hidden'>
            <Link href={`/categories/${cat._id}`}>
              <div className="w-full relative h-[250px]">
            <Image className='object-cover opacity-80 rounded-full transition-all duration-300 group-hover:scale-115' priority fill sizes='(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw' src={cat.image} alt='slider-image' loading='eager' />
              </div>
              </Link>
            <p className="text-center text-xl pt-5">{cat.name}</p>
        </SwiperSlide>
        </>
    )}


      </Swiper>
      </div>
    </>
  )
}

"use client"
import { ProductDetails } from '@/app/types/productDetails.model'
import React from 'react'
import { StarRating } from 'react-flexible-star-rating'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'

export default function ProductDetailsComp({ productDetails }: { productDetails: ProductDetails }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8  h-[80vh]">
      {/* LEFT: Images */}
      <div className="w-full md:w-1/2">
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {productDetails.images.map((src, index) => (
            <SwiperSlide key={index} className="py-5 px-2 sm:px-5">
              <div className="w-full relative h-[350px] sm:h-[500px] md:h-[650px]">
                <Image
                  className="object-contain rounded-md py-2"
                  priority
                  fill
                  sizes="(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw"
                  src={src}
                  alt="slider-image"
                  loading="eager"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full md:w-1/2 px-2 sm:px-5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{productDetails.title}</h2>
        <p className="text-slate-600 text-base sm:text-lg md:text-xl tracking-tight my-5">
          {productDetails.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="text-base sm:text-lg">{productDetails.category.name}</p>
            <p className="text-base sm:text-lg font-semibold">{productDetails.price} EGP</p>
          </div>
          <div className="flex items-center gap-2">
            <StarRating initialRating={Math.floor(productDetails.ratingsAverage)} dimension={16} />
            <span className="text-sm sm:text-base text-slate-500">({productDetails.ratingsQuantity})</span>
          </div>
        </div>
        <button className="bg-green-700 hover:bg-green-800 transition text-white w-full mt-6 rounded-lg py-3 text-sm sm:text-base">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { MoveRight } from 'lucide-react';

export default function MainSlider() {
  const slides = [
    {
      img: "/sliders/asos+beauty.jpg",
      title: "Casual Collection",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      button: "Shop Now"
    },
    {
      img: "/sliders/BANNER_5.jpg",
      title: "Summer Style",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      button: "Shop Now"
    },
    {
      img: "/sliders/fashion-collection-feature.jpg",
      title: "Fall Collection",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      button: "Browse this collection!"
    },
    {
      img: "/sliders/teemo.jpg",
      title: "Cool Collection",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      button: "Steal his look!"
    },
  ];

  return (
    <div className="mx-auto">
      <Swiper
        spaceBetween={30}
        effect="fade"
        navigation={true}
        pagination={{ clickable: true }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Image */}
            <div className="w-full relative h-[300px] sm:h-[600px]">
              <Image
                className="object-cover"
                priority
                fill
                sizes="(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw"
                src={slide.img}
                alt={`slider-image-${index}`}
                loading="eager"
              />
            </div>

            {/* Text Overlay */}
            <div className="absolute top-[50px] sm:top-[100px] left-4 sm:left-[50px] w-[90%] sm:w-1/3 px-4 sm:px-20">
              <h2 className="text-start text-3xl sm:text-8xl font-bold text-white text-shadow-lg/30 leading-tight">
                {slide.title}
              </h2>
              <p className="py-2 sm:py-4 text-white text-shadow-lg/30 text-lg sm:text-2xl">
                {slide.description}
              </p>
              <button className="cursor-pointer px-3 py-2 sm:px-4 sm:py-2 bg-white hover:bg-black transition-all text-[14px] sm:text-[18px] duration-500 rounded text-black hover:text-white flex items-center gap-2">
                {slide.button} <MoveRight className="inline-block" />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

import { MoveRight } from 'lucide-react';

export default function MainSlider() {
    return (
      <div className='mx-auto'>
        <Swiper
          spaceBetween={30}
          effect={'fade'}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="w-full relative h-[600px]">
            <Image className='object-cover' priority fill sizes='(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw' src="/sliders/asos+beauty.jpg" alt='slider-image' loading='eager' />
            </div>
            <div className="absolute top-[100px] w-1/3 left-[50px] px-20">
              <h2 className='text-8xl font-bold text-start text-white text-shadow-lg/30'>Casual Collection</h2>
                <p className='py-4 text-white text-shadow-lg/30'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <button className="cursor-pointer px-3 py-2 bg-white hover:bg-black transition-all text-[18px] duration-500 rounded text-black hover:text-white">Shop Now<MoveRight className='inline-block'  /></button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full relative h-[600px]">
            <Image className='object-cover' priority fill sizes='(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw' src="/sliders/BANNER_5.jpg" alt='slider-image' loading='eager' />
            </div>
            <div className="absolute top-[100px] w-1/3 left-[50px] px-20">
              <h2 className='text-8xl font-bold text-start text-white text-shadow-lg/30'>Summer Style</h2>
                <p className='py-4 text-white text-shadow-lg/30'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <button className="cursor-pointer px-3 py-2 bg-white hover:bg-black transition-all text-[18px] duration-500 rounded text-black hover:text-white">Shop Now<MoveRight className='inline-block'  /></button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full relative h-[600px]">
            <Image className='object-cover' priority fill sizes='(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw' src="/sliders/fashion-collection-feature.jpg" alt='slider-image' loading='eager' />
            </div>
            <div className="absolute top-[100px] w-1/3 left-[50px] px-20">
              <h2 className='text-8xl font-bold text-start text-white text-shadow-lg/30'>Fall Collection</h2>
                <p className='py-4 text-white text-shadow-lg/30'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <button className="cursor-pointer px-3 py-2 bg-white hover:bg-black transition-all text-[18px] duration-500 rounded text-black hover:text-white">Browse this collection!<MoveRight className='inline-block'  /></button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full relative h-[600px]">
            <Image className='object-cover' priority fill sizes='(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw' src="/sliders/teemo.jpg" alt='slider-image' loading='eager' />
            </div>
            <div className="absolute top-[100px] w-1/3 left-[50px] px-20">
              <h2 className='text-8xl font-bold text-start text-white text-shadow-lg/30'>Cool Collection</h2>
                <p className='py-4 text-white text-shadow-lg/30'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <button className="cursor-pointer px-3 py-2 bg-white hover:bg-black transition-all text-[18px] duration-500 rounded text-black hover:text-white">Steal his look!<MoveRight className='inline-block'  /></button>
            </div>
          </SwiperSlide>


        </Swiper>
      </div>
    );
  }
  
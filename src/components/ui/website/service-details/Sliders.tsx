"use client";
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import 'swiper/css';
import 'swiper/css/navigation';
import { imgUrl } from '@/config/config';


const Sliders = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  React.useEffect(() => {
    const defaultImage = images && images.length > 0
      ? images?.[0]
      : null;
    setSelectedImage(defaultImage);
  }, [images]);


  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div className="lg:h-[506px] h-[306px] w-full relative mb-3">
        {selectedImage && (
          <Image
            src={selectedImage?.startsWith("https") ? selectedImage : `${imgUrl}${selectedImage}`}
            alt="Selected property"
            fill
            className="rounded-lg object-cover"
            unoptimized={true}
            priority
          />
        )}
      </div>

      {/* Thumbnail Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={5}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          className="mySwiper w-full"
        >
          {images?.map((item: string, index: number) => (
            <SwiperSlide key={index}>
              <div
                className="lg:w-[150px] lg:h-[80px] w-40 h-20 relative cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <Image
                  src={item.startsWith("https") ? item : `${imgUrl}${item}`}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover rounded-lg border border-gray-300 hover:border-gray-500"
                  unoptimized={true}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev absolute z-10 top-[40%] -left-4 bg-primary w-full h-full p-1  rounded-full shadow-md">
          <BiChevronLeft size={24} color="white" />
        </button>
        <button className="swiper-button-next absolute z-10 top-[40%] -right-2 bg-primary  p-1 rounded-full shadow-md">
          <BiChevronRight size={24} color="white" />
        </button>
      </div>

    </div>
  );
};

export default Sliders;
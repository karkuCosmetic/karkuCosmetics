import React  from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Gallery.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

// IMAGENES
import Karku1 from "../../assets/AssetsHome/Karku1.jpg";
import Karku2 from "../../assets/AssetsHome/Karku2.jpg";
import Karku3 from "../../assets/AssetsHome/Karku3.jpg";
import Karku4 from "../../assets/AssetsHome/Karku4.jpg";
import Karku5 from "../../assets/AssetsHome/Karku5.jpg";
import Karku6 from "../../assets/AssetsHome/Karku6.jpg";
import Karku7 from "../../assets/AssetsHome/Karku7.jpg";
import Karku8 from "../../assets/AssetsHome/Karku8.jpg";
import Karku9 from "../../assets/AssetsHome/Karku9.jpg";

const Gallery = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={Karku1} alt="Karku 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku2} alt="Karku 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku3} alt="Karku 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku4} alt="Karku 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku5} alt="Karku 5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku6} alt="Karku 6" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku7} alt="Karku 7" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku8} alt="Karku 8" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku9} alt="Karku 9" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Gallery;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Gallery.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

// IMAGENES

import Karku2 from "../../assets/AssetsHome/Gallery/Karku2.jpg";
import Karku3 from "../../assets/AssetsHome/Gallery/Karku3.jpg";
import Karku4 from "../../assets/AssetsHome/Gallery/Karku4.jpg";
import Karku5 from "../../assets/AssetsHome/Gallery/Karku5.jpg";
import Karku6 from "../../assets/AssetsHome/Gallery/Karku6.jpg";
import Karku7 from "../../assets/AssetsHome/Gallery/Karku7.jpg";
import Karku8 from "../../assets/AssetsHome/Gallery/Karku8.jpg";
import Karku9 from "../../assets/AssetsHome/Gallery/Karku9.jpg";
import Karku10 from "../../assets/AssetsHome/Gallery/Karku10.jpg";
import Karku11 from "../../assets/AssetsHome/Gallery/Karku11.jpg";
import Karku12 from "../../assets/AssetsHome/Gallery/Karku12.jpg";
import Karku13 from "../../assets/AssetsHome/Gallery/Karku13.jpg";
import Karku14 from "../../assets/AssetsHome/Gallery/Karku14.jpg";
import Karku15 from "../../assets/AssetsHome/Gallery/Karku15.jpg";
import Karku16 from "../../assets/AssetsHome/Gallery/Karku16.jpg";
import Karku18 from "../../assets/AssetsHome/Gallery/Karku18.jpg";
import Karku19 from "../../assets/AssetsHome/Gallery/Karku19.jpg";
import Karku20 from "../../assets/AssetsHome/Gallery/Karku20.jpg";

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
        <SwiperSlide>
          <img src={Karku10} alt="Karku 10" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku11} alt="Karku 11" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku12} alt="Karku 12" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku13} alt="Karku 13" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku14} alt="Karku 14" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku15} alt="Karku 15" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku16} alt="Karku 16" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku18} alt="Karku 18" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku19} alt="Karku 19" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Karku20} alt="Karku 20" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Gallery;

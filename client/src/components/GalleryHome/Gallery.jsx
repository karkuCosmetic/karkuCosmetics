import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./Gallery.css";
import Karku1 from "../../assets/AssetsHome/Karku1.jpg";
import Karku2 from "../../assets/AssetsHome/Karku2.jpg";
import Karku3 from "../../assets/AssetsHome/Karku3.jpg";
import Karku4 from "../../assets/AssetsHome/Karku4.jpg";
import Karku5 from "../../assets/AssetsHome/Karku5.jpg";
import Karku6 from "../../assets/AssetsHome/Karku6.jpg";

const Gallery = () => {
  return (
    <div
      id="carouselExampleInterval"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item " data-bs-interval="5000">
          <img src={Karku1} alt="..." />
        </div>
        <div class="carousel-item" data-bs-interval="5000">
          <img src={Karku2} alt="..." />
        </div>
        <div class="carousel-item" data-bs-interval="5000">
          <img src={Karku3} alt="..." />
        </div>
        <div class="carousel-item" data-bs-interval="5000">
          <img src={Karku4} alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Gallery;

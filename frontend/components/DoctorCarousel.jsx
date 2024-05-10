import React, { useEffect } from "react";
import DoctorSwiper from "./DoctorSwiper";

const DoctorCarousel = () => {
  return (
    <section id="doctor-carousel">
      <div className="container">
        <DoctorSwiper />
      </div>
    </section>
  );
};

export default DoctorCarousel;

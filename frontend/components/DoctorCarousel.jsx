import React, { useEffect } from "react";
import DoctorSwiper from "./DoctorSwiper";

const DoctorCarousel = ({ doctors }) => {
  return (
    <section id="doctor-carousel">
      <div className="container">
        <DoctorSwiper doctors={doctors} />
      </div>
    </section>
  );
};

export default DoctorCarousel;

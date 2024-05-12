// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default ({ doctors }) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        556: {
          slidesPerView: 2,
        },
        1068: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      }}
      navigation
      pagination={{ clickable: true }}
    >
      {doctors.map((doctor) => (
        <SwiperSlide key={doctor.id}>
          <div className="card">
            <img
              src="https://picsum.photos/200/300"
              className="card-img-top"
              alt={doctor.name}
            ></img>
            <div className="card-body">
              <h5 className="card-title">Dr. {doctor.name}</h5>
              <p className="card-text">
                specialty: {doctor.specialty} <br />
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

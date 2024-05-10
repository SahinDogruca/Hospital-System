// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { SiSamsung } from "react-icons/si";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y]}
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
          slidesPerView: 5,
        },
      }}
      navigation
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      <SwiperSlide>
        <SiSamsung className="firm-icon" />
      </SwiperSlide>
      <SwiperSlide>
        <SiSamsung className="firm-icon" />
      </SwiperSlide>
      <SwiperSlide>
        <SiSamsung className="firm-icon" />
      </SwiperSlide>
      <SwiperSlide>
        <SiSamsung className="firm-icon" />
      </SwiperSlide>
      <SwiperSlide>
        <SiSamsung className="firm-icon" />
      </SwiperSlide>
      <SwiperSlide>
        <SiSamsung className="firm-icon" />
      </SwiperSlide>
      <SwiperSlide>
        <SiSamsung className="firm-icon" />
      </SwiperSlide>
    </Swiper>
  );
};

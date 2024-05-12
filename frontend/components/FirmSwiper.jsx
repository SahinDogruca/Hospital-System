// import Swiper core and required modules
import { Navigation, Pagination, A11y } from "swiper/modules";
import { SiSamsung } from "react-icons/si";
import { DiAndroid, DiApple, DiWindows, DiChrome } from "react-icons/di";
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
        <SiSamsung />
      </SwiperSlide>
      <SwiperSlide>
        <DiAndroid />
      </SwiperSlide>
      <SwiperSlide>
        <DiApple />
      </SwiperSlide>
      <SwiperSlide>
        <DiWindows />
      </SwiperSlide>
      <SwiperSlide>
        <DiChrome />
      </SwiperSlide>
      <SwiperSlide>
        <SiSamsung />
      </SwiperSlide>
      <SwiperSlide>
        <SiSamsung />
      </SwiperSlide>
    </Swiper>
  );
};

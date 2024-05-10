// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default () => {
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
      <SwiperSlide>
        <div className="card">
          <img
            src="https://picsum.photos/200/300"
            className="card-img-top"
            alt="..."
          ></img>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card">
          <img
            src="https://picsum.photos/200/300"
            className="card-img-top"
            alt="..."
          ></img>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card">
          <img
            src="https://picsum.photos/200/300"
            className="card-img-top"
            alt="..."
          ></img>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card">
          <img
            src="https://picsum.photos/200/300"
            className="card-img-top"
            alt="..."
          ></img>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card">
          <img
            src="https://picsum.photos/200/300"
            className="card-img-top"
            alt="..."
          ></img>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card">
          <img
            src="https://picsum.photos/200/300"
            className="card-img-top"
            alt="..."
          ></img>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card">
          <img
            src="https://picsum.photos/200/300"
            className="card-img-top"
            alt="..."
          ></img>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

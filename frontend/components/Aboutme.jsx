import React from "react";

const Aboutme = () => {
  return (
    <section id="aboutme">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col aboutme__left">
            <h1 className="aboutme__title">
              ATLAS UNIVERSITESI MEDICANA HASTANESI
            </h1>
            <p className="aboutme__description fs-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              deserunt obcaecati dignissimos id reprehenderit voluptas
              laudantium, alias quod soluta dolorem quia dolore, quae veniam
              harum. Assumenda vel sequi quia, ipsam dolore consequatur neque,
              labore rem hic iusto facere perspiciatis nulla exercitationem
              doloremque placeat qui? Necessitatibus, accusantium ea, saepe
              suscipit neque magni enim eos, unde voluptatibus vitae dolor
              officia tempore magnam.
            </p>
          </div>
          <div className="col-lg-6 col aboutme__right mt-5">
            <div className="aboutme-img__wrapper">
              <img
                className="aboutme-img__image rounded-circle"
                src="/assets/aboutme.jpg"
                width={400}
                height={500}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutme;

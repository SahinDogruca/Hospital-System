import React from "react";
import { FaHospital } from "react-icons/fa";
import { FaStethoscope, FaBed, FaHeartbeat } from "react-icons/fa";
import { MdEmergency } from "react-icons/md";

const Infos = ({ doctorsLength }) => {
  return (
    <section id="infos" className="infos">
      <div className="container">
        <h2 className="infos__title">Sağlık Ağımız</h2>
        <div className="infos__wrapper">
          <div className="infos-info">
            <div className="infos-info__icon">
              <FaHospital />
            </div>
            <p className="infos-info__number">
              25000m<sup>2</sup>
            </p>
            <h5 className="infos-info__name">Alan</h5>
          </div>
          <div className="infos-info">
            <div className="infos-info__icon">
              <FaStethoscope />
            </div>
            <p className="infos-info__number">{doctorsLength}</p>
            <h5 className="infos-info__name">Doktor</h5>
          </div>
          <div className="infos-info">
            <div className="infos-info__icon">
              <MdEmergency />
            </div>
            <p className="infos-info__number">9</p>
            <h5 className="infos-info__name">Acil Polikliniği</h5>
          </div>
          <div className="infos-info">
            <div className="infos-info__icon">
              <FaBed />
            </div>
            <p className="infos-info__number">400</p>
            <h5 className="infos-info__name">Yatak</h5>
          </div>
          <div className="infos-info">
            <div className="infos-info__icon">
              <FaHeartbeat />
            </div>
            <p className="infos-info__number">100</p>
            <h5 className="infos-info__name">Bakım Ünitesi</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Infos;

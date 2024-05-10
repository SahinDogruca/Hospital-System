import React from "react";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="contact">
      <div className="container">
        <h2 className="contact__title">Contact</h2>
        <div className="row">
          <div className="col-md-6 col">
            <form action="#" className="contact__form">
              <div className="form-group my-2">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input type="text" id="name" className="form-control" />
              </div>
              <div className="form-group my-2">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" id="email" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea id="message" className="form-control"></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Send
              </button>
            </form>
          </div>
          <div className="col-md-6 col">
            <div className="contact__info">
              <h3 className="contact__info-title">Contact Info</h3>
              <div className="contact__info-item">
                <FaMapMarkerAlt className="contact__info-item-icon" />
                <p>123 Main Street, New York, NY 10001</p>
              </div>
              <div className="contact__info-item">
                <FaPhone className="contact__info-item-icon" />
                <p>(123) 456-7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

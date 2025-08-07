import React, { useEffect } from "react";
import NavigationBar from "./NavigationBar";
import "./style/Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { db } from "./Database";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1500, once: true }); // duration in ms, run only once
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="containerf-fluid bg-image ">
        <div className="row">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-3">
            <h1
              className="fw-bold display-5 text-center"
              style={{ color: "green" }}
              data-aos="fade-left"
            >
              Fresh Vegetables, Straight from the Farm!
            </h1>
            <h4 className="text-muted mb-3 text-center" data-aos="fade-left">
              Healthy. Organic. Delivered to Your Doorstep.
            </h4>
            <p className="lead text-center" data-aos="zoom-in">
              Enjoy farm-fresh vegetables picked at their peak, free from
              chemicals and packed with nutrition. We bring nature’s goodness
              directly to your home – fresh, fast, and affordable.
            </p>
            <button className="shop-btn">Shop Now</button>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <img
              src="women.png"
              alt=""
              className="img img-fluid"
              data-aos="fade-left"
            />
          </div>
        </div>
      </div>
      <div
        className="container d-flex mt-3 justify-content-center"
       
      >
        <input
          type="text"
          placeholder="Search Product "
          className="form-control w-25"
        />
      </div>
    </>
  );
};

export default Home;

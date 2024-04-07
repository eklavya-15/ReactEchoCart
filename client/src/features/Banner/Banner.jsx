import React from "react";
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";

const Banner = () => {
  return (
    <div className="flex justify-center items-center py-15 sm:py-10 w-screen  bg-white">
      <div className="container">
          {/* image section */}
          {/* <div data-aos="zoom-in">
            <img
              src={BannerImg} 
              alt=""
              className="max-w-[400px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
            />
          </div> */}

          {/* text details section */}
          <div className="sm:min-h-[250px] flex flex-col justify-center md:gap-6 sm:pt-0  gap-3">
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold sm:block  pb-3 font-Josefin">
              Get Best Products upto 50% Off
            </h1>
           
            <div className="flex flex-col md:flex-row gap-5 pb-6">
              <div data-aos="fade-up" className="flex items-center gap-3 ">
                <GrSecure className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400" />
                <p>Quality Products</p>
              </div>
              <div data-aos="fade-up" className="flex items-center gap-3 ">
                <IoFastFood className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-orange-100 dark:bg-orange-400" />
                <p>Fast Delivery</p>
              </div>
              <div data-aos="fade-up" className="flex items-center gap-3 ">
                <GiFoodTruck className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                <p>Easy Payment method</p>
              </div>
              <div data-aos="fade-up" className="flex items-center gap-3 ">
                <GiFoodTruck className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                <p>Get Offers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Banner;

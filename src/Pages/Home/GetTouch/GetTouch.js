import React, { useRef } from "react";
import email from "../../../Assets/getTouch/email.png";
import phone from "../../../Assets/getTouch/phone.png";
import UseAnimation from "../../../Hooks/UseAnimation";

const GetTouch = () => {
  const whyRef = useRef();
  const visible = UseAnimation(whyRef);

  return (
    <div
      ref={whyRef}
      className={`max-w-screen-xl mb-52 mx-auto ${
        visible
          ? "translate-y-0 transition-all duration-1000 opacity-100"
          : "translate-y-24 opacity-0"
      }`}
    >
      <div className="w-96 text-center mx-auto">
        <p className="text-sky-700 text-base font-bold">HAPPY TO HELP</p>
        <h1 className="text-5xl my-8 text-gray-800 font-bold">
          Have Questions? <br />
          Get in touch!
        </h1>
        <p className="text-gray-600 text-lg">
          Contact our managers for more information
        </p>
      </div>
      <div className="flex lg:flex-row flex-col mt-14 gap-10  justify-between w-10/12 lg:w-[70%] mx-auto">
        <div
          className={`bg-gray-200 text-gray-800 text-2xl px-8 font-semibold py-8 rounded-md w-full ${
            visible
              ? "translate-x-0 opacity-100 transition-all duration-1000"
              : "-translate-x-36 opacity-0"
          }`}
        >
          <img className="w-[60px] mb-8" src={email} alt="" />
          <p>Email Us</p>
          <p>info@gmail.com</p>
        </div>
        <div
          className={`bg-gray-200 text-gray-800 text-2xl px-8 font-semibold py-8 rounded-md w-full ${
            visible
              ? "translate-x-0 opacity-100 transition-all duration-1000"
              : "translate-x-36 opacity-0"
          }`}
        >
          <img className="w-[60px] mb-8" src={phone} alt="" />
          <p>Call Us</p>
          <p>+880 16****65</p>
        </div>
      </div>
    </div>
  );
};

export default GetTouch;

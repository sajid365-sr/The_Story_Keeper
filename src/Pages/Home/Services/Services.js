import React, { useRef } from "react";
import book from "../../../Assets/Services/book.png";
import order from "../../../Assets/Services/order.png";
import shipping from "../../../Assets/Services/shipping.png";
import UseAnimation from "../../../Hooks/UseAnimation";
import { HiArrowNarrowRight } from "react-icons/hi";

const Services = () => {
  const serviceRef = useRef();
  const visible = UseAnimation(serviceRef);

  const services = [
    {
      id: 1,
      img: book,
      title: "Used Book Buying",
      about:
        "At our store, readers and students can buy books that have been sent to us as a charity.",
      animation: "translate-y-[60%] opacity-0",
    },
    {
      id: 2,
      img: order,
      title: "Super Easy to Order",
      about:
        "You get to choose from multiple book categories and genres online",
      animation: "translate-y-[50%] opacity-0",
    },
    {
      id: 3,
      img: shipping,
      title: "Free Delivery",
      about:
        "We find the exact book that no other store has and deliver to you for free",
      animation: "translate-y-[30%] opacity-0",
    },
  ];
  return (
    <div ref={serviceRef} className="max-w-screen-xl mx-auto mb-40 lg:mb-52">
      <p className="text-4xl text-gray-700 text-bold text-center mb-20 underline">Services we provide</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            className={`card w-96 pb-8 shadow-xl mx-auto mb-10 lg:mb-0 bg-[#856090] ${
              visible
                ? "translate-y-0 transition-all duration-1000 opacity-100"
                : `${service.animation}`
            }`}
          >
            <figure className="px-10 lg:pt-10 pt-5">
              <img className="w-[80px]" src={service.img} alt="Shoes" />
            </figure>
            <div className="card-body py-3 lg:py-8 items-center text-center">
              <h2 className="card-title text-gray-100 font-bold text-3xl">
                {service.title}
              </h2>
              <p className="text-gray-300  font-medium lg:mt-10 mt-4">
                {service.about}
              </p>
            </div>
            <p
              className={`text-amber-400 flex justify-center cursor-pointer hover:underline items-center gap-3 ${
                visible
                  ? "translate-x-0 opacity-100 transition-all duration-1000"
                  : "-translate-x-40 opacity-0"
              }`}
            >
              Read More <HiArrowNarrowRight />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

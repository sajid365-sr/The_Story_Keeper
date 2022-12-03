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
      bgClass:'bg-[#1786a1]',
      animation:'translate-y-[70%] opacity-0'
    },
    {
      id: 2,
      img: order,
      title: "Super Easy to Order",
      about:
        "You get to choose from multiple book categories and genres online",
        bgClass:'bg-[#56496d]',
        animation:'translate-y-[50%] opacity-0'
    },
    {
      id: 3,
      img: shipping,
      title: "Free Delivery",
      about:
        "We find the exact book that no other store has and deliver to you for free",
        bgClass:'bg-[#a95c8a]',
        animation:'translate-y-[30%] opacity-0'
    },
  ];
  return (
    <div
      ref={serviceRef}
      className= "max-w-screen-xl mx-auto mb-52"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        {services.map((service) => (
          <div
            id={service.id}
            className={`card w-96 pb-8  shadow-xl mx-auto mb-20 lg:mb-0 ${service.bgClass} ${visible?'translate-y-0 transition-all duration-1000 opacity-100':`${service.animation}`}`}
          >
            <figure className="px-10 pt-10">
              <img className="w-[80px]" src={service.img} alt="Shoes" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white font-bold text-3xl">
                {service.title}
              </h2>
              <p className="text-orange-400  font-medium mt-10">{service.about}</p>
            </div>
            <p
              className={`text-gray-200 flex justify-center cursor-pointer hover:text-blue-300 hover:underline items-center gap-3 ${
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

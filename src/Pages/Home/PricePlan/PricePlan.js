import React, { useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import UseAnimation from "../../../Hooks/UseAnimation";
import standard from "../../../Assets/pricePlan/standard.png";
import popular from "../../../Assets/pricePlan/popular.png";
import premium from "../../../Assets/pricePlan/premium.png";

const PricePlan = () => {
  const priceRef = useRef();
  const visible = UseAnimation(priceRef);

  const plans = [
    {
      id: 1,
      name: "Standard Plan",
      icon: standard,
      price: 225,
      features: [
        "3 books can borrow at a time",
        "30% discount on every delivery",
        "24/7 support",
        "Sell only 2 books per month",
        "Best for the students",
      ],
      animation: "-translate-x-[50%] opacity-0",
    },
    {
      id: 2,
      name: "Most Popular",
      icon: popular,
      price: 350,
      features: [
        "5 books can borrow at a time",
        "55% discount on every delivery",
        "24/7 support",
        "Sell only 10 books per month",
        "Choose the best one",
      ],
      animation: "-translate-y-[30%] opacity-0",
    },
    {
      id: 3,
      name: "Premium",
      icon: premium,
      price: 575,
      features: [
        "15 books can borrow at a time",
        "100% discount on every delivery",
        "24/7 support",
        "Sell unlimited books per month",
        "Get access to all ancient book library",
      ],
      animation: "translate-x-[50%] opacity-0",
    },
  ];

  return (
    <section className="mb-40 lg:max-w-screen-xl w-3/4 lg:w-full mx-auto">
      <div className="lg:w-[450px] w-[400px] mb-16 text-center mx-auto">
        <p className="text-sky-700 text-base font-bold">PRICE PLANS</p>
        <h1 className="lg:text-5xl text-4xl my-8 text-gray-800 font-bold">
          Get Your Best Plans Quickly
        </h1>
        <p className="text-gray-600 text-lg">
          By ordering a subscription plan, you get quick access to one of the
          world's largest storages on the planet!
        </p>
      </div>

      <div
        ref={priceRef}
        className="grid mx-auto grid-cols-1 lg:grid-cols-3 gap-10 md:grid-cols-2"
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-gray-200 px-10 py-16 rounded-lg max-w-sm ${
              visible
                ? "translate-x-0 translate-y-0 transition-all duration-1000 opacity-100"
                : `${plan.animation}`
            }`}
          >
            <h5 className="mb-4 flex gap-2 text-3xl font-semibold text-gray-500">
              {plan.name}
              <img src={plan.icon} className="w-[40px]" alt="" />
            </h5>
            <div className="flex items-baseline text-gray-900 ">
              <span className="text-5xl font-extrabold tracking-tight">
                {plan.price}
              </span>
              <span className="text-5xl ml-3 font-semibold">&#2547;</span>
              <span className="ml-1 text-xl font-normal">/month</span>
            </div>
            <ul className="my-7 space-y-5">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className={`flex space-x-3 ${
                    visible
                      ? "translate-x-0 translate-y-0 transition-all duration-1000"
                      : `${plan.animation}`
                  }`}
                >
                  <FaCheckCircle className="text-blue-600 " />
                  <span className="text-base text-gray-600 font-normal leading-tight">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className=" w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 "
            >
              Choose plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricePlan;

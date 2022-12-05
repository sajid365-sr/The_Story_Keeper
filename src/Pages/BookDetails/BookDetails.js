import React from "react";
import { useLoaderData } from "react-router-dom";
import {
  HiArrowNarrowRight,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";

const BookDetails = () => {
  const {
    author,
    category,
    description,
    email,
    location,
    originalPrice,
    phone,
    picture,
    publishYear,
    ratings,
    resalePrice,
    sellerName,
    sellerVerified,
    title,
  } = useLoaderData();
  console.log(useLoaderData());

  return (
    <section className="bg-zinc-300 mb-36 mt-20">
      <div className="max-w-screen-xl py-24 mx-auto flex gap-20">
        {/* Image */}
        <div className="bg-white p-14 w-1/2">
          <img
            className="mx-auto w-2/3 hover:-rotate-6 transition-all duration-500"
            src={picture}
            alt=""
          />
        </div>
        {/* Descriptions */}
        <div className="w-1/2">
          <div className="flex gap-3 items-center mb-5">
            <p className="text-3xl  text-gray-600">Books Info</p>
            <HiArrowNarrowRight className="text-gray-800 text-2xl mt-2" />
          </div>
          <h2 className="text-4xl text-gray-800 font-semibold">{title}</h2>
          <p className="text-gray-600 mt-3 text-lg">Author: {author}</p>
          <p className="text-gray-800 font-semibold text-xl">
            Original Price:{" "}
            <span className="text-red-600 text-3xl font-semibold line-through">
              {originalPrice}{" "}
            </span>{" "}
            <span className="ml-2 text-4xl">&#2547;</span>
          </p>
          <p className="text-gray-800 font-semibold text-xl">
            Resale Price:{" "}
            <span className="text-green-700 text-3xl font-semibold">
              {resalePrice}{" "}
            </span>{" "}
            <span className="ml-2 text-4xl">&#2547;</span>
          </p>
          <p className="text-gray-600 mt-10 indent-7 first-letter:text-4xl first-letter:text-gray-800 first-letter:font-semibold">
            {description}
          </p>
          <p className="text-gray-800 font-medium mt-14">
            Publish Year: {publishYear}
          </p>
          <p className="text-gray-800 font-medium">Category: {category}</p>
        </div>
      </div>
      {/* Seller Info */}
      <div className="max-w-screen-xl pb-16 mx-auto">
        <div className="flex gap-3 mb-3 items-center">
          <p className="text-3xl  text-gray-600">Seller Info</p>
          <HiArrowNarrowRight className="text-gray-800 text-2xl mt-2" />
        </div>
        <div>
          <div className="text-gray-600 flex gap-1">
            <span className="text-lg font-medium">Seller Name:</span>{" "}
            <p className="flex items-center gap-2">
            {sellerVerified && <FaCheckCircle className="text-blue-600" />}
            <span>{sellerName}</span>{" "}
            </p>
            
          </div>
          <div className="text-gray-700 flex items-center gap-4">
            <HiOutlinePhone />
            <p>{phone}</p>
          </div>
          <div className="text-gray-700 flex items-center gap-4">
            <HiOutlineMail />
            <p>{email}</p>
          </div>
          <p className="text-gray-700 font-medium">Location: {location}</p>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;

import { Rating } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import UseGetAdvertiseItem from "../../Hooks/UseGetAdvertiseItem";
import { HiArrowNarrowRight } from "react-icons/hi";
import { FaCommentAlt } from "react-icons/fa";

const AdvertiseItems = () => {
  const [items, refetch] = UseGetAdvertiseItem();

  return (
    <section className="max-w-screen-xl mx-auto mt-20 mb-36">
      <h2 className="text-3xl text-gray-700 text-center underline font-medium">
        Advertised Items
      </h2>

      <div className="grid grid-cols-1 my-20 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="card bg-zinc-200 shadow-xl rounded-md "
          >
            <figure className="py-8 bg-white">
              <Link to={`/books/${item._id}`}>
                <img
                  src={item.picture}
                  alt="books"
                  className="h-[280px] w-[200px] hover:scale-110 hover:-rotate-6 transition-all duration-500 "
                />
              </Link>
            </figure>
            <div className="card-body px-3 pt-2 pb-3">
              <Link
                to={`/books/${item._id}`}
                className="card-title hover:text-[#113ebb] text-2xl font-bold text-gray-800"
              >
                {item.title}
              </Link>

              <div className="text-gray-600">
                <p className="mb-3">{item.author}</p>
                <div className="flex gap-1 items-center">
                  <Rating>
                    <Rating.Star className="bg-green-700" />
                  </Rating>
                  <span>({item.ratings})</span>
                  <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-900" />
                  <FaCommentAlt className="text-gray-800" />
                  <span>{item.reviews} reviews</span>
                </div>
                <p className="text-4xl mt-5 font-semibold">
                  {item.resalePrice} <span>&#2547;</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvertiseItems;

import { useQuery } from "@tanstack/react-query";
import { Rating } from "flowbite-react";
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { FaCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const GetBooks = () => {
  const { data: books = [], refetch } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await fetch(
        "https://the-story-keeper-server-sajid365-sr.vercel.app/books"
      );
      const data = await res.json();
      return data;
    },
  });

  refetch();

  return (
    <section className="max-w-screen-xl lg:py-10 py-5 lg:mb-52 mb-36 mx-auto">
      <h1 className="lg:text-5xl text-4xl text-gray-700 font-semibold text-center mb-20 underline">Explore books</h1>
      {books.map((category, i) => (
        <div key={i} className="mb-24">
          <Link
            to={`/category/${category[0].categoryId}`}
            className="items-center text-gray-700 hover:text-blue-600 hover:underline inline-flex  mb-2 gap-1 "
          >
            <h1 className="text-3xl  ml-6 lg:ml-0 font-semibold ">
              {category[0].category}{" "}
            </h1>
            <HiArrowNarrowRight className="text-4xl mt-2 " />
          </Link>
          <div className="grid grid-cols-2 mx-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 gap-2">
            {category.map((books) => (
              <div
                key={books._id}
                className="card bg-zinc-200 shadow-xl rounded-md "
              >
                <figure className="py-8 bg-white">
                  <Link to={`/books/${books._id}`}>
                    <img
                      src={books.picture}
                      alt="books"
                      className="lg:h-[280px] h-[180px] lg:w-[200px] w-[140px] hover:scale-110 hover:-rotate-6 transition-all duration-500 "
                    />
                  </Link>
                </figure>
                <div className="card-body relative px-3 pt-2 pb-3">
                  <Link
                    to={`/books/${books._id}`}
                    className="card-title hover:text-[#113ebb] text-lg lg:text-2xl font-bold text-gray-800"
                  >
                    {books.title}
                  </Link>

                  <div className="text-gray-600 ">
                    <p className="mb-3">{books.author}</p>
                    <div className="flex gap-1 text-sm mb-14 items-center">
                      <Rating>
                        <Rating.Star className="bg-green-700" />
                      </Rating>
                      <span>({books.ratings})</span>
                      <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-900" />
                      <FaCommentAlt className="text-gray-800" />
                      <span>{books.reviews} reviews</span>
                    </div>
                    <p className="lg:text-4xl text-3xl text-[#1da9c5] mt-5 font-semibold absolute bottom-3">
                      {books.resalePrice} <span>&#2547;</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="text-center mt-16">
        <Link
          to="/shop"
          type="button"
          className="  bg-[#823849] px-5 py-3  text-lg text-gray-200 hover:bg-[#632a3e] focus:outline-none focus:ring-4 focus:ring-blue-200 "
        >
          View More Books
        </Link>
      </div>
    </section>
  );
};

export default GetBooks;

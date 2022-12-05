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
      const res = await fetch("http://localhost:5000/books");
      const data = await res.json();
      return data;
    },
  });


  return (
    <section className="max-w-screen-xl py-10 mb-52 mx-auto">
      
      
      {books.map((category,i) => (
        <div key={i} className="mb-24">
          <Link to={`/category/${category[0].categoryId}`} className="items-center text-gray-700 hover:text-blue-600 hover:underline inline-flex  mb-2 gap-1 ">
            <h1 className="text-3xl  font-semibold ">
              {category[0].category}{" "}
            </h1>
            <HiArrowNarrowRight className="text-4xl mt-2 " />
          </Link>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.map((books) => (
              <div key={books._id} className= "card bg-zinc-200 shadow-xl rounded-md ">
                <figure className="py-8 bg-white">
                  <Link to={`/books/${books._id}`}>
                  <img
                    src={books.picture}
                    alt="books"
                    className="h-[280px] w-[200px] hover:scale-110 hover:-rotate-6 transition-all duration-500 "
                  /></Link>
                </figure>
                <div className="card-body px-3 pt-2 pb-3">
                 
                    <Link to={`/books/${books._id}`} className="card-title hover:text-[#113ebb] text-2xl font-bold text-gray-800">{books.title}</Link>
                  
                  <div className="text-gray-600">
                    <p className="mb-3">{books.author}</p>
                    <div className="flex gap-1 items-center">
                      <Rating>
                        <Rating.Star className="bg-green-700" />
                      </Rating>
                      <span>({books.ratings})</span>
                      <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-900" />
                      <FaCommentAlt className="text-gray-800"/>
                      <span>{books.reviews} reviews</span>
                    </div>
                    <p className="text-4xl mt-5 font-semibold">
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
        <Link to='/shop' type="button" className="  bg-[#823849] px-5 py-3  text-lg text-gray-200 hover:bg-[#632a3e] focus:outline-none focus:ring-4 focus:ring-blue-200 ">View More Books</Link>
    </div>
      
    </section>
  );
};

export default GetBooks;

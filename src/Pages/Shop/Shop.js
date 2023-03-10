
import { Rating } from 'flowbite-react';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { HiArrowNarrowRight } from "react-icons/hi";
import { FaCommentAlt } from "react-icons/fa";


const Shop = () => {
    const books = useLoaderData();

    
    return (
        <section className="max-w-screen-xl py-10 mb-52 mx-auto">
        {books.map((category,i) => (
          <div key={i} className="mb-24">
            <Link to={`/category/${category[0].categoryId}`} className="items-center text-gray-700 hover:text-blue-600 hover:underline inline-flex  mb-2 gap-1 ">
              <h1 className="text-3xl ml-6 lg:ml-0 font-semibold ">
                {category[0].category}{" "}
              </h1>
              <HiArrowNarrowRight className="text-4xl mt-2 " />
            </Link>
            <div className="grid grid-cols-2 mx-5 lg:mx-0 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 gap-2">
              {category.map((books) => (
                <div key={books._id} className= "card bg-zinc-200 shadow-xl rounded-md ">
                  <figure className="py-8 bg-white">
                    <Link to={`/books/${books._id}`}>
                    <img
                      src={books.picture}
                      alt="books"
                      className="lg:h-[280px] h-[180px] lg:w-[200px] w-[140px] hover:scale-110 hover:-rotate-6 transition-all duration-500 "
                    /></Link>
                  </figure>
                  <div className="card-body relative px-3 pt-2 pb-3">
                   
                      <Link to={`/books/${books._id}`} className="card-title hover:text-[#113ebb] text-lg lg:text-2xl font-bold text-gray-800">{books.title}</Link>
                    
                    <div className="text-gray-600">
                      <p className="mb-3">{books.author}</p>
                      <div className="flex text-sm gap-1 mb-14 items-center">
                        <Rating>
                          <Rating.Star className="bg-green-700" />
                        </Rating>
                        <span>({books.ratings})</span>
                        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-900" />
                        <FaCommentAlt className="text-gray-800"/>
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
      
        
      </section>
    );
};

export default Shop;
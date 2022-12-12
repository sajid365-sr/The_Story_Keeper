
import { Rating } from 'flowbite-react';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { FaCommentAlt } from "react-icons/fa";


const Categories = () => {
    const books = useLoaderData();
    
    return (
        <section className='my-24 max-w-screen-xl mx-auto'>
            <h1 className="text-4xl underline mb-16 text-gray-700 text-center font-semibold ">
              {books[0].category}{" "}
            </h1>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {
                   books.map(book =>  <div key={book._id} className= "card bg-zinc-200 shadow-xl rounded-md ">
                   <figure className="py-8 bg-white">
                     <Link to={`/books/${book._id}`}>
                     <img
                       src={book.picture}
                       alt="books"
                       className="h-[280px] w-[200px] hover:scale-110 hover:-rotate-6 transition-all duration-500 "
                     /></Link>
                   </figure>
                   <div className="card-body px-3 pt-2 pb-3">
                    
                       <Link to={`/books/${books._id}`} className="card-title hover:text-[#113ebb] text-2xl font-bold text-gray-800">{book.title}</Link>
                     
                     <div className="text-gray-600">
                       <p className="mb-3">{book.author}</p>
                       <div className="flex gap-1 items-center">
                         <Rating>
                           <Rating.Star className="bg-green-700" />
                         </Rating>
                         <span>({book.ratings})</span>
                         <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-900" />
                         <FaCommentAlt className="text-gray-800"/>
                         <span>{book.reviews} reviews</span>
                       </div>
                       <p className="text-4xl mt-5 font-semibold">
                         {book.resalePrice} <span>&#2547;</span>
                       </p>
                     </div>
                   </div>
                 </div>)
               }
           </div>
        </section>
    );
};

export default Categories;
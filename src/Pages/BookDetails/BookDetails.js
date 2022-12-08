import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  HiArrowNarrowRight,
  HiOutlinePhone,
  HiOutlineMail,
  HiShoppingCart,
} from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import BookingModal from "./BookingModal";
import UseVerifyUser from "../../Hooks/UseVerifyUser";
import { UserContext } from "../../Contexts/AuthContext/AuthContext";

const BookDetails = () => {
    const [closeModal, setCloseModal] = useState(false);
    const [buyStatus,setBuyStatus] = useState(false);
    const {user} = useContext(UserContext);
    const userType = UseVerifyUser(user?.email);
    const navigate = useNavigate();
    
  const book = useLoaderData();
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
    resalePrice,
    sellerName,
    verified,
    title,
  } = book;

  console.log(book)

  const verifyBuyer = () =>{
    
    if(userType[0] === 'seller'){
      setCloseModal(true);
      const confirmAction = window.confirm('Your account is a seller account. You can not purchase. Want to add a product?');
      if(confirmAction){
        navigate('/dashboard/addAProduct');
      }
    }else{
      setCloseModal(false);
    }
  }

  return (
    <section className="bg-zinc-300 mb-36 mt-20">
      <div className="max-w-screen-xl py-24 mx-auto flex lg:flex-row flex-col gap-20">
        {/* Image */}
        <div className="bg-white h-[600px] p-14 lg:w-1/2 w-11/12 mx-auto">
          <img
            className="mx-auto lg:w-2/3 w-10/12 hover:-rotate-6 transition-all duration-500"
            src={picture}
            alt=""
          />
        </div>
        {/* Descriptions */}
        <div className="lg:w-1/2 w-11/12 mx-auto">
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
      <div className="max-w-screen-xl lg:px-20 px-0 flex lg:flex-row flex-col items-center lg:gap-32 gap-10 pb-16 mx-auto">
        <div>
          <p className="text-3xl flex gap-3 mb-3 items-center text-gray-600">
            Seller Info{" "}
            <span>
              <HiArrowNarrowRight className="text-gray-800 text-2xl mt-2" />
            </span>
          </p>

          <div>
            <div className="text-gray-600 flex gap-1">
              <span className="text-lg font-medium">Seller Name:</span>{" "}
              <p className="flex items-center gap-2">
                {verified && <FaCheckCircle className="text-blue-600" />}
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
        <div>
         {
           buyStatus? 
          <Link to='/dashboard/myOrders' className="text-xl link link-primary">View Orders</Link>
           :
           <label
           onClick={verifyBuyer}
             htmlFor="buyBook"
             className="btn rounded-none text-gray-300 hover:bg-gray-800 hover:text-white"
           >
             {" "}
             <HiShoppingCart  className="mr-3 text-xl" /> Buy Now
           </label>
         }
        </div>
      </div>

      {/* Modal */}

     {
         !closeModal &&
         <BookingModal
         
          book={book}
         closeModal={closeModal}
         setCloseModal={setCloseModal}
         setBuyStatus={setBuyStatus}
         ></BookingModal>
     }
    </section>
  );
};

export default BookDetails;


import React, { useContext } from 'react';
import { UserContext } from "../../Contexts/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

const BookingModal = ({book, setCloseModal, setBuyStatus}) => {
    const {title, resalePrice, picture, _id} = book;

    const { user } = useContext(UserContext);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const bookNow = (order) =>{
        order.img = picture;
        order.status = 'pending';
        order.productId = _id
       

            fetch('http://localhost:5000/orders', {
                method:'post',
                headers:{
                    'content-type':'application/json',
                },
                body:JSON.stringify({order})
            })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    toast.success('Order Confirmed');
                    setCloseModal(true);
                    setBuyStatus(true);
                }
                
            })

      }
    
    return (
        <div>
            <input type="checkbox" id="buyBook" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h1 className="text-3xl font-medium mb-10 text-gray-700">Buy Now</h1>
          <form onSubmit={handleSubmit(bookNow)} action="">
            {/* Name */}
            <div className="form-control w-full">
              <label className="label">
                {" "}
                <span className="label-text text-lg text-gray-700">
                  Name
                </span>{" "}
              </label>
              <input
                value={user?.displayName}
                className="cursor-not-allowed input input-bordered border-gray-400 w-full text-gray-800"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-error" role="alert">
                  {errors.name?.message}
                </p>
              )}
            </div>
            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                {" "}
                <span className="label-text text-lg text-gray-700">
                  Email
                </span>{" "}
              </label>
              <input
                value={user?.email}
                className="cursor-not-allowed input input-bordered border-gray-400 w-full text-gray-800"
                {...register("email", {
                  required: "Email Address is required",
                })}
              />
              {errors.email && (
                <p className="text-error" role="alert">
                  {errors.email?.message}
                </p>
              )}
            </div>
            {/* Book Name */}
            <div className="form-control w-full">
              <label className="label">
                {" "}
                <span className="label-text text-lg text-gray-700">
                  Book
                </span>{" "}
              </label>
              <input
                value={title}
                className="cursor-not-allowed input input-bordered border-gray-400 w-full text-gray-800"
                {...register("book", { required: "book is required" })}
              />
              {errors.book && (
                <p className="text-error" role="alert">
                  {errors.book?.message}
                </p>
              )}
            </div>
            {/* Price */}
            <div className="flex gap-5">
              <div className="form-control w-full">
                <label className="label">
                  {" "}
                  <span className="label-text text-lg text-gray-700">
                    Price (&#2547;)
                  </span>{" "}
                </label>
                <input
                  value={resalePrice}
                  className="cursor-not-allowed input input-bordered border-gray-400   w-full text-gray-800"
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && (
                  <p className="text-error" role="alert">
                    {errors.price?.message}
                  </p>
                )}
              </div>
              {/* Phone */}
              <div className="form-control w-full">
                <label className="label">
                  {" "}
                  <span className="label-text text-lg text-gray-700">
                    Phone (<span className="text-red-600 text-xl">*</span>)
                  </span>{" "}
                </label>
                <input
                  className="input input-bordered border-gray-400   w-full text-gray-800"
                  {...register("phone", { required: "Phone no is required" })}
                />
                {errors.phone && (
                  <p className="text-error" role="alert">
                    {errors.phone?.message}
                  </p>
                )}
              </div>
            </div>
            {/* Location */}
            <div className="form-control w-full">
              <label className="label">
                {" "}
                <span className="label-text text-lg text-gray-700">
                  Meeting Location (<span className="text-red-600 text-xl">*</span>)
                </span>{" "}
              </label>
              <input
                className="input input-bordered border-gray-400   w-full text-gray-800"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <p className="text-error" role="alert">
                  {errors.location?.message}
                </p>
              )}
            </div>
          <div className="modal-action">
              <button onClick={ () => setCloseModal(true)} className='btn rounded-none text-gray-300 hover:bg-gray-800 hover:text-white w-40'>Cancel</button>
            <label
              htmlFor="buyBook">
              <button className="btn rounded-none text-gray-300 hover:bg-gray-800 hover:text-white w-40" type='submit'>Submit</button>
            </label>
          </div>
          </form>
        </div>
      </div>
        </div>
    );
};

export default BookingModal;
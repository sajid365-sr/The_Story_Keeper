import { useQuery } from "@tanstack/react-query";
import { Rating } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiArrowNarrowDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Contexts/AuthContext/AuthContext";


const AddAProduct = () => {
  const [category, setCategory] = useState(false);
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const ImageHostKey = process.env.REACT_APP_imgUploadKey;
  const navigate = useNavigate();

  const { data: categoryName = [], refetch } = useQuery({
    queryKey: ["categoryName"],
    queryFn: async () => {
      const res = await fetch(
        "https://the-story-keeper-server-sajid365-sr.vercel.app/categories"
      );
      const data = await res.json();

      return data;
    },
  });

  if (errors) {
    console.log(errors);
  }

  refetch();
  const handleCategory = (event) => {
    let value = event.target.value;

    if (value === "Others") {
      setCategory(true);
    }
  };

  const handleEmail = (event) => {
    event.target.value = user?.email;
  };

  const handleName = (event) => {
    event.target.value = user?.displayName ? user.displayName : "";
  };

  const handleFormSubmit = (book) => {
    const img = book.picture[0];
    const formData = new FormData();
    formData.append("image", img);



    fetch(`https://api.imgbb.com/1/upload?key=${ImageHostKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          book.picture = imgData.data.url;
          book.status = "available";

          fetch("https://the-story-keeper-server-sajid365-sr.vercel.app/books", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ book }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Items added successfully");
                // event.target.reset();
                reset();
                navigate("/dashboard/myProducts");
              }
            });
        }
      });
  };

  return (
    <div className="max-w-screen-lg mx-auto my-[20%] lg:my-[7%] pt-10 pb-20 lg:px-16 px-8 lg:rounded-lg bg-zinc-800">
      <h1 className="text-white text-center text-4xl">Add a new book</h1>
      <p className="text-gray-400 text-sm mb-20  text-center">
        Note: <span className="text-red-500 ml-1 text-xl">*</span> mark fields
        are mandatory
      </p>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/*==================================== Book Title ============================================ */}

        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-error">This field is required</span>
          )}
          <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
            Book Title (<span className="text-red-500 text-xl">*</span>)
          </label>
        </div>

        {/*==================================== Photos & publish Year ========================================== */}

        <div className="flex flex-col lg:flex-row items-center md:gap-6 mb-6">

          {/* Photo */}
          <div className="relative z-0 mb-6 lg:w-3/4 w-full group">
            <span className="text-lg mb-2 text-gray-300"></span>( )

            <label
              className="block mb-2 text-sm font-medium text-white "
              htmlFor="photo upload"
            >
              Photo (<span className="text-red-500 text-lg">*</span>)
            </label>
            <input
              className="block w-full mb-5 text-sm text-gray-200 border bg-zinc-600 border-gray-300 py-2 hover:bg-zinc-500 rounded-md cursor-pointer focus:outline-none"
              id="photo upload"
              type="file"
              {...register("picture", { required: true })}
            />
            {errors.picture && <span className="text-error">This field is required</span>}
          </div>

          {/* Publish Year */}
          <div className="relative z-0 mb-6 lg:w-1/3 w-full group">
            <input
              type="number"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("publishYear")}
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-200  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-12">
              Publish Year
            </label>
          </div>
        </div>

        {/*==================================== Description ============================================ */}

        <div className="relative z-0 mb-10 w-full group">
          <textarea
            rows={5}
            type="text"
            className="block pt-5 px-5 w-full text-base text-white bg-transparent border-3 rounded-lg  outline-dashed outline-gray-400 outline-2 focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-4 peer"
            {...register("description")}
          />
          <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-5 left-5 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">
            Description
          </label>
        </div>

        {/*==================================== Author & Category ============================================ */}

        <div className="grid md:grid-cols-2 md:gap-6 mb-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("author", { required: true })}
            />
            {errors.author && (
              <span className="text-error">This field is required</span>
            )}
            <label className="peer-focus:font-medium absolute text-lg text-gray-200  duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-12">
              Author (<span className="text-red-500 text-2xl">*</span>)
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            {category ? (
              <div className="relative z-0 mb-6 w-full group">
                <div className="flex justify-between">
                  <div className="w-full">
                    <input
                      type="text"
                      className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
                      {...register("category", {
                        required: true,
                      })}
                    />
                    {errors.category && (
                      <span className="text-error">This field is required</span>
                    )}

                    <label className="peer-focus:font-medium absolute text-xl text-gray-200  duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-sm peer-focus:-translate-y-8">
                      Category Name (
                      <span className="text-red-500 text-xl">*</span>)
                    </label>
                  </div>
                  <p
                    onClick={() => setCategory(false)}
                    className="flex flex-col ml-3 cursor-pointer text-gray-300 hover:text-orange-400"
                  >
                    <HiArrowNarrowDown className=" text-2xl" />
                    <span className="text-sm">Select here</span>
                  </p>
                </div>
              </div>
            ) : (
              <select
                onClick={handleCategory}
                className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                {...register("category", { required: true })}
              >
                {errors.category && (
                  <span className="text-error">This field is required</span>
                )}
                <option>Choose a category</option>
                {categoryName.map((category, i) => (
                  <option key={i} className="text-gray-600" value={category}>
                    {category}
                  </option>
                ))}
                <option className="text-gray-600" value="Others">
                  Others
                </option>
              </select>
            )}
          </div>
        </div>

        {/*==================================== Ratings & Reviews ============================================ */}

        <div className="grid md:grid-cols-2 md:gap-6 mb-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("ratings")}
            />
            <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              <div className="flex gap-2">
                <span>Ratings</span>
                <Rating>
                  (<Rating.Star></Rating.Star>)
                </Rating>
              </div>
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("reviews")}
            />
            <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Reviews
            </label>
          </div>
        </div>

        {/*================================== Seller Name and Location================================= */}

        <div className="grid md:grid-cols-2 md:gap-6 mb-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              onClick={user && handleName}
              type="text"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("sellerName", { required: true })}
            />
            {errors.sellerName && (
              <span className="text-error">This field is required</span>
            )}
            <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Seller Name (<span className="text-red-500 text-xl">*</span>)
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("location", { required: true })}
            />
            {errors.location && (
              <span className="text-error">This field is required</span>
            )}
            <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Location (<span className="text-red-500 text-xl">*</span>)
            </label>
          </div>
        </div>

        {/*==================================== Phone & Email ========================================== */}

        <div className="grid md:grid-cols-2  md:gap-6 mb-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <span className="text-error">This field is required</span>
            )}
            <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Phone (<span className="text-red-500 text-xl">*</span>)
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              onClick={user && handleEmail}
              readOnly
              type="email"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-error">This field is required</span>
            )}
            <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Email (<span className="text-red-500 text-xl">*</span>)
            </label>
          </div>
        </div>

        {/*==================================== Price ========================================== */}

        <div className="grid md:grid-cols-2 md:gap-6 mb-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("originalPrice", {
                required: true,
              })}
            />
            {errors.originalPrice && (
              <span className="text-error">This field is required</span>
            )}
            <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Original Price <span className="text-2xl">(&#2547;)</span>
              <span className="text-red-500 ml-1 text-xl">*</span>
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("resalePrice", {
                required: true,
              })}
            />
            {errors.resalePrice && (
              <span className="text-error">This field is required</span>
            )}
            <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Resale Price <span className="text-2xl">(&#2547;)</span>
              <span className="text-red-500 ml-1 text-xl">*</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="text-white mt-10 bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddAProduct;

import { Rating } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiArrowNarrowDown } from "react-icons/hi";
import { UserContext } from "../../../Contexts/AuthContext/AuthContext";

const AddAProduct = () => {
  const [category, setCategory] = useState(false);
    const {user} = useContext(UserContext);

    const ImageHostKey = process.env.REACT_APP_imgUploadKey;
    

  const handleCategory = (event) => {
    const value = event.target.value;
    if (value === "Others") {
      setCategory(true);
    }
  };

  const handleEmail =(event) =>{
      event.target.value = user?.email;
      
  }

  const handleName = (event) =>{
    event.target.value = user?.displayName? user.displayName : '';
  }

  const { register,handleSubmit } = useForm();

  const handleFormSubmit = (book) =>{
    // const { author,
    //     category,
    //     description,
    //     email,
    //     location,
    //     originalPrice,
    //     phone,
    //     publishYear,
    //     resalePrice,
    //     sellerName,
    //     title,
    //     ratings,
    //     reviews
    // } = data;

      const img = book.picture[0];
    const formData = new FormData();
    formData.append('image', img);


    fetch(`https://api.imgbb.com/1/upload?key=${ImageHostKey}`,{
        method:'POST',
        body:formData,
    })
    .then(res => res.json())
    .then((imgData) =>{
        if(imgData.success){
            book.sellerVerified = false;
            book.picture = imgData.data.url;
            
            fetch('http://localhost:5000/books',{
                method:'post',
                headers:{
                    'content-type':'application/json',
                },
                body:JSON.stringify({book})
            })
            .then(res => res.json())
            .then(data =>{
                if(data.acknowledged){
                    toast.success('Items added successfully')
                }
                console.log(data)
            })

           
        }
    })
  }

  return (
    <div className="max-w-screen-lg mx-auto my-[7%] pt-10 pb-20 px-16 rounded-lg bg-zinc-800">
      <h1 className="text-white text-center text-4xl">Add a new book</h1>
      <p className="text-gray-400 text-sm mb-8  text-center">Note: <span className="text-red-500 ml-1 text-xl">*</span> mark fields are mandatory</p>
      <form onSubmit={handleSubmit(handleFormSubmit)}>

        {/*==================================== Book Title ============================================ */}

        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
            {...register("title", { required: "Title is required" })}
          />
          <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
             

            Book Title 
            (<span className="text-red-500 text-xl">*</span>)
              
          </label>
        </div>

        {/*==================================== Photos & publish Year ========================================== */}

        <div className="flex flex-col lg:flex-row items-center md:gap-6 mb-6">
          <div className="relative z-0 mb-6 lg:w-3/4 w-full group">
            <span className="text-lg mb-2 text-gray-300">Photo</span>(<span className="text-red-500 text-xl">*</span>)
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointe  hover:bg-zinc-700"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">
                    Click to upload book photo
                  </span>
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden"
              {...register("picture", { required: "Picture is required" })}
              />
            </label>
          </div>
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
              {...register("author", { required: "Author name required" })}
            />
            <label className="peer-focus:font-medium absolute text-lg text-gray-200  duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-12">
              Author
              (<span className="text-red-500 text-2xl">*</span>)
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
                      {...register("category", { required: "Category is required" })}
                    />

                    <label className="peer-focus:font-medium absolute text-xl text-gray-200  duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-sm peer-focus:-translate-y-8">
                      Category Name 
                      (<span className="text-red-500 text-xl">*</span>)
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
                onChange={handleCategory}
                className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                {...register("category", { required: "Category is required" })}
              >
                <option defaultValue='Choose Category'>
                  Choose Category '*'
                  
                </option>
                <option className="text-gray-600" value="Science Fiction">
                  Science Fiction
                </option>
                <option className="text-gray-600" value="History and Tradition">
                  History and Tradition
                </option>
                <option className="text-gray-600" value="Fiction">
                  Fiction
                </option>
                <option className="text-gray-600" value="Islamic">
                  Islamic
                </option>
                <option className="text-gray-600" value="Admission">
                  Admission
                </option>
                <option className="text-gray-600" value="Travel">
                  Travel
                </option>
                <option
                  className="text-gray-600"
                  value="Philosophy and Philosopher"
                >
                  Philosophy and Philosopher
                </option>
                <option
                  className="text-gray-600"
                  value="Biographies, Memories & Interviews"
                >
                  Biographies, Memories & Interviews
                </option>
                <option className="text-gray-600" value="Politics">
                  Politics
                </option>
                <option className="text-gray-600" value="Story">
                  Story
                </option>
                <option
                  className="text-gray-600"
                  value="Business, Investing & Economics"
                >
                  Business, Investing & Economics
                </option>
                <option className="text-gray-600" value="Books of Drama">
                  Books of Drama
                </option>
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
            onClick={ user && handleName}
            
              type="text"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("sellerName", {required:'Provide seller name'})}
            />
            <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Seller Name
              (<span className="text-red-500 text-xl">*</span>)
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("location", {required:'Provide location'})}
            />
            <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Location
              (<span className="text-red-500 text-xl">*</span>)
            </label>
          </div>
        </div>

{/*==================================== Phone & Email ========================================== */}

<div className="grid md:grid-cols-2  md:gap-6 mb-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("phone", {required:'Phone number is required'})}
            />
            <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Phone
              (<span className="text-red-500 text-xl">*</span>)
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
            onClick={ user && handleEmail}
            readOnly
              type="email"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("email", {required:'Email is required'})}
            />
            <label  className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Email
              (<span className="text-red-500 text-xl">*</span>)
            </label>
          </div>
        </div>

{/*==================================== Price ========================================== */}

        <div className="grid md:grid-cols-2 md:gap-6 mb-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("originalPrice", {required:'Enter original price value'})}
            />
            <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Original Price <span className="text-2xl">(&#2547;)</span><span className="text-red-500 ml-1 text-xl">*</span>
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              className="block pt-3 px-5 w-full text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#155c72] focus:border-b-4 peer"
              {...register("resalePrice", {required:'Enter resale price value'})}
            />
            <label className="peer-focus:font-medium absolute text-base text-gray-200  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
              Resale Price <span className="text-2xl">(&#2547;)</span><span className="text-red-500 ml-1 text-xl">*</span>
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

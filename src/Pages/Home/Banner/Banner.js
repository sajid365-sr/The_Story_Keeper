import React from "react";
import literature from "../../../Assets/banner/literature.png";
import readingBook from "../../../Assets/banner/readingBook.png";
import bestSelling from "../../../Assets/banner/bestSelling.png";
import png1 from "../../../Assets/banner/png1.png";
import png2 from "../../../Assets/banner/png2.png";
import png3 from "../../../Assets/banner/png3.png";
import { Carousel } from "flowbite-react";


const Banner = () => {
  return (
  
      <section className="lg:h-[80vh] h-[45vh] w-11/12 lg:max-w-screen-xl mt-10 mx-auto mb-52">
        <Carousel slideInterval={5000}>
          <div
            style={{
              backgroundImage: `url(${png1})`,
              backgroundPosition: "40%",
              backgroundRepeat: "no-repeat",
              
            }}
            className= "carouselItem bg-cover lg:bg-contain  bg-emerald-600 flex h-full items-center justify-center"
          >
            <div className="flex items-center">
              <div className="w-3/5 lg:px-10 lg:py-14 py-6 px-5">
                <p className="uppercase font-Kaushan">Chapter one</p>

                <h1 className="lg:text-5xl text-3xl text-white">Best condition <span className="text-[#291334] bg-amber-600 px-5">used books</span></h1>

                <p className="my-10 hidden lg:block text-gray-200 tracking-widest">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Iste, maxime eum? Adipisci ipsam eum, nulla vero dolorem
                  placeat reprehenderit, vitae, incidunt quod tempore iure
                  totam.
                </p>
                <button className="btn btn-sm lg:btn-md text-white mt-3 tracking-widest rounded-none">
                  Read More
                </button>
              </div>
              <div className="w-2/5">
                <img className="lg:w-3/4 w-[190px] lg:ml-16 lg:mt-14" src={literature} alt="" />
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundImage: ` url(${png2})`,
              backgroundPosition: "bottom",
              
            }}
            className="carouselItem bg-cover lg:bg-contain bg-[#c7547f]  flex h-full items-center justify-center"
          >
            <div className="flex items-center flex-col h-full lg:flex-row-reverse lg:gap-20">
              <div className="lg:w-2/5 flex justify-end w-full">
                <img className="-rotate-6 lg:w-full w-[160px]" src={readingBook} alt="" />
              </div>
              <div className="lg:w-3/5 w-full lg:px-10 lg:py-14 py-2 px-5 ">
                <p className="uppercase font-Kaushan">Chapter Two</p>

                <div className="lg:text-5xl text-3xl text-white">
                 <p className="lg:mb-8 mb-3"> Get Up To{" "}
                  <span className="bg-[#291334] lg:px-5 px-1 bg-opacity-70 font-semibold text-amber-500">
                    50% discount
                  </span>{" "}</p>
                  
                  <p>for this <span className="text-sky-300  lg:px-5 bg-violet-900 mt-10">new year occasion</span></p>
                </div>

                <p className="my-10 hidden lg:block text-gray-200 font-medium text-lg tracking-widest">
                  Books are the quietest and most constant of friends; they are
                  the most accessible and wisest of counselors, and the most
                  patient of teachers.
                </p>
                <button className="btn btn-sm lg:btn-md text-white mt-3 tracking-widest rounded-none">
                  Explore Now
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundImage: ` url(${png3})`,
              backgroundPosition: "bottom",
              backgroundRepeat: "no-repeat",
            }}
            className="carouselItem bg-cover lg:bg-contain bg-[#411904] flex h-full items-center justify-center"
          >
            <div className="flex lg:flex-row-reverse h-full lg:items-center lg:gap-20">
              <div className="w-1/2 pl-5 lg:px-10 lg:py-14 pt-28 lg:mb-[10%]">
                <p className="uppercase font-Kaushan text-gray-300">Chapter Three</p>

                <h1 className="text-5xl lg:text-white text-gray-800">Books Bestsellers</h1>

                <p className="my-10 hidden lg:block text-gray-300 tracking-widest">
                  Fairy tales are more than true: not because they tell us that
                  dragons exist, but because they tell us that dragons can be
                  beaten.
                </p>
                <button className="btn btn-sm lg:btn-md text-white mt-3 tracking-widest rounded-none">
                  Explore Now
                </button>
              </div>
              <div className="w-1/2">
                <img className="lg:ml-5 lg:mt-10 mt-5 mr-4" src={bestSelling} alt="" />
              </div>
            </div>
          </div>
        </Carousel>
      </section>
    
  );
};

export default Banner;

import React from "react";
import literature from "../../../Assets/banner/literature.png";
import readingBook from "../../../Assets/banner/readingBook.png";
import bestSelling from "../../../Assets/banner/bestSelling.png";
import png1 from "../../../Assets/banner/png1.png";
import png2 from "../../../Assets/banner/png2.png";
import png3 from "../../../Assets/banner/png3.png";

import { Carousel } from "flowbite-react";
import "./Banner.css";

const Banner = () => {
  return (
    <div>
      <div className="lg:h-[80vh] h-[40vh] w-11/12 lg:max-w-screen-xl mx-auto mb-52">
        <Carousel slideInterval={5000}>
          <div
            style={{
              backgroundImage: `url(${png1})`,
              backgroundPosition: "40%",
              backgroundRepeat: "no-repeat",
            }}
            className="carouselItem bg-emerald-600 flex h-full items-center justify-center"
          >
            <div className="flex">
              <div className="w-3/5 px-10 py-14 ">
                <p className="uppercase font-Kaushan">Chapter one</p>

                <h1 className="text-5xl text-white">Best condition <span className="text-secondary bg-amber-600 px-5">used books</span></h1>

                <p className="my-10 text-gray-200 tracking-widest">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Iste, maxime eum? Adipisci ipsam eum, nulla vero dolorem
                  placeat reprehenderit, vitae, incidunt quod tempore iure
                  totam.
                </p>
                <button className="btn text-white tracking-widest rounded-none">
                  Read More
                </button>
              </div>
              <div className="w-2/5">
                <img className=" w-3/4 ml-16 mt-14" src={literature} alt="" />
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundImage: ` url(${png2})`,
              backgroundPosition: "bottom",
              backgroundSize: "cover",
            }}
            className="carouselItem bg-[#c7547f]  flex h-full items-center justify-center"
          >
            <div className="flex flex-row-reverse gap-20">
              <div className="w-2/5">
                <img className="-rotate-6" src={readingBook} alt="" />
              </div>
              <div className="w-3/5 px-10 py-14 ">
                <p className="uppercase font-Kaushan">Chapter Two</p>

                <div className="text-5xl text-white">
                 <p className="mb-8"> Get Up To{" "}
                  <span className="bg-secondary px-5 bg-opacity-70 font-semibold text-amber-500">
                    50% discount
                  </span>{" "}</p>
                  
                  <p>for this <span className="text-sky-300 px-5 bg-violet-900 mt-10">new year occasion</span></p>
                </div>

                <p className="my-10 text-gray-200 font-medium text-lg tracking-widest">
                  Books are the quietest and most constant of friends; they are
                  the most accessible and wisest of counselors, and the most
                  patient of teachers.
                </p>
                <button className="btn text-white tracking-widest rounded-none">
                  Explore Now
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundImage: ` url(${png3})`,
              backgroundPosition: "bottom",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="carouselItem bg-[#411904] flex h-full items-center justify-center"
          >
            <div className="flex  flex-row-reverse gap-20">
              <div className="w-1/2 px-10 py-14 mb-[10%]">
                <p className="uppercase font-Kaushan">Chapter Three</p>

                <h1 className="text-5xl text-white">Books Bestsellers</h1>

                <p className="my-10 text-gray-300 tracking-widest">
                  Fairy tales are more than true: not because they tell us that
                  dragons exist, but because they tell us that dragons can be
                  beaten.
                </p>
                <button className="btn text-white ml-[50%] tracking-widest rounded-none">
                  Explore Now
                </button>
              </div>
              <div className="w-1/2">
                <img className=" ml-5 mt-10" src={bestSelling} alt="" />
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;

import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../Contexts/AuthContext/AuthContext";

const WishList = () => {
  const { user } = useContext(UserContext);

  const { data: wishList = [], refetch } = useQuery({
    queryKey: ["wishList"],
    queryFn: async () => {
      const res = await fetch(
        `https://the-story-keeper-server-sajid365-sr.vercel.app/wishList?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  refetch();

  return (
    <div className="mx-10">
      {wishList.length < 1 ? (
        <div className="my-24 text-center">
          <h1 className="text-4xl text-gray-600 font-semibold">
            You have no wishList
          </h1>
          <Link to="/shop" className="link link-primary">
            Buy some
          </Link>
        </div>
      ) : (
        <div className="grid my-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {wishList.map((list) => (
            <div
              key={list._id}
              className="card border-t-4 border-l-4 border-gray-800  rounded-tl-3xl bg-zinc-200"
            >
              <figure className="py-8 bg-white">
                <img
                  src={list.picture}
                  alt="books"
                  className="h-[280px] w-[200px] hover:scale-110 hover:-rotate-6 transition-all duration-500 "
                />
              </figure>
              <div className="card-body bg-white text-center px-5 py-0">
                <p className="card-title text-2xl justify-center font-bold text-gray-800">
                  {list.title}
                </p>

                <div className="text-gray-600">
                  <p className="mb-3 font-medium">{list.author}</p>

                  <div className="flex items-center mt-5 justify-between">
                    <span className="text-3xl text-[#1da9c5] font-bold">
                      {list.price} <span>&#2547;</span>
                    </span>
                    <Link to={`/dashboard/payment2/${list.productId}`}>
                      <button className="btn btn-sm bg-[#057be8] text-gray-100 border-none  rounded-none px-8 text-lg">
                        Pay
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;

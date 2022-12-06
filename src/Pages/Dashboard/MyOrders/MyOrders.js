import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../Contexts/AuthContext/AuthContext";

const MyOrders = () => {
  const { user } = useContext(UserContext);
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/myOrders?email=${user?.email}`
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="overflow-x-auto">
      {orders.length < 1 ? (
        <div className="my-24 text-center">
          <h1 className="text-4xl text-gray-600 font-semibold">
            You have to orders
          </h1>
          <Link to="/shop" className="link link-primary">
            Buy some
          </Link>
        </div>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-lg text-gray-700"></th>
              <th className="text-lg text-gray-700">Picture</th>
              <th className="text-lg text-gray-700">Book Title</th>
              <th className="text-lg text-gray-700">Price</th>
              <th className="text-lg text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 1 &&
              orders.map((order, i) => (
                <tr key={order._id} className="h-10 hover text-gray-600">
                  <th>{i + 1}</th>
                  <th className="p-2">
                    <div className="avatar">
                      <div className="w-16">
                        <img src={order.img} alt="order" />
                      </div>
                    </div>
                  </th>
                  <th>{order.book}</th>
                  <th className="text-xl">{order.price} (&#2547;)</th>
                  <th>
                    <label
                      htmlFor="confirmation-modal"
                      className="btn rounded-none px-5 btn-sm"
                    >
                      Pay
                    </label>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;

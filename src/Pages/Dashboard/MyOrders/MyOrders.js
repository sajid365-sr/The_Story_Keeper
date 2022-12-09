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
        const res = await fetch( `http://localhost:5000/myOrders?email=${user?.email}`, {
          headers:{
            authorization : `Bearer ${localStorage.getItem('AccessToken')}`
          }
        });
        const data = await res.json();

        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });
  refetch();
  console.log(orders);

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
              <th className="text-lg text-gray-700">Details</th>
              <th className="text-lg text-gray-700">Price</th>
              <th className="text-lg text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id} className=" hover text-gray-600">
                <th>{i + 1}</th>
                <th className="p-2">
                  <div className="avatar w-1/4">
                    <img src={order.img} alt="order" />
                  </div>
                </th>
                <th>
                  <p>{order.book}</p>
                  <p>{order.author}</p>
                </th>
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

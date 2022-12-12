import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../Contexts/AuthContext/AuthContext";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../../../Shared/Loading/Loading";

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
          `http://localhost:5000/myOrders?email=${user?.email}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
            },
          }
        );
        const data = await res.json();

        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });
  refetch();
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="overflow-x-auto mx-10 my-24">
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
                  <div className="avatar lg:w-1/4">
                    <img src={order.picture} alt="order" />
                  </div>
                </th>
                <th>
                  <p className="text-xl text-gray-800">{order.title}</p>
                  <p className="text-sm">{order.author}</p>
                </th>
                <th className="text-3xl text-[#1da9c5] font-bold">
                  {order.price} (&#2547;)
                </th>
                <th>
                  {order.status === "pending" && (
                    <Link
                      to={`/dashboard/payment/${order._id}`}
                      className="btn btn-sm bg-[#057be8] text-gray-100 border-none
                    rounded-none px-8 text-lg"
                    >
                      Pay
                    </Link>
                  )}
                  {order.status === "paid" && (
                    <p className="text-green-600 flex font-normal text-xl items-center gap-3">
                      {" "}
                      <FaCheckCircle /> Paid
                    </p>
                  )}
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

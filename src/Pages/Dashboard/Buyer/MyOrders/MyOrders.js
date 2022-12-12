import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../Contexts/AuthContext/AuthContext";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../../../Shared/Loading/Loading";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

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
        <Table className="table w-full">
          <Thead>
            <Tr>
              <Th className="text-lg text-gray-700"></Th>
              <Th className="text-lg text-gray-700">Picture</Th>
              <Th className="text-lg text-gray-700">Details</Th>
              <Th className="text-lg text-gray-700">Price</Th>
              <Th className="text-lg text-gray-700">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order, i) => (
              <Tr key={order._id} className=" hover text-gray-600">
                <Th>{i + 1}</Th>
                <Th className="p-2">
                  <div className="avatar lg:w-1/4">
                    <img src={order.picture} alt="order" />
                  </div>
                </Th>
                <Th>
                  <p className="text-xl text-gray-800">{order.title}</p>
                  <p className="text-sm">{order.author}</p>
                </Th>
                <Th className="text-3xl text-[#1da9c5] font-bold">
                  {order.price} (&#2547;)
                </Th>
                <Th>
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
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  );
};

export default MyOrders;

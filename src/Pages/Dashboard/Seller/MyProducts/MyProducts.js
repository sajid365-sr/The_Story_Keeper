import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../Contexts/AuthContext/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

const MyProducts = () => {
  const { user } = useContext(UserContext);

  // Get all added products
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/myProducts?email=${user?.email}`,
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
  console.log(products)

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/myProduct/delete/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          toast.success("Item deleted successfully");
          refetch();
        }
      })
      .catch((err) => console.error(err));
  };

  const handleAdvertise = (product) => {
    axios
      .post("http://localhost:5000/advertise", {
        product,
      })
      .then((res) => {
        if (res.statusText === "OK") {
          toast.success("Items have been advertised");
          refetch();
        }
      });
  };

  refetch();
  return (
    <div className="overflow-x-auto">
      {products.length < 1 ? (
        <div className="my-24 text-center">
          <h1 className="text-4xl text-gray-600 font-semibold">
            You have to products to display.
          </h1>
          <Link to="/dashboard/addAProduct" className="link link-primary">
            Add Some
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
              <th className="text-lg text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product, i) => (
                <tr key={product._id} className="h-10 hover text-gray-600">
                  <th>{i + 1}</th>
                  <th className="p-2">
                    <div className="avatar">
                      <div className="w-16">
                        <img src={product.picture} alt="order" />
                      </div>
                    </div>
                  </th>
                  <th>{product.title}</th>
                  <th className="text-xl">{product.resalePrice} (&#2547;)</th>
                  <th>
                    {
                      product.status === 'available' &&
                      <p className="text-green-600">Available</p>
                    }
                    {
                      product.status === 'pending' &&
                      <p className="text-amber-600">waiting fo payment..</p>
                    }
                    {
                      product.status === 'sold' &&
                      <p className="text-blue-600 flex items-center gap-2 text-xl"><FaCheckCircle/> Sold</p>
                    }
                    
                    {product.status === "available" && (
                      <button
                        onClick={() => handleAdvertise(product)}
                        className={`btn btn-sm rounded-none ${
                          product.advertise ? "btn-success" : "btn-primary"
                        }`}
                      >
                        {product.advertise ? "Advertised" : "Advertise"}
                      </button>
                    )}
                  </th>
                  <th>
                    {product.status === "available" && (
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn rounded-none btn-sm"
                      >
                        Delete
                      </button>
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

export default MyProducts;

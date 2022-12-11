import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../Contexts/AuthContext/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

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
                    <p
                      className={`text-lg ${
                        product.status === "available"
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    >
                      {product.status === 'pending'? 'Waiting fo payment' : `${product.status}`}
                    </p>
                    {product.status === "available" && (
                      <button
                        onClick={() => handleAdvertise(product)}
                        className={`btn btn-sm ${
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
                        className="btn btn-sm"
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

      {/* Delete modal */}
      {/* <label htmlFor="my-modal" className="btn">
        open modal
      </label> */}

      {/* Put this part before </body> tag */}
      {/* <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MyProducts;

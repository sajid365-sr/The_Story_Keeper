import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

const AllSeller = () => {
  const { data: sellers = [], refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch("https://the-story-keeper-server-sajid365-sr.vercel.app/allSeller",{
        headers:{
          authorization : `Bearer ${localStorage.getItem('AccessToken')}`
        }
      });
      const data = await res.json();
      return data;
    },
  });
  

  // Verify seller 
  const handleVerification = (email) =>{
    axios.get(`https://the-story-keeper-server-sajid365-sr.vercel.app/seller/verify?email=${email}`,{
      headers:{
        authorization : `Bearer ${localStorage.getItem('AccessToken')}`
      }
    });

    refetch();
  }

    // Delete seller
    const handleDeleteSeller = (email) =>{
      const confirm = window.confirm(`Are you sure want to delete ${email}?`);
      if(confirm){
        fetch(`https://the-story-keeper-server-sajid365-sr.vercel.app/delete/seller?email=${email}`)
        .then(res => res.json())
        .then(data => {
          
          if(data.acknowledged){
            toast.success('Seller deleted successfully');
            refetch();
          }
        })
      }
    }



  return (
    <div>
      <h1 className="text-4xl text-center my-10 underline text-gray-600 font-semibold">
        Seller list
      </h1>
      <div className="overflow-x-auto">
        {sellers.length < 1 ? (
          <div className="my-24 text-center">
            <h1 className="text-4xl text-gray-600 font-semibold">
              No sellers available
            </h1>
          </div>
        ) : (
          <table className="table w-3/4 mx-auto">
            <thead>
              <tr>
                <th className="text-lg text-gray-700"></th>
                <th className="text-lg text-gray-700">Name</th>
                <th className="text-lg text-gray-700">Email</th>
                <th className="text-lg text-gray-700">Status</th>
                <th className="text-lg text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, i) => (
                <tr key={seller._id} className=" hover text-gray-600">
                  <th>{i + 1}</th>
                  <th>
                    <p>{seller.name}</p>
                  </th>
                  <th className="text-gray-800">
                    <p>{seller.email}</p>
                  </th>
                  <th>
                      {
                          seller.verified ? <p className="flex text-blue-600 font-normal items-center gap-1"><FaCheckCircle/> Verified</p> 
                          :
                          <p className="text-error font-medium">Not Verified</p>
                          
                      }
                  </th>
                  <th>
                      {
                          !seller.verified &&
                          <button onClick={() => handleVerification(seller.email)} className="btn btn-sm mr-3 rounded-none btn-outline">Verify</button>
                      }
                      <button onClick={ () => handleDeleteSeller(seller.email) } className="btn btn-sm rounded-none btn-outline">Delete</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllSeller;

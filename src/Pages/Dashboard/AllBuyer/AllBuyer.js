import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const AllBuyer = () => {
  const { data: buyers = [], refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allBuyer",{
        headers:{
          authorization : `Bearer ${localStorage.getItem('AccessToken')}`
        }
      });
      const data = await res.json();
     
      return data;
    },
  });
  

  // Delete buyer
  const handleDeleteBuyer = (email) =>{
    const confirm = window.confirm(`Are you sure want to delete ${email}?`,{
      headers:{
        authorization : `Bearer ${localStorage.getItem('AccessToken')}`
      }
    });
    if(confirm){
      fetch(`http://localhost:5000/delete/buyer?email=${email}`)
      .then(res => res.json())
      .then(data => {
        
        if(data.acknowledged){
          toast.success('Buyer deleted successfully');
          refetch();
        }
      })
    }
  }

  refetch()
  return (
    <div>
      <h1 className="text-4xl text-center my-10 underline text-gray-600 font-semibold">
        Buyers list
      </h1>
      <div className="overflow-x-auto">
        {buyers.length < 1 ? (
          <div className="my-24 text-center">
            <h1 className="text-4xl text-gray-600 font-semibold">
              No buyers available
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
              {buyers.map((buyer, i) => (
                <tr key={buyer._id} className=" hover text-gray-600">
                  <th>{i + 1}</th>
                  <th>
                    <p>{buyer.name}</p>
                  </th>
                  <th>
                    <p className="text-primary">{buyer.email}</p>
                  </th>
                  <th>
                      
                  </th>
                  <th>
                      
                      <button onClick={ () => handleDeleteBuyer(buyer.email)} className="btn btn-sm rounded-none btn-outline">Delete</button>
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

export default AllBuyer;

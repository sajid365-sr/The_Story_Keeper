import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const Payment = () => {
  const items = useLoaderData();
  const { price } = items;
  const [clientSecret, setClientSecret] = useState("");
    
  // Get client secret from server
  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  return (
    <div>
      <h2 className="text-3xl text-gray-700 font-bold ml-10 underline mt-5">Make Payment</h2>
      <div>
        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckOutForm items={items} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payment;

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const CheckOutForm = ({ items }) => {
  const { title, price, picture, email, productId } = items;

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  // Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setProcessing(true);
    setSuccess(false);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setCardError(error.message);
      return;
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setProcessing(false);
      setCardError("");
      setSuccess(true);
      setTransactionId(paymentIntent.id);
      toast.success("Congratulations !! payment successful");
    } else {
      setCardError("Unexpected State");
    }
  };

  const handleErrorCancel = () => {
    setProcessing(false);
    setCardError(false);
  };

  if (success) {
    // Set payment status pending to success
    fetch(
      `http://localhost:5000/payment/status/${productId}`
    )
      .then((res) => res.json())
      .then((data) => {});

    const payment = {
      price,
      TnxId: transactionId,
      email,
      productId,
      paymentTime: new Date().toLocaleString(),
    };

    // Store payment info in the database.........
    fetch("http://localhost:5000/payments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
      body: JSON.stringify(payment),
    });
  }

  return (
    <div className="flex w-11/12 mx-auto lg:flex-row flex-col lg:ml-10 mt-10 mb-24 shadow-xl lg:p-10 p-5 rounded-lg gap-10">
      <div className="lg:w-3/5 w-full shadow-2xl lg:p-10 p-5">
        <p className="text-xl font-semibold text-gray-600">{title}</p>
        <p className="text-5xl text-teal-600 mb-10 font-semibold">
          {price} (&#2547;)
        </p>
        <div className="bg-violet-400 flex justify-end py-10 pr-10 rounded-tr-3xl rounded-bl-3xl">
          <img className="w-1/2" src={picture} alt="product" />
        </div>
      </div>
      <div className="lg:w-2/5 w-full">
        <form className="h-full" onSubmit={handleSubmit}>
          <input
            className="input mb-3 font-medium text-gray-500 focus:border-blue-500 input-bordered w-full"
            type="email"
            defaultValue={email}
          />

          <PaymentElement className="mb-5" />

          {success ? (
            <button
              disabled
              className="btn w-full rounded-sm text-xl capitalize px-6 mt-5"
            >
              Paid
            </button>
          ) : (
            <button
              type="submit"
              className="btn w-full rounded-sm text-xl capitalize flex gap-3  px-6 mt-5"
              disabled={!stripe || processing}
            >
              {processing ? "Processing..." : "Pay"}
              <span>{price}(&#2547;)</span>
            </button>
          )}
          {cardError && (
            <div className="alert alert-error mt-10 shadow-lg">
              <div>
                <FaTimes onClick={handleErrorCancel} />
                <span>{cardError}</span>
              </div>
            </div>
          )}

          {success && (
            <div className="mt-10">
              <p className="text-success font-semibold">
                Payment is successful
              </p>
              <p>
                Your Transaction ID:{" "}
                <span className="font-bold text-stone-800">
                  {transactionId}
                </span>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckOutForm;
